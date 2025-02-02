/// supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://insertYourUser.supabase.co';
const SUPABASE_ANON_KEY = 'insert_your_api_key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
