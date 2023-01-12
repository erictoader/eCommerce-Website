import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
 
  displayError: String = "";
  addProductFormGroup: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
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
      this.productService.addProduct(new Product(
        0,
        this.name.value,
        this.desc.value,
        this.price.value,
        1,
        null,
        this.rating.value,
      )).subscribe(
        data => {
          console.log(data);
          if (data.get("code") == 200){
            this.router.navigate(['home']);
          } else {
            this.displayError = data.get("message");
          }
        }
      )
      console.log(this.addProductFormGroup.get("product")?.value);

    }
  }

}
