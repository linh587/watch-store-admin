import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { Subject, catchError, takeUntil, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public subscription$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      fullName: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      mobile: [null, Validators.required],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  public onRegisterFormSubmit() {
    if (this.registerForm.valid) {
      const payload: any = this.registerForm.getRawValue();

      this.authService
        .register(payload)
        .pipe(
          tap(() => {
            this.toastService.success("Bạn đã đăng ký thành công");
          }),
          takeUntil(this.subscription$),
          catchError((error) => {
            this.toastService.error("Đăng ký thất bại");
            return throwError(() => error);
          })
        )
        .subscribe((_) => {});
    }
  }
}
