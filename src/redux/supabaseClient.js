/// supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://oelwdoxdkkqahbiyafyd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lbHdkb3hka2txYWhiaXlhZnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0NDI4NzIsImV4cCI6MjA1NDAxODg3Mn0.1KYK3VjCrb6hVwOW4teKUOGUhaFLj5Dvbrytspz2RUw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
