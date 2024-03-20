export const ENVIRONMENT = "http://localhost:8080/";

export const API_URL = {
  // AUTH
  LOGIN: "sign-in/admin",
  REFRESH_TOKEN: "user/refresh-token",
  GET_ALL_USER: "admin/user-account",
  GET_DETAIL_USER: "admin/information",

  // CATEGORY
  GET_ALL_CATEGORY: "category",
  CATEGORY: "admin/category",
  DETAIL_CATEGORY: "category",

  // PRODUCT
  GET_ALL_PRODUCTS: "product",
  DETAIL_PRODUCT: "product",
  PRODUCT: "admin/product",

  // PRODUCT SIZE
  GET_ALL_SIZES: "product-size",
  PRODUCT_SIZE: "admin/product-size",
  DETAIL_PRODUCT_SIZE: "product-size",

  //PRODUCT_PRICE
  GET_ALL_PRICES: "product-price",
  PRODUCT_PRICE: "product-price",
};
