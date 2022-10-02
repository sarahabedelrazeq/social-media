import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jhdpgjjcbrlbvddzodju.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZHBnampjYnJsYnZkZHpvZGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ1NDcxMjQsImV4cCI6MTk4MDEyMzEyNH0.XcCJeGb83f-nGkEQHJ9FyQJuLQzSj2hPWn6a7XOyq70";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
