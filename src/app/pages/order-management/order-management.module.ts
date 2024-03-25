import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../components/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PipesModule } from "../../public/pipes/pipes.module";
import { DirectivesModule } from "../../public/directives/directives.module";

const routes: Routes = [
  { path: "orders", component: OrderListComponent, pathMatch: "full" },
  {
    path: "order-detail/:id",
    component: OrderDetailComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    PipesModule,
    DirectivesModule,
  ],
  declarations: [OrderListComponent, OrderDetailComponent],
})
export class OrderManagementModule {}
