import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../../../services/user/user.service";
import { catchError, take, tap, throwError } from "rxjs";
import { ConfirmModalComponent } from "../../../../components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-supplier-modal",
  templateUrl: "./supplier-modal.component.html",
})
export class SupplierModalComponent implements OnInit {
  @Output() listChanged = new EventEmitter();
  public titleHeading: string = "";
  public supplierForm!: FormGroup;
  public supplierId!: string;
  public isEdit: boolean = false;
  public supplierStorage: any;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getSupplierDetail();
  }

  private initForm() {
    this.supplierForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      phone: ["", Validators.compose([Validators.required])],
      address: ["", Validators.required],
      note: [""],
    });
  }

  public onCreateSupplier() {
    if (this.supplierForm.valid && !this.supplierId) {
      this.userService
        .createSupplier(this.supplierForm.value)
        .pipe(
          tap((_) => {
            this.toastService.success("Thêm nhà cung cấp thành công!");
            this.listChanged.emit();
            this.onCloseModal();
          }),
          catchError((error) => {
            this.toastService.error("Thêm nhà cung cấp thất bại");
            return throwError(() => error);
          })
        )
        .subscribe();

      return true;
    }

    return false;
  }

  public onUpdateSupplier() {
    if (this.supplierForm.valid && this.supplierId) {
      this.userService
        .updateSupplier(this.supplierId, this.supplierForm.value)
        .pipe(
          tap((_) => {
            this.isEdit = !this.isEdit;
            this.toastService.success("Sửa nhà cung cấp thành công!");
            this.listChanged.emit();
            this.onCloseModal();
          }),
          catchError((error) => {
            this.toastService.error("Sửa nhà cung cấp thất bại!");
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }

  private getSupplierDetail() {
    if (this.supplierId) {
      this.userService
        .getDetailSupplier(this.supplierId)
        .pipe(
          tap((supplier: any) => {
            this.supplierForm.patchValue({ ...supplier });
          })
        )
        .subscribe((data) => {
          this.supplierStorage = JSON.parse(JSON.stringify(data));
        });
    }
  }

  public onCancelChanged() {
    this.onOpenConfirmModal("Bạn có chắc chắn huỷ các thay đổi?")
      .closed.pipe(
        take(1),
        tap((state: boolean) => {
          this.isEdit = !state;
          state && this.resetSupplier();
        })
      )
      .subscribe();
  }

  public onOpenConfirmModal(title?: string, content?: string) {
    const modal = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });

    modal.componentInstance.title = title;
    modal.componentInstance.content = content;

    return modal;
  }

  public resetSupplier() {
    this.supplierForm.reset();
    this.supplierForm.patchValue(
      { ...this.supplierStorage },
      { emitEvent: false }
    );
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }
}
