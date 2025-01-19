import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL_APIL: string = process.env.NEXT_PUBLIC_API_URL || "";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
};

type Category = {
  id: number;
  name: string;
  image: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL_APIL}/`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "categories",
    }),
    getUsers: builder.query<User[], void>({
      query: () => "users",
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useGetUsersQuery } =
  userApi;
