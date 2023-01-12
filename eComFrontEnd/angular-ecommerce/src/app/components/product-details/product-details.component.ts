import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  product!: Product;
  isAdmin: boolean = false;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
    const user: User = this.loginService.getUser();
    this.isAdmin = user.userType == 0;
  }

  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get("id")!;

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart(){
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

  editProduct(){
    const theProductId: number = +this.route.snapshot.paramMap.get("id")!;
    this.router.navigate([`product-edit/${theProductId}`]);
  }

  deleteProduct(){
    const theProductId: number = +this.route.snapshot.paramMap.get("id")!;
    this.productService.deleteProduct(theProductId).subscribe(
      data => {
        console.log(data);
        if(data.get("code") == 200){
          this.router.navigate(['home']);
        } else{
          //stay on page
        }
      }
    )
  }

}
