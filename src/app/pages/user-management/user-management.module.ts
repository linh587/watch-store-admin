import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CustomerComponent } from "./customer/customer.component";
import { StaffComponent } from "./staff/staff.component";
import { SupplierComponent } from "./supplier/supplier.component";
import { SharedModule } from "../../components/shared.module";
import { CustomerModalComponent } from "./customer/customer-modal/customer-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SupplierModalComponent } from "./supplier/supplier-modal/supplier-modal.component";

const routes: Routes = [
  {
    path: "customers",
    pathMatch: "full",
    component: CustomerComponent,
  },
  {
    path: "staffs",
    pathMatch: "full",
    component: StaffComponent,
  },
  {
    path: "suppliers",
    pathMatch: "full",
    component: SupplierComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CustomerComponent,
    StaffComponent,
    SupplierComponent,
    CustomerModalComponent,
    SupplierModalComponent
  ],
})
export class UserManagementModule {}
