import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerModalComponent } from "./customer-modal/customer-modal.component";
import { Subscription } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { COLUMN_OF_CUSTOMERS } from "../../public/constants/column-of-table";
import { BC_CUSTOMER } from "../../public/constants/bread-crumb";
import { UserModel } from "../../models/user.model";

@Component({
  selector: "app-customer-management",
  templateUrl: "./customer-management.component.html",
  styleUrls: ["./customer-management.component.scss"],
})
export class CustomerManagementComponent implements OnInit, OnDestroy {
  public breadCrumbsItem!: Array<{}>;
  public COLUMNS = COLUMN_OF_CUSTOMERS;
  public customers!: UserModel[];
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
    this.authService
      .getAllUser()
      .subscribe((res: any) => (this.customers = res));
  }

  public onOpenAddModal() {
    const modalRef = this.modalService.open(CustomerModalComponent, {
      size: "lg",
      centered: true,
      backdrop: "static",
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
