"use client";

import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
  const [datos, setDatos] = useState<T[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchdatos = async () => {
      try {
        const consulta = await fetch(url);
        if (!consulta.ok) {
          throw new Error("Error al consultar API");
        }

        const datos: T[] = await consulta.json();

        setDatos(datos);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    fetchdatos();
  }, [url]);

  return { datos, cargando, error };
}
