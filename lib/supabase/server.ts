import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// This function creates a supabase client that runs on server
// We use this in server components, API routes and middleware
// It uses cookies to trac user's auth session.

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // This can be ignored in Server Components(read-only).
            // Middleware will handle refreshing the session.
          }
        },
      },
    },
  );
}
