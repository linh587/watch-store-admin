import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerManagementComponent } from "./customer-management.component";
import { RouterModule, Routes } from "@angular/router";
import { CustomerModalComponent } from "./customer-modal/customer-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../components/shared.module";

const routes: Routes = [
  { path: "", pathMatch: "full", component: CustomerManagementComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [CustomerManagementComponent, CustomerModalComponent],
})
export class CustomerManagementModule {}
