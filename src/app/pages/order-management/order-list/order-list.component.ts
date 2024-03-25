import { Component, OnInit } from "@angular/core";
import { COLUMN_OF_ORDERS } from "../../../public/constants/column-of-table";
import { OrderService } from "../../../services/order/order.service";
import { API_URL, ENVIRONMENT } from "../../../public/constants/api-url";
import { BranchService } from "../../../services/branch/branch.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
})
export class OrderListComponent implements OnInit {
  // bread crumb items
  public breadCrumbItems!: Array<{}>;
  public Sell = "Sell";
  public Buy = "Buy";
  public Successful = "Successful";
  public Cancelled = "Cancelled";

  public COLUMNS = COLUMN_OF_ORDERS;
  public orderList: any[] = [];
  public branchs: any[] = [];

  constructor(
    private orderService: OrderService,
    private branchService: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: "Đơn hàng" }];
    this.getOrderList();
    this.getAllBranch();
  }

  private getOrderList() {
    this.orderService
      .get(`${ENVIRONMENT}${API_URL.GET_ALL_ORDER}`)
      .subscribe((res: any) => {
        this.orderList = res.data;
      });
  }

  private getAllBranch() {
    this.branchService.getAllBranch().subscribe((res: any) => {
      this.branchs = res;
    });
  }

  public redirectOrderDetail(id: string) {
    this.router.navigate([`/order-management/order-detail/${id}`]).then();
  }
}
