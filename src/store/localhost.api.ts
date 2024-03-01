import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ICategory, IHit, IOrder, IProduct } from "../models/models";

export const localhostApi = createApi({
  reducerPath: 'localhost/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7070/api/',
  }),
  endpoints: build => ({
    fetchTopSales: build.query<IHit[] | [], void>({
      query: () => ({
        url: 'top-sales',
      })
    }),
    fetchCategories: build.query<ICategory[] | [], void>({
      query: () => ({
        url: 'categories',
      })
    }),
    fetchGoods: build.query<IHit[] | [], string>({
      query: (queryString = '') => `items${queryString}`,
    }),
    fetchProduct: build.query<IProduct, string>({
      query: (queryString = '') => `items/${queryString}`,
    }),
    sendOrder: build.mutation<string | boolean, IOrder>({
      query: (cart: IOrder) => ({
        url: 'order',
        method: 'POST',
        body: JSON.stringify(cart),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  })
})

export const {
  useFetchTopSalesQuery,
  useFetchCategoriesQuery,
  useFetchGoodsQuery,
  useFetchProductQuery,
  useSendOrderMutation,
} = localhostApi;
