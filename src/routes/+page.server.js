import { supabase } from "$lib/supabaseClient.js";


// Fetches recent and featured properties to be displayed
export async function load() {
  let recentProperties = [];
  let featuredProperties = [];
  let err = null;

  try {
    recentProperties = await getRecentProperties();
  } catch (error) {
    console.error(error);
    err = "Failed to fetch recent properties";
  }

  try {
    featuredProperties = await getFeaturedProperties();
  } catch (error) {
    console.error(error);
    err = "Failed to fetch featured properties";
  }

  return { recentProperties, featuredProperties, error: err };
}

// Helper functions
async function getRecentProperties() {
  let { data: recentProperties, error } = await supabase
    .from('properties')
    .select('*')
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.error("/ :: getRecentProperties() :: Failed to fetch recent properties");
    throw new Error(error);
  }
  return recentProperties;
}

async function getFeaturedProperties() {
  let { data: featuredProperties, error } = await supabase
    .from('properties')
    .select('*')
    .eq("featured", true);

  if (error) {
    console.error("/ :: getFeaturedProperties() :: Failed to fetch featured properties");
    throw new Error(error);
  }

  return featuredProperties;
}