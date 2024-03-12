import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProdCategoryManagementComponent } from "./prod-category-management.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProdCategoryModalComponent } from "./prod-category-modal/prod-category-modal.component";
import { SharedModule } from "../../components/shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: ProdCategoryManagementComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProdCategoryManagementComponent, ProdCategoryModalComponent],
})
export class ProdCategoryManagementModule {}
