import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { GridComponent } from './create/grid.component';
import { EditComponent } from './edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbPaginationModule, NgbToastModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    IndexComponent,
    ViewComponent,
    GridComponent,
    EditComponent,
  ],
  exports: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    NgbToastModule

  ]
})
export class ItemModule { }
