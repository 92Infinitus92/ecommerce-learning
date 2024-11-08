import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (category: string) => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[_type == "product" && category == $category] | order(name asc)
    `);
  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: {
        category,
      },
    });
    return products.data || null;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};
