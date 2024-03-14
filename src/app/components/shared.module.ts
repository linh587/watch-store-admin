import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SimplebarAngularModule } from "simplebar-angular";
import { TableComponent } from "./table/table.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";
import { NgxPaginationModule } from "ngx-pagination";

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  TableComponent,
  BreadcrumbComponent,
  ConfirmModalComponent,
];

@NgModule({
  imports: [CommonModule, SimplebarAngularModule, NgxPaginationModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class SharedModule {}
