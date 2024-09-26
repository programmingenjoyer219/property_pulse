import { json } from "@sveltejs/kit";
import { supabase } from '$lib/supabaseClient.js';


// POST : /api/messages
/*
Accessed by :
  Message.svelte => Switches message's status between read and unread
*/
export async function POST({ request, locals }) {
  try {
    const session = await locals.auth();

    if (!session) {
      return json(
        { success: false, error: "Session does not exist" },
        { status: 403 }
      );
    }

    const data = await request.json();
    await changeMessageStatus(data?.message_id);

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


// DELETE : /api/messages
/*
Accessed by :
  Message.svelte => Delete a particular message
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
    await deleteMessageById(data?.message_id);

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
async function deleteMessageById(message_id) {
  if (!message_id) {
    console.error("/api/messages :: deleteMessageById() :: Failed to delete message");
    throw new Error("invalid value passed or value not provided, message_id: ", message_id);
  }

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', message_id)

  if (error) {
    console.error("/api/messages :: deleteMessageById() :: Failed to delete message");
    throw new Error(error);
  }
}


async function getMessageById(message_id) {
  if (!message_id) {
    console.error("/api/messages :: getMessageById() :: Failed to get message");
    throw new Error("invalid value passed or value not provided, message_id: ", message_id);
  }

  let { data: message, error } = await supabase
    .from('messages')
    .select(`marked_as_read`)
    .eq("id", message_id);

  if (error) {
    console.error("/api/messages :: getMessageById() :: Failed to fetch message by id");
    throw new Error(error);
  }

  return message[0];
}


async function changeMessageStatus(message_id) {
  if (!message_id) {
    console.error("/api/messages :: changeMessageStatus() :: Failed to change message status");
    throw new Error("invalid value passed or value not provided, message_id: ", message_id);
  }

  const message = await getMessageById(message_id);

  const { error } = await supabase
    .from('messages')
    .update({ 'marked_as_read': !message?.marked_as_read })
    .eq('id', message_id);

  if (error) {
    console.error("/api/messages :: changeMessageStatus() :: Failed to update message status");
    throw new Error(error);
  }
}