import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../../services/user/user.service";
import { BehaviorSubject, catchError, take, tap, throwError } from "rxjs";
import { ConfirmModalComponent } from "../../../components/confirm-modal/confirm-modal.component";
import { ProductService } from "../../../services/product/product.service";

@Component({
  selector: "app-receipt-modal",
  templateUrl: "./receipt-modal.component.html",
})
export class ReceiptModalComponent implements OnInit {
  @Output() listChanged = new EventEmitter();
  public titleHeading: string = "";
  public products$ = new BehaviorSubject<any>(null);
  public suppliers$ = new BehaviorSubject<any>(null);
  public selectedProduct: any[] = [];
  public productDetail: any[] = [];
  public productSizes$ = new BehaviorSubject<any>(null);

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getListProduct();
    this.getListSupplier();
    this.getListSize();
  }

  private initForm() {}

  public onHandleChecked(event: any, productId: string) {
    if (event.target.checked) {
      this.selectedProduct.push(productId);
    } else {
      const index = this.selectedProduct.indexOf(productId);
      if (index !== -1) {
        this.selectedProduct.splice(index, 1);
        const objIndex = this.productDetail.findIndex(
          (item) => item.id === productId
        );
        if (objIndex !== -1) {
          this.productDetail.splice(objIndex, 1);
        }
      }
    }
  }

  public isChecked(productId: string): boolean {
    return this.selectedProduct.includes(productId);
  }

  public getListProduct() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products$.next(res.data);
    });
  }

  public getListSupplier() {
    this.userService.getAllSupplier().subscribe((res: any) => {
      this.suppliers$.next(res);
    });
  }

  public getListSize() {
    this.productService.getProductSize().subscribe((res: any) => {
      this.productSizes$.next(res);
    });
  }

  public onCloseModal() {
    this.modalService.dismissAll();
  }
}
