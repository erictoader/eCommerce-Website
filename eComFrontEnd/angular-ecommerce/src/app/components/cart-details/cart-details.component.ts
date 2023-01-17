import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService, private router: Router, private loginService: LoginService) { }
  
  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem){
    this.cartService.decrementQuantity(cartItem);
  }

  removeFromCart(cartItem: CartItem){
    this.cartService.removeFromCart(cartItem);
  }

  isLoggedIn(){
    return this.loginService.getUser() != null;
  }

  gotoCheckout(){
    if(this.isLoggedIn()){
      this.router.navigate(["/checkout"]);
    }else{
      this.router.navigate(["/login"]);
    }
  }

}
