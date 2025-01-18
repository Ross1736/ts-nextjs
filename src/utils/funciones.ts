export function normalizarImages(images: string[]): string[] {
  const imagesNormalizadas = images
    .map((e) => {
      if (typeof e === "string" && e.startsWith("[") && e.endsWith("]")) {
        try {
          const parsed = JSON.parse(e);
          if (
            Array.isArray(parsed) &&
            parsed.some((url) => url.endsWith("any"))
          ) {
            // Si cualquier URL dentro del arreglo termina en "any", retorna []
            return [];
          }
          return parsed;
        } catch (error: any) {
          console.log(error);
          return [];
        }
      }

      // Verifica si la imagen actual termina en "any"
      if (typeof e === "string" && e.endsWith("any")) {
        // Retorna arreglo vacío si no hay foto
        return [];
      }

      return e;
    })
    .flat();

  return imagesNormalizadas;
}
