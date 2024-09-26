import { supabase } from "$lib/supabaseClient.js";
import { error } from "@sveltejs/kit";

// Fetches properties for the particular page
export async function load({ url }) {
  const propertyType = url.searchParams.get("type");
  const searchQuery = url.searchParams.get("query");
  const page = Number(url.searchParams.get("page")) || 1;

  let propertyCount;

  try {
    propertyCount = await getPropertyCount();
  } catch (err) {
    return error(500, { message: "Oops...Something went wrong. Try again later." });
  }

  const numPages = Math.ceil(propertyCount / 6);

  if (page <= 0 || page > numPages) return error(404, { message: "The page you are looking for, does not exist" });

  try {
    let properties = [];

    if (!propertyType && !searchQuery) {
      properties = await getProperties(page);
    }
    else {
      properties = await searchProperties(page, searchQuery.trim().toLowerCase(), propertyType.trim());
    }

    return {
      properties,
      error: null,
      paginationData: { page, propertyCount, numPages }
    };
  } catch (error) {
    return {
      properties: [],
      error: "Failed to fetch properties.",
      paginationData: null
    };
  }
}


// Helper functions
async function getProperties(page) {
  const seed = (page - 1) * 6;
  let { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .range(seed, seed + 5);

  if (error) {
    console.error("/properties :: getProperties() :: Failed to fetch properties");
    throw new Error(error);
  }

  return properties;
}


async function searchProperties(page, searchQuery, propertyType) {
  const seed = (page - 1) * 6;
  let query = `name.ilike.%${searchQuery}%,street.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,state.ilike.%${searchQuery}%,zipcode.ilike.%${searchQuery}%`;

  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('type', propertyType)
    .or(query)
    .range(seed, seed + 5);

  if (error) {
    console.error("/properties :: searchProperties() :: Failed to fetch properties");
    throw new Error(error);
  }

  return properties;
}


async function getPropertyCount() {
  const { data, error } = await supabase
    .from('properties')
    .select('id', { count: 'exact' });

  if (error) {
    console.error("/properties :: getPropertyCount() :: Failed to get property count");
    throw new Error(error);
  }

  return data.length;
}