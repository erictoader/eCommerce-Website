import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/order-item';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { AppValidators } from 'src/app/validators/app-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  checkoutFormGroup: FormGroup = new FormGroup({});

  cardMonths: number[] = [];
  cardYears: number[] = [];

  user: User | null = null;

  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router,
    private loginService: LoginService
    ) {
  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      shippingAddress: this.formBuilder.group({
        street: new FormControl("", [
          Validators.required, 
          AppValidators.min2Length, 
          AppValidators.notOnlyWhiteSpace]),

        city: new FormControl("", [
          Validators.required,
          AppValidators.min2Length,
          AppValidators.notOnlyWhiteSpace]),

        country: new FormControl("", [
          Validators.required,
          AppValidators.min2Length,
          AppValidators.notOnlyWhiteSpace]),
          
      }),

      billingAddress: this.formBuilder.group({
        street: new FormControl("", [
          Validators.required,
          AppValidators.min2Length,
          AppValidators.notOnlyWhiteSpace]),

        city:new FormControl("", [
          Validators.required,
          AppValidators.min2Length,
          AppValidators.notOnlyWhiteSpace]),

        country: new FormControl("", [
          Validators.required,
          AppValidators.min2Length]),
      }),
    });

    this.shopFormService.getCreditCardMonths(new Date().getMonth() + 1).subscribe(
      data => { this.cardMonths = data; }
    );

    this.shopFormService.getCreditCardYears().subscribe(
      data => { this.cardYears = data; }
    );
  }

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );

    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
      }
    );
  }


  get shippingAddressStreet() { return this.checkoutFormGroup.get("shippingAddress.street")!; }
  get shippingAddressCity() { return this.checkoutFormGroup.get("shippingAddress.city")!; }
  get shippingAddressCountry() { return this.checkoutFormGroup.get("shippingAddress.country")!; }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get("shippingAddress.zipCode")!; }

  get billingAddressStreet() { return this.checkoutFormGroup.get("billingAddress.street")!; }
  get billingAddressCity() { return this.checkoutFormGroup.get("billingAddress.city")!; }
  get billingAddressCountry() { return this.checkoutFormGroup.get("billingAddress.country")!; }
  get billingAddressZipCode() { return this.checkoutFormGroup.get("billingAddress.zipCode")!; }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYears() {
    const cardFormGroup = this.checkoutFormGroup.get('cardDetails');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(cardFormGroup!.value["expirationYear"])
    let startMonth: number = 1;
    if (selectedYear === currentYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.cardMonths = data;
      }
    )
  }

  onSubmit() {
    console.log("Handling the submit button");
    //remove false
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }else{
      console.log(this.checkoutFormGroup.get("customer")?.value);
      let order = new Order(
        0, 
        this.user?.username ?? "username",
        this.shippingAddressCity.value + ", " +
          this.shippingAddressStreet.value + ", ",
        new Date(),
        this.totalPrice,
        this.cartService.cartItems.map( cartItem => {
          return new OrderItem(cartItem.product, cartItem.quantity);
        })
      );
      this.ordersService.placeOrder(order).subscribe(
        data=>{
          console.log(`${data}`);
          if(data.get("code") == 200){
            this.router.navigate(["home"]);
          }
        }
      );
    }
  }
}
