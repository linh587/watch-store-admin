import { Component, OnDestroy, OnInit } from "@angular/core";
import { COLUMN_OF_SIZE } from "../../../public/constants/column-of-table";
import { ProductService } from "../../../services/product/product.service";
import { Subscription, catchError, tap, throwError } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ProductSizeModalComponent } from "../product-size-modal/product-size-modal.component";
import { ConfirmModalComponent } from "../../../components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-product-size",
  templateUrl: "./product-size.component.html",
})
export class ProductSizeComponent implements OnInit, OnDestroy {
  public breadCrumbsItem!: Array<{}>;
  public sizes: any;
  public COLUMNS = COLUMN_OF_SIZE;
  public subscription$!: Subscription;

  constructor(
    public modalService: NgbModal,
    private productService: ProductService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getListProductSize();
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }

  public onOpenAddModal() {
    const modal = this.modalService.open(ProductSizeModalComponent, {
      size: "lg",
      centered: true,
    });

    modal.componentInstance.headingTitle = "Thêm size sản phẩm";
    this.subscription$ = modal.componentInstance.listChanged.subscribe(() =>
      this.getListProductSize()
    );
  }

  public onOpenConfirmModal(title?: string, content?: string) {
    const modal = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });

    modal.componentInstance.title = title;
    modal.componentInstance.content = content;

    return modal;
  }

  public onDeleteProductSize(id: string) {
    this.onOpenConfirmModal(
      "Xoá nhóm sản phẩm",
      "Bạn có chắc chắn muốn xoá nhóm sản phẩm này ra khỏi hệ thống?"
    )
      .closed.pipe(
        tap((state: boolean) => {
          state && this.handleDeleteProductSize(id);
        })
      )
      .subscribe();
  }

  public handleDeleteProductSize(id: string) {
    this.productService
      .deleteProductSize(id)
      .pipe(
        tap(
          () => this.toastService.success("Xoá thành công"),
          catchError((error) => {
            this.toastService.error("Xoá thất bại");
            return throwError(() => error);
          })
        )
      )
      .subscribe(() => this.getListProductSize());
  }

  public getListProductSize() {
    this.productService.getProductSize().subscribe((res: any) => {
      this.sizes = res;
    });
  }

  public onOpenEditModal(id: string) {
    const modal = this.modalService.open(ProductSizeModalComponent, {
      size: "lg",
      centered: true,
    });

    modal.componentInstance.productSizeId = id;
    modal.componentInstance.headingTitle = "Sửa size sản phẩm";

    modal.componentInstance.listChanged.subscribe(() =>
      this.getListProductSize()
    );
  }

  ngOnDestroy(): void {
    this.subscription$ ? this.subscription$.unsubscribe() : null;
  }
}
