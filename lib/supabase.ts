import { createClient, SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

let _supabase: SupabaseClient<Database> | null = null

export function getSupabase() {
  if (!_supabase) {
    _supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _supabase
}
