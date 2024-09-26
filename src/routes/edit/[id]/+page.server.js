import { supabase } from "$lib/supabaseClient.js";
import { redirect } from '@sveltejs/kit';
import { error } from "@sveltejs/kit";


// Fetches property data to be edited
export async function load({ parent, params }) {
  const { session } = await parent();
  if (!session) throw redirect(307, "/");

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
async function getPropertyById(id) {
  let { data: property, error } = await supabase
    .from('properties')
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("/edit/[id] :: getPropertyById() :: Failed to fetch property by id");
    throw new Error(error);
  }

  return property[0];
}