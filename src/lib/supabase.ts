import { createClient } from '@supabase/supabase-js';

const supabaseUrl =  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wzbrjrbmfgtqpptezcht.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6YnJqcmJtZmd0cXBwdGV6Y2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NzY2MTgsImV4cCI6MjA4ODQ1MjYxOH0.dCOfBUKIeMsdqQw0lmtcwsQl2v6uXpcS0I1eI24IuLY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
