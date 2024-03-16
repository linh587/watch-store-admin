import { Component, OnInit } from "@angular/core";
import { COLUMN_OF_ORDERS } from "../../../public/constants/column-of-table";

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

  constructor() {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: "Đơn hàng" }];
  }
}
