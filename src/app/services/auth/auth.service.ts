import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BaseHttpRequest } from "../http/base-http-request.service";
import { UserModel } from "../../models/user.model";
import { API_URL, ENVIRONMENT } from "../../public/constants/api-url";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseHttpRequest {
  private userLogin$ = new BehaviorSubject<any>(null);

  public login(payload: any) {
    return this.httpClient.post(`${ENVIRONMENT}${API_URL.LOGIN}`, payload);
  }

  public getUserInfo() {
    if (this.userLogin$.value) {
      return this.userLogin$ as Observable<any>;
    } else {
      const user = this.storageService.get("USER_LOGIN");
      this.setUserInfo(user);

      return this.userLogin$ as Observable<any>;
    }
  }

  public setUserInfo(data: UserModel) {
    this.userLogin$.next(data);
  }

  public currentUserInfo(username: string) {
    return this.httpClient.get(
      `${ENVIRONMENT}${API_URL.GET_DETAIL_USER}/${username}`
    );
  }

  public getAllUser() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.GET_ALL_USER}`);
  }

  public refreshToken() {
    return this.httpClient.get(`${ENVIRONMENT}${API_URL.REFRESH_TOKEN}`);
  }
}
