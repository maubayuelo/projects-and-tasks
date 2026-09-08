/// supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Vite only exposes env vars prefixed with VITE_
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	// Helpful message for misconfigured environments
	// eslint-disable-next-line no-console
	console.error(
		'Supabase env vars missing. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env.local.'
	);
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
