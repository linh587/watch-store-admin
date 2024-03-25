export const ENVIRONMENT = "http://localhost:8080/";

export const API_URL = {
  // AUTH
  LOGIN: "sign-in/admin",
  REFRESH_TOKEN: "refresh/admin",
  GET_ALL_USER: "admin/user-account",
  GET_DETAIL_USER: "admin/information",

  // AUTH STAFF
  STAFF_LOGIN: "sign-in/staff",
  GET_DETAIL_STAFF: "staff/information",

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

  //ORDER
  GET_ALL_ORDER: "staff/order",
  ORDER: "order",
  STAFF_ORDER: "staff/order",
  VERIFY: "verify",
  DELIVERY: "delivery",
  VERIFY_RECEIVED: "verify-received",
  CANCEL: "cancel",

  // BRANCH
  BRANCH: "branch",
};
