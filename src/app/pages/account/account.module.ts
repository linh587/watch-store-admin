import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../components/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginStaffComponent } from "./login-staff/login-staff.component";
import { LoginAdminComponent } from "./login-admin/login-admin.component";
import { AccountComponent } from "./account.component";

const routes: Routes = [
  {
    path: "login",
    component: AccountComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "admin",
      },
      {
        path: "admin",
        component: LoginAdminComponent,
      },
      {
        path: "staff",
        component: LoginStaffComponent,
      },
    ],
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
  declarations: [LoginAdminComponent, LoginStaffComponent, AccountComponent],
})
export class AccountModule {}
