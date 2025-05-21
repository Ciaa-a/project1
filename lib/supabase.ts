import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://tibmyrbgefljmsydavog.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpYm15cmJnZWZsam1zeWRhdm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDM4NzcsImV4cCI6MjA2MDQ3OTg3N30.jlGY479K0dlwNmZfq9_BIpZlytXikNKqBN0atKtVUEU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
