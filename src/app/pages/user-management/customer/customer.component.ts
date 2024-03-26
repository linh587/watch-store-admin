import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { AuthService } from "../../../services/auth/auth.service";
import { BC_CUSTOMER } from "../../../public/constants/bread-crumb";
import { COLUMN_OF_CUSTOMERS } from "../../../public/constants/column-of-table";
import { CustomerModalComponent } from "./customer-modal/customer-modal.component";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html"
})
export class CustomerComponent implements OnInit, OnDestroy {
  public breadCrumbsItem!: Array<{}>;
  public COLUMNS = COLUMN_OF_CUSTOMERS;
  public customers!: any[];
  public subscription$!: Subscription;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.breadCrumbsItem = BC_CUSTOMER;
    this.getAllUser();
  }

  public trackColumn(index: number, column: any) {
    return column ? column : undefined;
  }

  private getAllUser() {
    this.authService.getAllUser().subscribe((res: any) => {
      this.customers = res.data;
    });
  }

  public onOpenAddModal() {
    const modalRef = this.modalService.open(CustomerModalComponent, {
      size: "lg",
      centered: true,
    });

    modalRef.componentInstance.titleHeading = "Thêm tài khoản";
    this.subscription$ = modalRef.componentInstance.listChanged.subscribe(() =>
      this.getAllUser()
    );
  }

  ngOnDestroy(): void {
    this.subscription$ ? this.subscription$.unsubscribe() : null;
  }
}
