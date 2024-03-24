import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../components/shared.module";
import { CreateProductComponent } from "./create-product/create-product.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { NgbNavModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import {
  DROPZONE_CONFIG,
  DropzoneConfigInterface,
  DropzoneModule,
} from "ngx-dropzone-wrapper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductBrandComponent } from "./product-brand/product-brand.component";
import { ProductBrandModalComponent } from "./product-brand-modal/product-brand-modal.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductSizeComponent } from "./product-size/product-size.component";
import { ProductSizeModalComponent } from "./product-size-modal/product-size-modal.component";
import { ProductPriceComponent } from "./product-price/product-price.component";
import { DirectivesModule } from "../../public/directives/directives.module";
import { PipesModule } from "../../public/pipes/pipes.module";

const routes: Routes = [
  {
    path: "create-product",
    pathMatch: "full",
    component: CreateProductComponent,
  },
  {
    path: "update-product/:productId",
    pathMatch: "full",
    component: CreateProductComponent,
  },
  {
    path: "brands",
    pathMatch: "full",
    component: ProductBrandComponent,
  },
  {
    path: "products",
    pathMatch: "full",
    component: ProductListComponent,
  },
  {
    path: "sizes",
    pathMatch: "full",
    component: ProductSizeComponent,
  },
  {
    path: "prices",
    pathMatch: "full",
    component: ProductPriceComponent,
  },
];

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: "",
  maxFilesize: 50,
  acceptedFiles: "image/*",
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgSelectModule,
    CKEditorModule,
    NgbNavModule,
    DropzoneModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    FormsModule,
    DirectivesModule,
    PipesModule
  ],
  declarations: [
    CreateProductComponent,
    ProductBrandComponent,
    ProductBrandModalComponent,
    ProductListComponent,
    ProductSizeComponent,
    ProductSizeModalComponent,
    ProductPriceComponent,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
})
export class ProductManagementModule {}
