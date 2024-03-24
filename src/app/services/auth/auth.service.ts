import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseHttpRequest {
  private userLogin$ = new BehaviorSubject<any>(null);

  //ADMIN
  public loginAdmin(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.LOGIN}`, payload);
  }

  public getCurrentAdmin() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_DETAIL_USER}`);
  }

  public getAllUser() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_ALL_USER}`);
  }

  //STAFF
  public loginStaff(payload: any) {
    return this.httpClient.post(
      `${ENVIRONMENT}${API_URL.STAFF_LOGIN}`,
      payload
    );
  }

  public getCurrentStaff() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_DETAIL_STAFF}`);
  }

  //GENERAL
  public getUserInfo() {
    if (this.userLogin$.value) {
      return this.userLogin$ as Observable<any>;
    } else {
      const user = this.storageService.get("USER_LOGIN");
      this.setUserInfo(user);

      return this.userLogin$ as Observable<any>;
    }
  }

  public setUserInfo(data: any) {
    this.userLogin$.next(data);
  }

  public refreshToken() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.REFRESH_TOKEN}`);
  }

  public getRole(): string {
    const role = this.storageService.get("ROLE");

    return role;
  }
}
