import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Order Details", active: true },
    ];
  }
}
