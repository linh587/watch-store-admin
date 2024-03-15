import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, catchError, take, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ConfirmModalComponent } from "../../../components/confirm-modal/confirm-modal.component";
import { ProductService } from "../../../services/product/product.service";

@Component({
  selector: "app-prod-category-modal",
  templateUrl: "./prod-category-modal.component.html",
  styleUrls: ["./prod-category-modal.component.scss"],
})
export class ProdCategoryModalComponent implements OnInit {
  @Output() listChanged = new EventEmitter();
  public categoryForm!: FormGroup;
  public headingTitle!: string;
  public categoryId!: string;
  public isEdit: boolean = false;
  public categoryDetail$ = new BehaviorSubject<any>(null);
  public categoryStorage: any;

  constructor(
    public modalService: NgbModal,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getCategoryDetail();
  }

  get controls() {
    return this.categoryForm.controls;
  }

  private initForm() {
    this.categoryForm = this.fb.group({
      title: [null, Validators.required],
    });
  }

  public handleCloseModal() {
    this.modalService.dismissAll();
  }

  public onCreateCategory(): boolean {
    const payload: any = this.categoryForm.getRawValue();
    if (!this.categoryId && this.categoryForm.valid) {
      this.productService
        .createCategory(payload)
        .pipe(
          tap((_) => {
            this.listChanged.emit();
            this.toastService.success("Thêm nhóm sản phẩm thành công");
            this.handleCloseModal();
          }),
          catchError((error) => {
            this.toastService.error("Thêm nhóm sản phẩm thất bại");
            return throwError(() => error);
          })
        )
        .subscribe((_) => {});

      return true;
    }
    return false;
  }

  public onUpdateCategory() {
    if (this.categoryForm.valid && this.categoryId) {
      const payload: any = this.categoryForm.getRawValue();
      this.productService
        .updateCategory(this.categoryId, payload)
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

  private getCategoryDetail() {
    if (this.categoryId) {
      this.productService
        .getDetailCategory(this.categoryId)
        .pipe(
          tap((category: any) => {
            this.categoryForm.patchValue({ ...category });
          })
        )
        .subscribe((data) => {
          this.categoryStorage = JSON.parse(JSON.stringify(data));
          this.categoryDetail$.next(data);
        });
    }
  }

  public resetCategory() {
    this.categoryForm.reset();
    this.categoryForm.patchValue(
      { ...this.categoryStorage },
      { emitEvent: false }
    );
    this.categoryDetail$.next(this.categoryStorage);
  }

  public onCancelChanged() {
    this.onOpenConfirmModal("Bạn có chắc chắn huỷ các thay đổi?")
      .closed.pipe(
        take(1),
        tap((state: boolean) => {
          this.isEdit = !state;
          state && this.resetCategory();
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
