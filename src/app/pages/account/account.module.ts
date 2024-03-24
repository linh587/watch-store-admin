import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../components/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginStaffComponent } from "./login-staff/login-staff.component";
import { LoginAdminComponent } from "./login-admin/login-admin.component";

const routes: Routes = [
  {
    path: "login/admin",
    component: LoginAdminComponent,
  },
  {
    path: "login/staff",
    component: LoginStaffComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginAdminComponent, LoginStaffComponent],
})
export class AccountModule {}
