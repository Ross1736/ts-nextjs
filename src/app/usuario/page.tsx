import { cookies } from "next/headers";
import { User } from "@/types/typesAuth";
import { redirect } from "next/navigation";

const URL_API: string = process.env.NEXT_PUBLIC_API_URL || "";

async function getUsuario(): Promise<User | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth-token");

  if (!token) {
    return null;
  }

  const respuesta = await fetch(`${URL_API}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!respuesta.ok) {
    return null;
  }

  return await respuesta.json();
}

async function Usuario() {
  const usuarioDetalle = await getUsuario();

  if (!usuarioDetalle) {
    return redirect("/auth");
  }

  return (
    <div>
      <h2>
        {usuarioDetalle.id}: {usuarioDetalle.name}
      </h2>
      <p>{usuarioDetalle.email}</p>
      <p>{usuarioDetalle.role}</p>
      <img src={usuarioDetalle.avatar} alt="avatar" width={140} height={140} />
    </div>
  );
}

export default Usuario;
