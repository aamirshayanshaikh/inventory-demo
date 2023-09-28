import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ItemModule} from "./item/item.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./item/index/index.component";
import {ViewComponent} from "./item/view/view.component";
import {EditComponent} from "./item/edit/edit.component";

const routes: Routes = [
  {path: 'home', component: IndexComponent},
  { path: 'post', redirectTo: 'post/index', pathMatch: 'full'},
  { path: 'post/index', component: IndexComponent },
  { path: 'post/:postId/view', component: ViewComponent },
/*  { path: 'post/create', component: CreateComponent , pathMatch: 'full'},*/
  { path: 'post/:postId/edit', component: EditComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ItemModule,
    HttpClientModule,
    RouterModule.forRoot(routes),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
