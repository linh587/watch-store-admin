import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, catchError, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../../services/auth/auth.service";
import { StorageService } from "../../../services/storage/storage.service";
import { Router } from "@angular/router";
import { UserModel } from "../../../models/user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public subscription$ = new Subject();
  public submitted = false;
  public fieldTextType!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  get controls() {
    return this.loginForm.controls;
  }

  private initForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  public onLoginFormSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const payload: UserModel = this.loginForm.getRawValue();

      this.authService
        .login(payload)
        .pipe(
          tap((data: any) => {
            this.storageService.set("AUTH_USER", data);
            this.storageService.set("JWT_TOKEN", data.accessToken);
            this.handleLoginSuccess();
            this.getCurrentUserLogin(data.username);
          }),
          catchError((error) => {
            if (error.status === 400) {
              this.toastService.error(
                "Đăng nhập không thành công.🤪",
                "Xảy ra lỗi!"
              );
            } else {
              this.toastService.warning(
                "Tài khoản của bạn không phải là admin!",
                "Cảnh báo!"
              );
            }
            return throwError(error);
          })
        )
        .subscribe((_) => {});
    }
  }

  private getCurrentUserLogin(username: string): void {
    this.authService
      .currentUserInfo(username)
      .pipe(
        tap((data: any) => {
          this.storageService.set("USER_LOGIN", { ...data });
          this.authService.setUserInfo({ ...data });
        })
      )
      .subscribe();
  }

  private handleLoginSuccess(): void {
    this.toastService.success(
      "Chào mừng quay trở lại hệ thống.😎",
      "Đăng nhập thành công"
    );
    this.router.navigateByUrl("/dashboard");
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }

  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
