import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetNameByIdDirective } from "./get-name-by-id.directive";

const DIRECTIVES = [GetNameByIdDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class DirectivesModule {}
