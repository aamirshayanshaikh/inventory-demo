import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ItemService} from "../item.service";
import {SharedService} from "../shared-service.service";
import {Item} from "../item";

@Component({
  selector: 'item-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./gird.component.css']
})
export class GridComponent implements OnInit {

  @Output() dataEmitted = new EventEmitter<Item>();

  items: Item[] = [];

  pageSize = 10;
  page = 1;
  sortBy = 'itemId';
  totalElements = 0;
  totalPages = 0;


  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public postService: ItemService, private sharedService: SharedService) {
    this.sharedService.itemReflected.subscribe(() => {
      this.postService.getAll(this.pageSize, (this.page-1), this.sortBy).subscribe((data: any) => {
        this.items = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        console.log(this.items);
      })
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.postService.getAll(this.pageSize, (this.page-1), this.sortBy).subscribe((data: any) => {
      this.items = data.content;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      console.log("A");
    })
  }


  /**
   * Write code on Method
   *
   * @return response()
   */
  editPost(item: Item) {
    this.dataEmitted.emit(item)
  }

  deletePost(itemId: number) {
    this.postService.delete(itemId).subscribe(res => {
      this.items = this.items.filter(item => item.itemId !== itemId);
      console.log('Item deleted successfully!');
      this.sharedService.itemReflected.emit(itemId);
    })
  }

  onPageChange(page: number) {
    this.page = page;
    this.postService.getAll(this.pageSize, (this.page-1), this.sortBy)
      .subscribe((data: any) => {
        this.items = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;

      })
    console.log("B");
  }






}
