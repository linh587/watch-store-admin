import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../../services/auth/auth.service";
import { UserModel } from "../../../models/user.model";

@Component({
  selector: "app-customer-modal",
  templateUrl: "./customer-modal.component.html",
  styleUrls: ["./customer-modal.component.scss"],
})
export class CustomerModalComponent implements OnInit {
  @Output() listChanged = new EventEmitter();
  public titleHeading: string = "";
  public customerForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.customerForm = this.fb.group({
      fullName: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      mobile: ["", Validators.compose([Validators.required])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      role: ["user"],
    });
  }

  public handleCloseModal() {
    this.modalService.dismissAll();
  }

  public onSubmitCustomerForm() {
    if (this.customerForm.valid) {
      const payload: UserModel = this.customerForm.getRawValue();

      this.authService
        .register(payload)
        .pipe(
          tap(() => {
            this.listChanged.emit();
            this.handleRegisterSuccess();
          }),
          catchError((error) => {
            this.toastService.error("Thêm tài khoản thất bại!");
            return throwError(() => error);
          })
        )
        .subscribe((_) => {});
    }
  }

  private handleRegisterSuccess() {
    this.toastService.success("Thêm tài khoản thành công");
    this.onCloseModal();
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }
}
