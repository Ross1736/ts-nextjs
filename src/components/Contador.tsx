"use client";

import estilo from "./styles/Contador.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { increment, decrement } from "@/redux/features/counterSlice";
import { setUser } from "@/redux/features/userSlice";
import { useGetProductsQuery } from "@/redux/services/userApi";

function Contador() {
  // consultas
  const { data, error, isLoading, isFetching } = useGetProductsQuery();

  console.log(data);

  // estados
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();

  const { name } = useAppSelector((state) => state.userReducer);

  if (isLoading || isFetching) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar datos</p>;
  }

  return (
    <div className={estilo.contador}>
      <h3>Contador Redux</h3>

      <p>Categorias: {data?.length}</p>
      <p>Usuario: {name}</p>

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => dispatch(setUser({ name: e.target.value }))}
      />

      <div className={estilo.contador_cuenta}>
        <button onClick={() => dispatch(decrement())}>Reducir</button>
        <p>{count}</p>
        <button onClick={() => dispatch(increment())}>Aumentar</button>
      </div>
    </div>
  );
}

export default Contador;
