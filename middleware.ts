import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MAINTENANCE_MODE } from "./lib/constants";

const maintenanceMode = MAINTENANCE_MODE; // Set to true to enable maintenance mode
console.log(`Maintenance mode is ${maintenanceMode ? "enabled" : "disabled"}.`);


export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    if (!maintenanceMode) {
        return NextResponse.next(); // Let everything through
    }
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

    if (isAllowedPath) {
        return NextResponse.next();
    }

    // Redirect all other requests to under-construction page
    const url = request.nextUrl.clone();
    url.pathname = "/under-construction";  
    return NextResponse.redirect(url);
} 