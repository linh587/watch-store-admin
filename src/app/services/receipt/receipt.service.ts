import { Injectable } from "@angular/core";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class ReceiptService extends BaseHttpRequest {
  public getListReceipt() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.RECEIPT}`);
  }

  public createReceipt(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.RECEIPT}`, payload);
  }

  public getDetailReceipt(id: string) {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.RECEIPT}/${id}`);
  }
}
