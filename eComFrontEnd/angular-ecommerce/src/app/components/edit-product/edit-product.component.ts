import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AppValidators } from 'src/app/validators/app-validators';

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
    private router: Router,
  ) {}

  get theProductId(){return +this.route.snapshot.paramMap.get("id")!}

  ngOnInit(): void {
    this.addProductFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        //add validators
        name: new FormControl("", [
          Validators.required,
          AppValidators.min2Length,
          AppValidators.notOnlyWhiteSpace
        ]),
        desc: new FormControl("", [
          Validators.required,
          AppValidators.min2Length,
          AppValidators.notOnlyWhiteSpace
        ]),
        price: new FormControl("", [
          Validators.required,
          AppValidators.notOnlyWhiteSpace
        ]),
        available: new FormControl("", []),
        image: new FormControl("", []),
        rating: new FormControl("", []),
      }),
    });
    this.productService.getProduct(this.theProductId).subscribe(
      data => {
        console.log(data.name);
        this.product = data;
        this.name.setValue(this.product!.name);
        this.desc.setValue(this.product!.desc);
        this.price.setValue(this.product!.price);
        this.available.setValue(this.product!.available ? "available" : "not available");
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
    if (this.addProductFormGroup.invalid) {
      this.addProductFormGroup.markAllAsTouched();
    } else {
      this.productService.updateProduct(new Product(
        this.theProductId,
        this.name.value,
        this.desc.value,
        this.price.value,
        this.available.value == "available" ? 1 : 0,
        null,
        this.rating.value,
      )).subscribe(
        data => {
          if(data.get("code") == 200){
            this.router.navigate(['home']);
          }
          console.log(data);
        }
      )
    }
  }

}
