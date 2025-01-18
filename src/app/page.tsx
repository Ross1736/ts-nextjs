import ListaProductos from "@/components/ListaProductos";
import Link from "next/link";

function Inicio() {
  return (
    <main className="principal">
      <h2>Lista de productos</h2>

      <ul>
        <li>
          <Link href="/auth">Iniciar sesión</Link>
        </li>
        <li>
          <Link href="/usuario">Ir a usuario</Link>
        </li>
      </ul>

      <ListaProductos />
    </main>
  );
}

export default Inicio;
