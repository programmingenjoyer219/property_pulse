import { redirect } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient.js";


// Fetches messages to be displayed
export async function load({ parent, depends }) {
  depends("app:messages");

  const { session } = await parent();
  if (!session) throw redirect(307, "/");

  try {
    const messages = await getMessages(session?.user?.email);
    return { messages, error: null };
  } catch (error) {
    return { messages: [], error };
  }
}

// Helper functions
async function getMessages(receiver_email) {
  let { data: messages, error } = await supabase
    .from('messages')
    .select(`
      id,
      marked_as_read,
      content,
      sender_name,
      sender_email,
      sender_phone_number,
      created_at,
      properties (
        name
      )
    `)
    .eq("receiver_email", receiver_email);

  if (error) {
    console.error(error);
    throw new Error("Error fetching messages.");
  }

  return messages;
}
