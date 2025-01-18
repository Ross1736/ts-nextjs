"use client";

import { DatosForm } from "@/types/typesForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Auth() {
  const router = useRouter();

  const [datosForm] = useState<DatosForm>({
    email: "john@mail.com",
    password: "changeme",
  });

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const respuesta = await axios.post<{ [key: string]: any }>("/api/auth", {
        email: datosForm.email,
        password: datosForm.password,
      });

      if (respuesta.status === 201) {
        router.push("/usuario");
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  return (
    <main>
      <form onSubmit={login}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={datosForm.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={datosForm.password}
        />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default Auth;
