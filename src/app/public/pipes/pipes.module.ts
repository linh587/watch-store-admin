import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormatPricePipe } from "./format-price.pipe";
import { OrderStatusPipe } from "./order-status.pipe";
import { OrderStatusColorPipe } from "./order-status-color.pipe";

const PIPES = [FormatPricePipe, OrderStatusPipe, OrderStatusColorPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES],
  exports: [...PIPES],
})
export class PipesModule {}
