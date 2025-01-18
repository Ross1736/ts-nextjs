"use client";

import estilo from "./styles/ListaProductos.module.css";
import { useFetch } from "@/hooks/useFetch";
import { Producto } from "@/types/types";
import TarjetaProducto from "./TarjetaProducto";

const URL_API: string = process.env.NEXT_PUBLIC_API_URL || "";

function ListaProductos() {
  const { datos, cargando, error } = useFetch<Producto>(`${URL_API}/products`);

  // Componentes para estados de carga/error
  const EstadoCargando = () => (
    <div>
      <h2>Cargando...</h2>
    </div>
  );

  const EstadoError = () => (
    <div>
      <h2>Ocurrio un error al cargar los productos...</h2>
    </div>
  );

  if (cargando) return <EstadoCargando />;
  if (error) return <EstadoError />;

  return (
    <div className={estilo.lista_productos}>
      {datos.map((producto) => (
        <TarjetaProducto key={producto.id} {...producto} estado={"DEV"} />
      ))}
    </div>
  );
}

export default ListaProductos;
