import {Component, OnInit} from '@angular/core';
import {Item} from "../item";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  posts: Item[] = [];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public postService: ItemService) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Item[])=>{
      this.posts = data;
      console.log(this.posts);
    })
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item.id !== id);
      console.log('Post deleted successfully!');
    })
  }

}
