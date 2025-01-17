export type Producto = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Categoria;
  images: string[];
};

type Categoria = {
  id: number;
  name: string;
  image: string;
};
