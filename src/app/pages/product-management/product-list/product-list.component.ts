import { Component, OnInit } from "@angular/core";
import { COLUMN_OF_PRODUCTS } from "../../../public/constants/column-of-table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { BC_PRODUCT } from "../../../public/constants/bread-crumb";
import { ConfirmModalComponent } from "../../../components/confirm-modal/confirm-modal.component";
import { ProductService } from "../../../services/product/product.service";
import { createCloudinaryThumbLink } from "../../../public/helpers/images";
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  public breadCrumbsItem!: Array<{}>;
  public COLUMNS = COLUMN_OF_PRODUCTS;
  public products: any[] = [];
  public createCloudinaryThumbLink = createCloudinaryThumbLink;
  public role!: string;

  constructor(
    public modalService: NgbModal,
    public router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.breadCrumbsItem = BC_PRODUCT;
    this.getListProduct();
    this.role = this.authService.getRole();
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }

  public onOpenConfirmModal(id: string) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });

    modalRef.componentInstance.title = "Xoá sản phẩm";
    modalRef.componentInstance.content =
      "Bạn có chắc chắn muốn xoá sản phẩm này ra khỏi hệ thống?";
  }

  public getListProduct() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res.data;
    });
  }

  public onRouterToUpdate(id: string) {
    this.router.navigate([`/product-management/update-product/${id}`]).then();
  }
}
