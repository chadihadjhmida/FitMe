import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zlndqzryllpckmwgyiye.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsbmRxenJ5bGxwY2ttd2d5aXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDcyODcsImV4cCI6MjA3ODAyMzI4N30.ItGsD1P3HAGIPz3bg6Trm5mElvUFCo70EcaOP3lpVTI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
