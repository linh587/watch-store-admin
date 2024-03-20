import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class ProductService extends BaseHttpRequest {
  public getAllCategories() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_ALL_CATEGORY}`);
  }

  public createCategory(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.CATEGORY}`, payload);
  }

  public updateCategory(id: string, payload: any) {
    return this.httpClient.put(
      `${ENVIRONMENT}${API_URL.CATEGORY}/${id}`,
      payload
    );
  }

  public deleteCategory(id: string) {
    return this.httpClient.delete(`${ENVIRONMENT}${API_URL.CATEGORY}/${id}`);
  }

  public getDetailCategory(id: string) {
    return this.httpClient.get(
      `${ENVIRONMENT}${API_URL.DETAIL_CATEGORY}/${id}`
    );
  }

  public getAllProducts() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_ALL_PRODUCTS}`);
  }

  public getDetailProduct(id: string) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.DETAIL_PRODUCT}/${id}`);
  }

  public createProduct(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.PRODUCT}`, payload);
  }

  public getProductSize() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_ALL_SIZES}`);
  }

  public getDetailProductSize(id: string) {
    return this.httpClient.get(
      `${ENVIRONMENT}${API_URL.DETAIL_PRODUCT_SIZE}/${id}`
    );
  }

  public updateProductSize(id: string, payload: any) {
    return this.httpClient.put(
      `${ENVIRONMENT}${API_URL.PRODUCT_SIZE}/${id}`,
      payload
    );
  }

  public createProductSize(payload: any) {
    return this.httpClient.post(
      `${ENVIRONMENT}${API_URL.PRODUCT_SIZE}`,
      payload
    );
  }

  public deleteProductSize(id: string) {
    return this.httpClient.delete(
      `${ENVIRONMENT}${API_URL.PRODUCT_SIZE}/${id}`
    );
  }

  public getProductPrice() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_ALL_PRICES}`);
  }

  public getDetailProductPrice(id: string) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.PRODUCT_PRICE}/${id}`);
  }

  public updateProductPrice(id: string, payload: any) {
    return this.httpClient.put(
      `${ENVIRONMENT}${API_URL.PRODUCT_PRICE}/${id}`,
      payload
    );
  }

  public createProductPrice(payload: any) {
    return this.httpClient.post(
      `${ENVIRONMENT}${API_URL.PRODUCT_PRICE}`,
      payload
    );
  }

  public deleteProductPrice(id: string) {
    return this.httpClient.delete(
      `${ENVIRONMENT}${API_URL.PRODUCT_PRICE}/${id}`
    );
  }
}
