import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductManagementComponent } from "./product-management.component";
import { RouterModule, Routes } from "@angular/router";
import { ProductModalComponent } from "./product-modal/product-modal.component";
import { SharedModule } from "../../components/shared.module";

const routes: Routes = [
  { path: "", pathMatch: "full", component: ProductManagementComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [ProductManagementComponent, ProductModalComponent],
})
export class ProductManagementModule {}
