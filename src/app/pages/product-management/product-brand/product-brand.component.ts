import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription, catchError, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { COLUMN_OF_CATEGORIES } from "../../../public/constants/column-of-table";
import { ProductService } from "../../../services/product/product.service";
import { BC_PRODUCT } from "../../../public/constants/bread-crumb";
import { ProductBrandModalComponent } from "../product-brand-modal/product-brand-modal.component";
import { ConfirmModalComponent } from "../../../components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-product-brand",
  templateUrl: "./product-brand.component.html"
})
export class ProductBrandComponent implements OnInit, OnDestroy {
  public breadCrumbsItem!: Array<{}>;
  public categories: any[] = [];
  public COLUMNS = COLUMN_OF_CATEGORIES;
  public subscription$!: Subscription;

  constructor(
    public modalService: NgbModal,
    private productService: ProductService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.breadCrumbsItem = BC_PRODUCT;
    this.getListCategory();
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }

  public onOpenAddModal() {
    const modal = this.modalService.open(ProductBrandModalComponent, {
      size: "lg",
      centered: true,
    });

    modal.componentInstance.headingTitle = "Thêm nhóm sản phẩm";
    this.subscription$ = modal.componentInstance.listChanged.subscribe(() =>
      this.getListCategory()
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

  public onDeleteCategory(id: string) {
    this.onOpenConfirmModal(
      "Xoá nhóm sản phẩm",
      "Bạn có chắc chắn muốn xoá nhóm sản phẩm này ra khỏi hệ thống?"
    )
      .closed.pipe(
        tap((state: boolean) => {
          state && this.handleDeleteCategory(id);
        })
      )
      .subscribe();
  }

  public handleDeleteCategory(id: string) {
    this.productService
      .deleteCategory(id)
      .pipe(
        tap(
          () => this.toastService.success("Xoá thành công"),
          catchError((error) => {
            this.toastService.error("Xoá thất bại");
            return throwError(() => error);
          })
        )
      )
      .subscribe(() => this.getListCategory());
  }

  public getListCategory() {
    this.productService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  public onOpenEditModal(id: string) {
    const modal = this.modalService.open(ProductBrandModalComponent, {
      size: "lg",
      centered: true,
    });

    modal.componentInstance.categoryId = id;
    modal.componentInstance.headingTitle = "Sửa nhóm sản phẩm";

    modal.componentInstance.listChanged.subscribe(() => this.getListCategory());
  }

  public updatePage(event: any) {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.subscription$ ? this.subscription$.unsubscribe() : null;
  }
}
