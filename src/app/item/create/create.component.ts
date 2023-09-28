import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ItemService} from "../item.service";
import {SharedService} from "../shared-service.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public postService: ItemService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      itemSellingPrice: new FormControl('', Validators.required),
      itemBuyingPrice: new FormControl('', Validators.required)
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }


  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe(() => {
      console.log('Post created successfully!');
      this.sharedService.itemCreated.emit();
    })
  }



}
