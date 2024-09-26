import { supabase } from "$lib/supabaseClient.js";
import { error } from "@sveltejs/kit";


export const actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();
      const messageData = extractMessageData(formData);
      const validationResult = performValidation(messageData);

      if (validationResult.isValidated) addMessageToDatabase(messageData);

      return validationResult;
    } catch (err) {
      console.error(err);

      return {
        isValidated: false,
        failureDueTo: { server: "Failed to send message." }
      }
    }
  }
};


export async function load({ params }) {
  try {
    const { id: property_id } = params;
    const property = await getPropertyById(property_id);

    return { property };
  } catch (err) {
    console.error(err);

    return error(404, { message: "Property not found" });
  }
}


// Helper functions
function extractMessageData(formData) {
  const attributes = ["property_id", "sender_name", "sender_email", "sender_phone_number", "receiver_email", "content"];
  const result = {};

  for (const attribute of attributes) {
    if (attribute === "property_id") {
      result[attribute] = +formData.get(attribute);
    } else {
      result[attribute] = formData.get(attribute)
    }
  }

  return result;
}


function performValidation(messageData) {
  let isValidated = false;
  let failureDueTo = {};

  if (messageData.sender_phone_number.trim().length === 0) {
    failureDueTo["sender_phone_number"] = "Please provide your contact number."
  }
  if (messageData.content.length === 0) {
    failureDueTo["content"] = "Please dont leave the field empty."
  }
  if (messageData["sender_name"].trim().length === 0 || messageData["sender_email"].trim().length === 0 || messageData["receiver_email"].trim().length === 0 || !messageData["property_id"]) {
    failureDueTo["server"] = "Oops...Something went wrong. Try again later."
  }

  if (Object.keys(failureDueTo).length === 0) {
    isValidated = true;
  }

  return { isValidated, failureDueTo };
}


async function addMessageToDatabase(messageData) {
  const { error } = await supabase
    .from('messages')
    .insert([messageData]);

  if (error) {
    console.error("/properties/[id] :: addMessageToDatabase() :: Failed to add message to database.");
    throw new Error(error);
  }
}


async function getPropertyById(id) {
  let { data: property, error } = await supabase
    .from('properties')
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("/properties/[id] :: getPropertyById() :: Failed to fetch property by id");
    throw new Error(error);
  }

  if (property.length === 0) {
    console.error("/properties/[id] :: getPropertyById() :: Failed to fetch property by id");
    throw new Error("Property not found");
  }

  return property[0];
}