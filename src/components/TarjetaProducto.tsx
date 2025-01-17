import Link from "next/link";
import estilo from "./styles/TarjetaProducto.module.css";
import { Producto } from "@/types/types";

type Estado = "DEV" | "PROD";

type Adicional = {
  estado?: Estado;
};

type Props = Producto & Adicional;

function TarjetaProducto({
  id,
  title,
  description,
  price,
  estado = "DEV",
}: Props) {
  if (!id || !title || !description || !price) {
    return null;
  }

  return (
    <Link href={`/producto/${id}`}>
      <div className={estilo.tarjeta}>
        <h4>
          {title} - {estado}
        </h4>
        <p>{description}</p>
        <span>${price.toFixed(2)}</span>
      </div>
    </Link>
  );
}

export default TarjetaProducto;
