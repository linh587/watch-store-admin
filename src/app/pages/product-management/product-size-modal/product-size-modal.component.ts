import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, catchError, take, tap, throwError, pipe } from "rxjs";
import { ProductService } from "../../../services/product/product.service";
import { ToastrService } from "ngx-toastr";
import { ConfirmModalComponent } from "../../../components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-product-size-modal",
  templateUrl: "./product-size-modal.component.html",
})
export class ProductSizeModalComponent implements OnInit {
  @Output() listChanged = new EventEmitter();
  public productSizeForm!: FormGroup;
  public headingTitle!: string;
  public productSizeId!: string;
  public isEdit: boolean = false;
  public productSizeDetail$ = new BehaviorSubject<any>(null);
  public productSizeStorage: any;

  constructor(
    public modalService: NgbModal,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getProductSizeDetail();
  }

  get controls() {
    return this.productSizeForm.controls;
  }

  private initForm() {
    this.productSizeForm = this.fb.group({
      name: [null, Validators.required],
    });
  }

  public handleCloseModal() {
    this.modalService.dismissAll();
  }

  public onCreateProductSize(): boolean {
    const payload: any = this.productSizeForm.getRawValue();
    if (!this.productSizeId && this.productSizeForm.valid) {
      this.productService
        .createProductSize(payload)
        .pipe(
          tap((_) => {
            this.listChanged.emit();
            this.toastService.success("Thêm size sản phẩm thành công");
            this.handleCloseModal();
          }),
          catchError((error) => {
            this.toastService.error("Thêm size sản phẩm thất bại");
            return throwError(() => error);
          })
        )
        .subscribe((_) => {});

      return true;
    }
    return false;
  }

  public onUpdateProductSize() {
    if (this.productSizeForm.valid && this.productSizeId) {
      const payload: any = this.productSizeForm.getRawValue();
      this.productService
        .updateProductSize(this.productSizeId, payload)
        .pipe(
          tap(() => {
            this.listChanged.emit();
            this.isEdit = !this.isEdit;
            this.toastService.success("Cập nhật thành công");
            this.handleCloseModal();
          }),
          catchError((error) => {
            this.toastService.error("Cập nhật thất bại");
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }

  private getProductSizeDetail() {
    if (this.productSizeId) {
      this.productService
        .getDetailProductSize(this.productSizeId)
        .pipe(
          tap((productSize: any) => {
            this.productSizeForm.patchValue({ ...productSize });
          })
        )
        .subscribe((data) => {
          this.productSizeStorage = JSON.parse(JSON.stringify(data));
          this.productSizeDetail$.next(data);
        });
    }
  }

  public resetProductSize() {
    this.productSizeForm.reset();
    this.productSizeForm.patchValue(
      { ...this.productSizeStorage },
      { emitEvent: false }
    );
    this.productSizeDetail$.next(this.productSizeStorage);
  }

  public onCancelChanged() {
    this.onOpenConfirmModal("Bạn có chắc chắn huỷ các thay đổi?")
      .closed.pipe(
        take(1),
        tap((state: boolean) => {
          this.isEdit = !state;
          state && this.resetProductSize();
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
}
