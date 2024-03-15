import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../components/shared.module";

const routes: Routes = [
  { path: "", pathMatch: "full", component: DashboardComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
