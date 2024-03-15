import { Component, OnInit } from "@angular/core";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent implements OnInit {
  public selectValue = ["Choice 1", "Choice 2", "Choice 3"];
  public breadCrumbItems!: Array<{}>;
  public Editor = ClassicEditor;

  constructor() {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: "Thêm sản phẩm" }];
  }
}
