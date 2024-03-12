import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from "@angular/router";

// Auth Services
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { StorageService } from "../services/storage/storage.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.authService.getUserInfo();

    if (currentUser) {
      return true;
    } else {
      this.router.navigate(["/auth/login"]).then();
      return false;
    }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const hasToken = Boolean(this.storageService.get("JWT_TOKEN"));

    // Nếu không có token or permission sẽ chạy sang login.
    if (!hasToken) {
      this.router.navigate(["/auth/login"]).then();
      return false;
    }
    return true;
  }
}
