import { Component, OnInit } from "@angular/core";
import { BC_DASHBOARD } from "../../public/constants/bread-crumb";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  public breadCrumbItems = BC_DASHBOARD;

  constructor() {}

  ngOnInit() {}
}
