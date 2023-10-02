import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {ViewComponent} from "./view/view.component";
import {GridComponent} from "./create/grid.component";
import {EditComponent} from "./edit/edit.component";



@NgModule({
  exports: [RouterModule]
})
export class ItemRoutingModule { }
