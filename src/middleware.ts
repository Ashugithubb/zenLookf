
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value;
    const { pathname } = req.nextUrl;
    let payload;

    if (token) {
        try {
            payload = JSON.parse(atob(token.split('.')[1]));
        } catch {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (pathname === "/services") {
        return NextResponse.next();
    }

 
    if (pathname === "/services/mybookings" && payload?.role === "Admin") {
        return NextResponse.redirect(new URL("/services", req.url));
    }

   
    if (pathname === "/services/allbookings" && payload?.role !== "Admin") {
        return NextResponse.redirect(new URL("/services", req.url));
    }

    

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/services/:path*"],
};
