import estilo from "./ProductoId.module.css";
import { Producto } from "@/types/types";
import { redirect } from "next/navigation";

const URL_API: string = process.env.NEXT_PUBLIC_API_URL || "";

async function getProductoId(id: string): Promise<Producto | null> {
  if (!id || !/^\d+$/.test(id)) {
    return null;
  }

  const consulta = await fetch(`${URL_API}/${id}`);

  if (!consulta.ok) {
    return null;
  }

  const respuesta = await consulta.json();

  return respuesta;
}

async function ProductoId({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const dato = await getProductoId(id);

  if (!dato) {
    redirect("/");
  }

  return (
    <div className={`${estilo.producto_id} principal`}>
      <h1>{dato.title}</h1>
      <p>{dato.description}</p>
      <span>${dato.price.toFixed(2)}</span>
    </div>
  );
}

export default ProductoId;
