import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest, MiddlewareConfig } from "next/server";

const URL_API: string = process.env.NEXT_PUBLIC_API_URL || "";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("auth-token");

  if (!authToken?.value && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  try {
    const respuesta = await axios.get<{ [key: string]: any }>(
      `${URL_API}/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${authToken!.value}`,
        },
      }
    );

    console.log(respuesta.data);

    if (respuesta.status === 200 && pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/usuario", request.url));
    }
  } catch (error: any) {
    console.log("ERROR", error.response?.data);

    if (pathname.startsWith("/usuario")) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/auth/:path*", "/usuario/:path*"],
};
