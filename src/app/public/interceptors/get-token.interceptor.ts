import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { StorageService } from "../../services/storage/storage.service";

@Injectable()
export class AppGetTokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((res: any) => {
        // const token = this.getTokenKey(request.url);
        // const token = res?.body?.token;
        // if (!token) {
        //   return next.handle(request);
        // } else {
        //   const cloneReq = request.clone({
        //     headers: request.headers
        //       .set("Authorization", "Bearer" + token)
        //       .set("enctype", "mutipart/form-data")
        //       .set("Content-Type", "application/json; charset-utf-8")
        //       .set("X-Request-With", "XMLHttpRequest"),
        //   });
        //   return next.handle(cloneReq);
        // }
      })
    );
  }
}
