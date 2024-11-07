import { sanityFetch } from "../live";
import { CouponCode } from "./couponCodes";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
  const query = `*[ _type == "sale" && couponCode == "${couponCode}" && isActive == true] | order(validFrom desc)[0]`;
  try {
    const sale = await sanityFetch({
      query: query,
      params: {
        couponCode,
      },
    });
    return sale ? sale.data : null;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};
