import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const URL_API: string = process.env.NEXT_PUBLIC_API_URL || "";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const respuesta = await axios.post<{
      access_token: string;
      refresh_token: string;
    }>(`${URL_API}/auth/login`, {
      email,
      password,
    });

    const respuestaCliente = NextResponse.json(
      {
        login: true,
      },
      { status: respuesta.status }
    );

    // Establecer las cookies con los tokens de la respuesta
    respuestaCliente.cookies.set("auth-token", respuesta.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo en producción
      sameSite: "lax",
      path: "/",
    });

    respuestaCliente.cookies.set(
      "refresh-token",
      respuesta.data.refresh_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Solo en producción
        sameSite: "lax",
        path: "/",
      }
    );

    return respuestaCliente;
  } catch (error: any) {
    console.log(error.response.data);

    return NextResponse.json(error.response.data, {
      status: error.response.status,
    });
  }
}
