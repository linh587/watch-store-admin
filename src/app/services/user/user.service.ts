import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseHttpRequest {
  public getAllSupplier() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.SUPPLIER}`);
  }

  public createSupplier(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.SUPPLIER}`, payload);
  }

  public updateSupplier(id: string, payload: any) {
    return this.httpClient.put(
      `${ENVIRONMENT}${API_URL.SUPPLIER}/${id}`,
      payload
    );
  }

  public deleteSupplier(id: string) {
    return this.httpClient.delete(`${ENVIRONMENT}${API_URL.SUPPLIER}/${id}`);
  }

  public getDetailSupplier(id: string) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.SUPPLIER}/${id}`);
  }
}
