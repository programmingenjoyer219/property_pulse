import { PUBLIC_PROJECT_URL, PUBLIC_ANON_KEY } from "$env/static/public";
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(PUBLIC_PROJECT_URL, PUBLIC_ANON_KEY);