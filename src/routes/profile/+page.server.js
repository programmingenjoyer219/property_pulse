import { redirect } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient.js";


// Fetches user's profile and user's property listings to be displayed
export async function load({ parent, depends }) {
  depends("app:profile");

  const { session } = await parent();
  if (!session) throw redirect(307, "/");

  try {
    const properties = await getProperties(session?.user?.email);

    return { properties, error: null };
  } catch (error) {
    console.error(error);

    return { properties: [], error: "Failed to fetch properties." };
  }
}


// Helper functions
async function getProperties(owner_email) {
  if (!owner_email) throw new Error("email not provided");

  let { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq("owner_email", owner_email);

  if (error) {
    console.error("/profile :: getProperties() :: Failed to fetch properties");
    throw new Error(error);
  }

  return properties;
}