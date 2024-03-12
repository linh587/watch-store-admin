import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, catchError, takeUntil, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../../services/auth/auth.service";
import { StorageService } from "../../../services/storage/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public subscription$ = new Subject();

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
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  public onLoginFormSubmit() {
    if (this.loginForm.valid) {
      const payload: any = this.loginForm.getRawValue();

      this.authService
        .login(payload)
        .pipe(
          tap((data) => {
            this.handleLoginSuccess(data);
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

  private handleLoginSuccess(data: any): void {
    this.toastService.success(
      "Chào mừng quay trở lại hệ thống.😎",
      "Đăng nhập thành công"
    );
    this.router.navigateByUrl("/dashboard");

    this.storageService.set("authUser", data);
    this.storageService.set("JWT_TOKEN", data.token);

    debugger;
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }
}
