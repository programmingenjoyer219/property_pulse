import { SvelteKitAuth } from "@auth/sveltekit";
import { SupabaseAdapter } from "@auth/supabase-adapter"
import Google from "@auth/sveltekit/providers/google";
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";

export const { handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  providers: [Google],
  adapter: SupabaseAdapter({
    url: SUPABASE_URL,
    secret: SUPABASE_SERVICE_ROLE_KEY,
  }),
});