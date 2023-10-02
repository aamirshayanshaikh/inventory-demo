import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Item} from "../item";
import {ItemService} from "../item.service";
import {SharedService} from "../shared-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  form!: FormGroup;
  showSuccessToast: boolean = false;
  message: string = '';
  isUpdate: boolean = false;
  item: Item = {
    itemId: 0,
    itemName: '',
    itemSellingPrice: 0,
    isItemAvailable: '1',
    itemBuyingPrice: 0,
    itemEnteredByUser: ''
  };

// Trigger the toast
  constructor(
    public postService: ItemService,
    private router: Router,
    private sharedService: SharedService
  ) {
  }



  handleData(item: Item) {
    this.item = item;
    this.isUpdate = true;

  }

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
    if (this.isUpdate){
      this.postService.update(this.item.itemId, this.form.value).subscribe(() => {
        this.showSuccessToast = true
        this.message = "Item Updated Successfully!"
        this.sharedService.itemReflected.emit();
      });

    }else {
      this.postService.create(this.form.value).subscribe(() => {
        this.showSuccessToast = true
        this.message = "Item Added Successfully!"
        this.sharedService.itemReflected.emit();
      })
    }

    setTimeout(()=>{
      this.showSuccessToast = false
      this.sharedService.itemReflected.emit();
    },3000);

  }

}
