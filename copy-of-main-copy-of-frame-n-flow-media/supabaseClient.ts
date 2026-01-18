import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndkaghlkqagmivrkzthf.supabase.co';
const supabaseAnonKey = 'sb_publishable_-5JaQY5JlA0vDU0o1IPwxw_qusn9GJ7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
