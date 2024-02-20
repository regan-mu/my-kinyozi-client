// NextJS Middleware.
import { NextResponse } from 'next/server';
import getJWTSecret from './app/Utils/getJWTSecret';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const public_id = request.cookies.get("public_id")?.value;

  // Staff Page
  if (request.nextUrl.pathname.startsWith('/staff') && !'/staff/login'.includes(request.nextUrl.pathname)) {
    if (!token) {
      // Redirect to login if the token doesn't exist
      return NextResponse.redirect(new URL('/staff/login', request.url));
    } 

    // Verify the token
    try {
      const {payload} = await jwtVerify(token, new TextEncoder().encode(getJWTSecret()));
      if (!role) {
        // Redirect to staff account if there is no role. Prevent access to staff account page when shop is logged in
        return NextResponse.redirect(new URL(`/dashboard/${payload?.public_id}`, request.url));
      }
    } 
    catch (error) {
      return NextResponse.redirect(new URL('/staff/login', request.url));
    }
  }
 
  // Admin Page
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // Ensure Staff connot access the Admin Dashboard
      if (role) {
        // Redirect to staff account if the staff has a role
        return NextResponse.redirect(new URL(`/staff/${public_id}`, request.url));
      }

      if (!token) {
        // Redirect to login if the token doesn't exist
        return NextResponse.redirect(new URL('/login', request.url));
      } 

      // Verify the token
      try {
        const {payload} = await jwtVerify(token, new TextEncoder().encode(getJWTSecret()));
      } 
      catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
  }
}
