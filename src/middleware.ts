import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest, MiddlewareConfig } from "next/server";
import { User } from "./types/typesAuth";

const URL_API: string = process.env.NEXT_PUBLIC_API_URL || "";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("auth-token");

  if (!authToken?.value && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  try {
    const respuesta = await axios.get<User>(`${URL_API}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${authToken!.value}`,
      },
    });

    console.log(respuesta.data);

    if (respuesta.status === 200 && pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/usuario", request.url));
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("Token inválido o expirado.");
    } else {
      console.log("Error del servidor o de la red:", error.message);
    }

    if (pathname.startsWith("/usuario")) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/auth/:path*", "/usuario/:path*"],
};
