import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  addProductFormGroup: FormGroup = new FormGroup({});
  private product: Product | undefined;
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
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
    const theProductId: number = +this.route.snapshot.paramMap.get("id")!;
    this.productService.getProduct(theProductId).subscribe(
      data => {
        console.log(data.name);
        this.product = data;
        this.name.setValue(this.product!.name);
        this.desc.setValue(this.product!.desc);
        this.price.setValue(this.product!.price);
        this.available.setValue(this.product!.available);
        this.image.setValue(this.product!.image);
      }
    );
   
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
