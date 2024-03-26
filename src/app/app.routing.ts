import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { SharedModule } from "./components/shared.module";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canLoad: [AuthGuard],
    children: [
      {
        path: "",
        canLoad: [AuthGuard],
        pathMatch: "full",
        redirectTo: "dashboard",
      },
      {
        path: "dashboard",
        canLoad: [AuthGuard],
        loadChildren: () =>
          import("./pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "user-management",
        canLoad: [AuthGuard],
        loadChildren: () =>
          import("./pages/user-management/user-management.module").then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: "product-management",
        canLoad: [AuthGuard],
        loadChildren: () =>
          import("./pages/product-management/product-management.module").then(
            (m) => m.ProductManagementModule
          ),
      },
      {
        path: "order-management",
        canLoad: [AuthGuard],
        loadChildren: () =>
          import("./pages/order-management/order-management.module").then(
            (m) => m.OrderManagementModule
          ),
      },
      {
        path: "receipt-management",
        canLoad: [AuthGuard],
        loadChildren: () =>
          import("./pages/receipt-management/receipt-management.module").then(
            (m) => m.ReceiptManagementModule
          ),
      },
    ],
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./pages/account/account.module").then((m) => m.AccountModule),
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SharedModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
