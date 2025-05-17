import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  // Public paths that don't require authentication
  const publicPaths = ["/auth/signin", "/auth/error"]
  const isPublicPath = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isPublicPath) {
    const url = new URL("/auth/signin", request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // If the user is authenticated and trying to access auth pages
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Role-based access control
  if (isAuthenticated && token.role) {
    // Example: Only admins can access /admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && token.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/error?error=AccessDenied", request.url))
    }

    // Example: Only doctors can access /doctor routes
    if (request.nextUrl.pathname.startsWith("/doctor") && token.role !== "doctor") {
      return NextResponse.redirect(new URL("/auth/error?error=AccessDenied", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
