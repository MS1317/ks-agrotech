import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Prevent Next.js from caching this response, ensuring it always makes a real request
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing Supabase environment variables' }, { status: 500 });
    }

    // Create a generic server-side client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Fetch a tiny amount of data to register activity in Supabase
    const { data, error } = await supabase.from('faqs').select('id').limit(1);
    
    if (error) throw error;

    return NextResponse.json({ 
      status: 'success', 
      message: 'Supabase pinged successfully to stay awake', 
      timestamp: new Date().toISOString() 
    });
    
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json({ status: 'error', message: 'Failed to ping Supabase' }, { status: 500 });
  }
}
