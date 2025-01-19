import Link from "next/link";
import ListaProductos from "@/components/ListaProductos";
import Contador from "@/components/Contador";

function Inicio() {
  return (
    <main className="principal">
      <h2>Lista de productos</h2>

      <Contador />

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
