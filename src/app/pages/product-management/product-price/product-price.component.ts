import { Component, OnInit } from "@angular/core";
import { COLUMN_OF_PRICE } from "../../../public/constants/column-of-table";
import { ProductService } from "../../../services/product/product.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from "../../../components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-product-price",
  templateUrl: "./product-price.component.html",
})
export class ProductPriceComponent implements OnInit {
  public breadCrumbsItem!: Array<{}>;
  public prices: any;
  public COLUMNS = COLUMN_OF_PRICE;
  public productList: any[] = [];
  public productSizeList: any[] = [];

  constructor(
    public modalService: NgbModal,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getListProductPrice();
    this.getAllProduct();
    this.getAllProductSize();
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }

  public onOpenConfirmModal(title?: string, content?: string) {
    const modal = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });

    modal.componentInstance.title = title;
    modal.componentInstance.content = content;

    return modal;
  }

  private getListProductPrice() {
    this.productService.getProductPrice().subscribe((res: any) => {
      this.prices = res;
    });
  }

  private getAllProduct() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.productList = res.data;
    });
  }

  private getAllProductSize() {
    this.productService.getProductSize().subscribe((res: any) => {
      this.productSizeList = res;
    });
  }
}
