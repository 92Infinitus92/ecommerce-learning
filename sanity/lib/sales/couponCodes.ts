export const COUPON_CODES = {
  "10%OFF": "10OFF",
  "15%OFF": "15OFF",
  "20%OFF": "20OFF",
  "25%OFF": "25OFF",
  BFRIDAY: "BFRIDAY",
  XMAS: "XMAS",
  HOLIDAY: "HOLIDAY",
  NEWYEAR: "NEWYEAR",
};

export type CouponCode = keyof typeof COUPON_CODES;
