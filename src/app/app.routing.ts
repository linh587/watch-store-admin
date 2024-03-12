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
        path: "customer-management",
        canLoad: [AuthGuard],
        loadChildren: () =>
          import("./pages/customer-management/customer-management.module").then(
            (m) => m.CustomerManagementModule
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
        path: "product-category-management",
        canLoad: [AuthGuard],
        loadChildren: () =>
          import(
            "./pages/prod-category-management/prod-category-management.module"
          ).then((m) => m.ProdCategoryManagementModule),
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
