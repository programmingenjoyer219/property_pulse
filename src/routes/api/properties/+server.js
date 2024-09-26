import cloudinary from '$lib/cloudinary.js';
import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';


// POST : /api/properties
/*
Accessed by :
  AddPropertyForm.svelte => Create a new property listing
*/
export async function POST({ request, locals }) {
  try {
    const session = await locals.auth();

    if (!session) {
      return json(
        {
          validationResult: {
            isValidated: false,
            failureDueTo: { server: "Session does not exist" }
          },
          property_url: null,
        },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const propertyData = extractPropertyData(formData);
    propertyData["owner_email"] = session?.user?.email;

    const validationResult = performValidation(propertyData, formData, "add");

    if (!validationResult.isValidated) {
      return json({ validationResult, property_url: null }, { status: 400 });
    }

    propertyData["images"] = await convertImagesToURL(formData);

    const result = await addPropertyToDatabase(propertyData);

    return json(
      { validationResult, property_url: `/properties/${result?.property_id}` },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return json(
      {
        validationResult: {
          isValidated: false,
          failureDueTo: { server: "Oops... something went wrong, try later." }
        },
        property_url: null,
      },
      { status: 500 }
    );
  }
}


// PUT : /api/properties
/*
Accessed by :
  EditPropertyForm.svelte => Edit a property listing
*/
export async function PUT({ request, locals }) {
  try {
    const session = await locals.auth();

    if (!session) {
      return json(
        {
          validationResult: {
            isValidated: false,
            failureDueTo: { server: "Session does not exist" }
          },
          property_url: null,
        },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const property_id = formData.get("id");
    const propertyData = extractPropertyData(formData);
    propertyData["owner_email"] = session?.user?.email;

    const validationResult = performValidation(propertyData, formData, "edit");

    if (!validationResult.isValidated) {
      return json({ validationResult, property_url: null }, { status: 400 });
    }

    await editPropertyData(property_id, propertyData);

    return json(
      { validationResult, property_url: `/properties/${property_id}` },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return json(
      {
        validationResult: {
          isValidated: false,
          failureDueTo: { server: "Oops... something went wrong, try later." }
        },
        property_url: null,
      },
      { status: 500 }
    );
  }
}


// DELETE : /api/properties
/*
Accessed by :
  UserListingCard.svelte => Delete a property listing
*/
export async function DELETE({ request, locals }) {
  try {
    const session = await locals.auth();

    if (!session) {
      return json(
        { success: false, error: "Session does not exist" },
        { status: 403 }
      );
    }

    const data = await request.json();
    await deletePropertyById(data?.property_id);

    return json(
      { success: true, error: null },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);

    return json(
      { success: false, error: "Oops... something went wrong, try later." },
      { status: 500 }
    );
  }
}


// Helper functions
function getEntryData(entry, formData) {
  if (!entry) {
    console.error("/api/properties :: getEntryData() :: Failed to get entry data");
    throw new Error(`invalid value passed or value not provided.\nentry: ${entry}`);
  }

  if (!formData) {
    console.error("/api/properties :: getEntryData() :: Failed to get entry data");
    throw new Error(`invalid value passed or value not provided.\nformData: ${formData}`);
  }

  if (entry === "amenities") {
    return String(formData.get(entry)).split(",");
  } else if (["beds", "baths", "square_feet", "nightly_rate", "weekly_rate", "monthly_rate"].includes(entry)) {
    return Number(formData.get(entry));
  } else {
    return String(formData.get(entry));
  }
}


function extractPropertyData(formData) {
  if (!formData) {
    console.error("/api/properties :: extractPropertyData() :: Failed to extract property data");
    throw new Error(`invalid value passed or value not provided.\nformData: ${formData}`);
  }

  const propertyData = {};
  const entries = ["owner_email", "type", "name", "description", "street", "city", "state", "zipcode", "beds", "baths", "square_feet", "amenities", "nightly_rate", "weekly_rate", "monthly_rate"];

  for (const entry of entries) {
    propertyData[entry] = getEntryData(entry, formData);
  }

  return propertyData;
}


async function convertImagesToURL(formData) {
  if (!formData) {
    console.error("/api/properties :: convertImagesToURL() :: Failed to convert images to URL");
    throw new Error(`invalid value passed or value not provided.\nformData: ${formData}`);
  }

  const imageURLs = [];
  let images = formData.getAll("images");

  if (images.length > 4) {
    images = images.slice(0, 4);
  }

  for (const imageFile of images) {
    try {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, { folder: "property_pulse" });
      imageURLs.push(result.secure_url);
    } catch (error) {
      console.error("/api/properties :: convertImagesToURL() :: Failed to convert image to URL");
      throw new Error(error);
    }
  }

  return imageURLs;
}


async function addPropertyToDatabase(propertyData) {
  if (!propertyData || !Object.keys(propertyData).length) {
    console.error("/api/properties :: addPropertyToDatabase() :: Failed to add property to database");
    throw new Error(`invalid value passed or value not provided.\npropertyData: ${propertyData}`);
  }

  const { data, error } = await supabase
    .from('properties')
    .insert([propertyData])
    .select("id");

  if (error) {
    console.error("/api/properties :: addPropertyToDatabase() :: Failed to add property to database");
    throw new Error(error);
  }

  return data[0];
}


function performValidation(propertyData, formData, type) {
  if (!propertyData || !Object.keys(propertyData).length) {
    console.error("/api/properties :: performValidation() :: Failed to perform validation");
    throw new Error(`invalid value passed or value not provided.\npropertyData: ${propertyData}`);
  }

  if (!formData) {
    console.error("/api/properties :: performValidation() :: Failed to perform validation");
    throw new Error(`invalid value passed or value not provided.\nformData: ${formData}`);
  }

  if (!type) {
    console.error("/api/properties :: performValidation() :: Failed to perform validation");
    throw new Error(`invalid value passed or value not provided.\ntype: ${type}`);
  }

  let isValidated = false;
  let failureDueTo = {};

  if (propertyData["nightly_rate"] === 0 && propertyData["weekly_rate"] === 0 && propertyData["weekly_rate"] === 0) {
    failureDueTo["rates"] = "Provide atleast one type of rate."
  }

  if (type === "add" && formData.getAll("images").length < 3) {
    failureDueTo["images"] = "Provide 3-4 images."
  }

  for (const entry of ["name", "description", "street", "city", "state", "zipcode"]) {
    if (!propertyData[entry]) {
      failureDueTo[entry] = "Please dont leave the field empty."
    }
  }

  for (const entry of ["beds", "baths", "square_feet"]) {
    if (propertyData[entry] === 0) {
      failureDueTo[entry] = "Provide a value greater than 0."
    }
  }

  if (Object.keys(failureDueTo).length === 0) {
    isValidated = true;
  }

  return { isValidated, failureDueTo }
}


async function deletePropertyById(property_id) {
  if (!property_id) {
    console.error("/api/properties :: performValidation() :: Failed to perform validation");
    throw new Error(`invalid value passed or value not provided.\nproperty_id: ${property_id}`);
  }

  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', property_id);

  if (error) {
    console.error("/api/properties :: deletePropertyById() :: Failed to delete property");
    throw new Error(error);
  }
}


async function editPropertyData(property_id, propertyData) {
  if (!propertyData || !Object.keys(propertyData).length) {
    console.error("/api/properties :: editPropertyData() :: Failed to perform validation");
    throw new Error(`invalid value passed or value not provided.\npropertyData: ${propertyData}`);
  }

  if (!property_id) {
    console.error("/api/properties :: performValidation() :: Failed to perform validation");
    throw new Error(`invalid value passed or value not provided.\nproperty_id: ${property_id}`);
  }

  const updatedPropertyData = propertyData;
  delete updatedPropertyData.id;

  const { error } = await supabase
    .from('properties')
    .update(updatedPropertyData)
    .eq('id', property_id);

  if (error) {
    console.error("/api/properties :: editPropertyData() :: Failed to edit property data");
    throw new Error(error);
  }
}