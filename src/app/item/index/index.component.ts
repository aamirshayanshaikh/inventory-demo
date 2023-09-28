import {Component, OnInit} from '@angular/core';
import {Item} from "../item";
import {ItemService} from "../item.service";
import {SharedService} from "../shared-service.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  posts: Item[] = [];

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
    this.sharedService.itemCreated.subscribe(() => {
      console.log('event called');
      this.postService.getAll(this.pageSize, (this.page-1), this.sortBy).subscribe((data: any) => {
        this.posts = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.page = data.number;
        console.log(this.posts);
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
      this.posts = data.content;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.page = data.number;
      console.log("A");
    })
  }


  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(id: number) {
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item.id !== id);
      console.log('Post deleted successfully!');
    })
  }

  onPageChange(page: number) {
    this.page = page;
    this.postService.getAll(this.pageSize, (this.page-1), this.sortBy) .subscribe((data: any) => {
      this.posts = data.content;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.page = data.number;
      console.log("B");
    })

  }

}
