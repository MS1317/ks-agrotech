import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (
    !process.env.CRON_SECRET ||
    request.headers.get("authorization") !==
      `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { error: "Missing Supabase environment variables" },
      { status: 500 }
    );
  }

  const response = await fetch(`${url}/rest/v1/faqs?select=id&limit=1`, {
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
    },
    cache: "no-store",
  });

  return NextResponse.json(
    { ok: response.ok },
    { status: response.ok ? 200 : 502 }
  );
}
