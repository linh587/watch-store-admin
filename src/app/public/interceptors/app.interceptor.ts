import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { IS_CALL_API } from "../../services/http/base-http-request.service";
import { StorageService } from "../../services/storage/storage.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private readonly token: any;

  constructor(private storageService: StorageService) {
    this.token = this.storageService.get("JWT_TOKEN");
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.token) {
      return next.handle(req);
    } else {
      const cloneReq = req.clone({
        headers: req.headers
          .set("Authorization", "Bearer" + this.token)
          .set("enctype", "mutipart/form-data")
          .set("Content-Type", "application/json; charset-utf-8")
          .set("X-Request-With", "XMLHttpRequest"),
      });

      return next.handle(cloneReq);
    }
  }
}
