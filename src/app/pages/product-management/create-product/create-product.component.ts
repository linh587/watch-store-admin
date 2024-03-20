import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ProductService } from "../../../services/product/product.service";
import { catchError, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent implements OnInit {
  public selectValue = ["Choice 1", "Choice 2", "Choice 3"];
  public breadCrumbItems!: Array<{}>;
  public Editor = ClassicEditor;
  public productForm!: FormGroup;
  public categories: any[] = [];
  public productSizes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getAllCategory();
    this.getAllProductSize();
    this.breadCrumbItems = [{ label: "Thêm sản phẩm" }];
  }

  private initForm() {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      status: ["show"],
      categoryId: ["", Validators.required],
      coverImage: [
        "https://img.ws.mms.shopee.vn/8b296f7ea5efdd5f3e5361953c565c22",
        Validators.required,
      ],
      images: [
        [
          "https://img.ws.mms.shopee.vn/8b296f7ea5efdd5f3e5361953c565c22",
          "https://img.ws.mms.shopee.vn/8b296f7ea5efdd5f3e5361953c565c22",
        ],
        Validators.required,
      ],
      productSizeId: ["", Validators.required],
      price: [null, Validators.required],
    });
  }

  private getAllCategory() {
    this.productService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  private getAllProductSize() {
    this.productService.getProductSize().subscribe((res: any) => {
      this.productSizes = res;
    });
  }

  public onCreateProduct(formValue: any) {
    const priceInformationJsons = JSON.stringify({
      productSizeId: formValue.productSizeId,
      price: formValue.price,
    });
    const formData: any = new FormData();

    if (this.productForm.valid) {
      formData.append("name", this.productForm.get("name")?.value);
      formData.append(
        "description",
        this.productForm.get("description")?.value
      );
      formData.append("status", this.productForm.get("status")?.value);
      formData.append("categoryId", this.productForm.get("categoryId")?.value);
      formData.append("coverImage", this.productForm.get("coverImage")?.value);
      formData.append("images", this.productForm.get("images")?.value);
      formData.append("priceInformationJsons", priceInformationJsons);

      this.productService
        .createProduct(formData)
        .pipe(
          tap((_) => {
            this.toastService.success("Thêm sản phẩm thành công");
            this.productForm.reset();
          }),
          catchError((error) => {
            this.toastService.error("Thêm sản phẩm thất bại");
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }
}
