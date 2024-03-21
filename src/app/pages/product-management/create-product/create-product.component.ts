import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ProductService } from "../../../services/product/product.service";
import { catchError, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent implements OnInit {
  public breadCrumbItems!: Array<{}>;
  public Editor = ClassicEditor;
  public productForm!: FormGroup;
  public categories: any[] = [];
  public productSizes: any[] = [];
  public selectedProductSize: any[] = [];
  public priceInput: any[] = [];
  public priceInformationJsons: any[] = [];
  public productId!: string;

  public config: DropzoneConfigInterface = {
    url: "https://httpbin.org/post",
    maxFilesize: 50,
    acceptedFiles: "image/*",
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getAllCategory();
    this.getAllProductSize();
    this.getBreadCrumb();
  }

  private getBreadCrumb() {
    this.breadCrumbItems = [{ label: "Thêm sản phẩm" }];
  }

  private initForm() {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      status: ["show"],
      categoryId: ["", Validators.required],
      coverImageFile: ["", Validators.required],
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

  public uploadCoverImage(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length <= 0) {
      return;
    }
    const imageFile = fileInput.files[0];

    this.productForm.controls["coverImageFile"].setValue(imageFile);
  }

  public onCreateProduct() {
    const formData: any = new FormData();

    if (this.productForm.valid && this.priceInformationJsons.length) {
      formData.append("name", this.productForm.get("name")?.value);
      formData.append(
        "description",
        this.productForm.get("description")?.value
      );
      formData.append("status", this.productForm.get("status")?.value);
      formData.append("categoryId", this.productForm.get("categoryId")?.value);
      formData.append(
        "coverImageFile",
        this.productForm.get("coverImageFile")?.value
      );

      this.priceInformationJsons.forEach((p) => {
        formData.append("priceInformationJsons", JSON.stringify(p));
      });

      this.productService
        .createProduct(formData)
        .pipe(
          tap((_) => {
            this.toastService.success("Thêm sản phẩm thành công");
            this.productForm.reset();
            this.priceInformationJsons = [];
            this.selectedProductSize = [];
            this.priceInput = [];
          }),
          catchError((error) => {
            this.toastService.error("Thêm sản phẩm thất bại");
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }

  public onHandleChecked(event: any, productSizeId: string) {
    if (event.target.checked) {
      this.selectedProductSize.push(productSizeId);
    } else {
      const index = this.selectedProductSize.indexOf(productSizeId);
      if (index !== -1) {
        this.selectedProductSize.splice(index, 1);
        const objIndex = this.priceInformationJsons.findIndex(
          (item) => item.productSizeId === productSizeId
        );
        if (objIndex !== -1) {
          this.priceInformationJsons.splice(objIndex, 1);
        }
      }
    }
  }

  public isChecked(productSizeId: string): boolean {
    return this.selectedProductSize.includes(productSizeId);
  }

  public onHandlePriceInput(event: any, productSizeId: string) {
    const priceInputValue = parseFloat(event.target.value);

    const existingIndex = this.priceInformationJsons.findIndex(
      (item) => item.productSizeId === productSizeId
    );

    if (existingIndex !== -1) {
      this.priceInformationJsons[existingIndex].price = priceInputValue;
    } else {
      this.priceInformationJsons.push({
        productSizeId: productSizeId,
        price: priceInputValue,
      });
    }
  }
}
