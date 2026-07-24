import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MAINTENANCE_MODE } from "./lib/constants";
import { updateSession } from "./lib/supabase/middleware";

const maintenanceMode = MAINTENANCE_MODE; // Set to true to enable maintenance mode
console.log(`Maintenance mode is ${maintenanceMode ? "enabled" : "disabled"}.`);


export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    
    // 1. Check Maintenance Mode First
    if (maintenanceMode) {
        // Allow access to under-construction and necessary public files
        const isAllowedPath =
            pathname === "/under-construction" ||
            pathname.startsWith("/_next") ||
            pathname.startsWith("/favicon") ||
            pathname.startsWith("/assets") ||
            pathname === "/robots.txt" ||
            pathname === "/logo.png" || // In case your UC page uses this
            pathname.endsWith(".css") || // Your under-construction stylesheet
            pathname.endsWith(".js");

        if (!isAllowedPath) {
            // Redirect all other requests to under-construction page
            const url = request.nextUrl.clone();
            url.pathname = "/under-construction";  
            return NextResponse.redirect(url);
        }
    }
    
    // 2. Process Supabase Auth for Admin routes
    return await updateSession(request);
} 

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}