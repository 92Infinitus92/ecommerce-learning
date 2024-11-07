import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductsByName = async (searchTerm: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[_type == "product" && name match $searchTerm] | order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchTerm: `${searchTerm}*`, // Use wildcard to match partial names
      },
    });
    return products.data || [];
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return [];
  }
};
