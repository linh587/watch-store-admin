import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceiptManagementComponent } from "./receipt-management.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../components/shared.module";
import { ReceiptModalComponent } from "./receipt-modal/receipt-modal.component";
import { PipesModule } from "../../public/pipes/pipes.module";
import { DirectivesModule } from "../../public/directives/directives.module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "receipts",
    component: ReceiptManagementComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  declarations: [ReceiptManagementComponent, ReceiptModalComponent],
})
export class ReceiptManagementModule {}
