import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
 
  addProductFormGroup: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.addProductFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        //add validators
        name: new FormControl("", []),
        desc: new FormControl("", []),
        price: new FormControl("", []),
        available: new FormControl("", []),
        image: new FormControl("", []),
        rating: new FormControl("", []),
      }),
    });
  }

  
  get name() { return this.addProductFormGroup.get("product.name")!; }
  get desc() { return this.addProductFormGroup.get("product.desc")!; }
  get price() { return this.addProductFormGroup.get("product.price")!; }
  get available() { return this.addProductFormGroup.get("product.available")!; }
  get image() { return this.addProductFormGroup.get("product.image")!; }
  get rating() { return this.addProductFormGroup.get("product.rating")!; }

  
  onSubmit() {
    console.log("Handling the submit button");

    if (this.addProductFormGroup.invalid) {
      this.addProductFormGroup.markAllAsTouched();
    }else{
      console.log(this.addProductFormGroup.get("product")?.value);

    }
  }

}
