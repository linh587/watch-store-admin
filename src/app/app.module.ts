import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routing";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PagesComponent } from "./pages/pages.component";
import { SharedModule } from "./components/shared.module";
import { AppInterceptor } from "./public/interceptors/app.interceptor";
import { AppGetTokenInterceptor } from "./public/interceptors/get-token.interceptor";
import { JwtModule } from "@auth0/angular-jwt";
import { ErrorInterceptor } from "./public/interceptors/error.interceptor";
import { CloudinaryModule } from "@cloudinary/ng";

@NgModule({
  declarations: [AppComponent, PagesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    CloudinaryModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppGetTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

function tokenGetter() {
  return localStorage.getItem("JWT_TOKEN");
}
