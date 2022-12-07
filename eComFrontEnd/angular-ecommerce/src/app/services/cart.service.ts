import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }
  addToCart(theCartItem: CartItem) {

    let newCartItem: boolean = true;

    if (this.cartItems.length > 0) {
      this.cartItems.forEach(cartItem => {
        if (cartItem.id == theCartItem.id) {
          cartItem.quantity++;
          newCartItem = false;
        }
      })
    }
    if (newCartItem) {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }


  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.removeFromCart(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  removeFromCart(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(cardItem => cardItem.id === theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    this.cartItems.forEach(cartItem => {
      totalPriceValue += cartItem.price * cartItem.quantity;
      totalQuantityValue += cartItem.quantity;
    });
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

}
