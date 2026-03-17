import { createBrowserClient } from "@supabase/ssr";

// This function creates a Supabase client that runs in the BROWSER (client-side).
// We use this in components marked with 'use client'.
// It reads the URL and anon key from your .env.local file.

export function createClient(){
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}