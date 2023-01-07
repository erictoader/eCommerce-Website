import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
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

  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormService,
    private cartService: CartService,
    private ordersService: OrdersService,
    ) {
  }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({

        firstName: new FormControl("", [
          Validators.required,
          AppValidators.min2Length,
          AppValidators.notOnlyWhiteSpace]),

        lastName: new FormControl("", [
          Validators.required,
          AppValidators.min2Length,
          AppValidators.notOnlyWhiteSpace]),

        email: new FormControl("", [
          Validators.required,
          Validators.email]),
      }),

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
          
        zipCode: new FormControl("", [
          Validators.required,
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

        zipCode: new FormControl("", [
          Validators.required,
          AppValidators.notOnlyWhiteSpace]),
      }),

      cardDetails: this.formBuilder.group({
        cardType: new FormControl("", [
          Validators.required,]),
        nameOnCard: new FormControl("", [
          Validators.required,
          AppValidators.min2Length,
          AppValidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl("", [
          Validators.required, 
          Validators.pattern("[0-9]{16}")]),
        securityCode: new FormControl("", [
          Validators.required,
          Validators.pattern("[0-9]{3}")]),
        expirationYear: new FormControl("", [
          Validators.required,]),
        expirationMonth: new FormControl("", [
          Validators.required,]),
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

  get firstName() { return this.checkoutFormGroup.get("customer.firstName")!; }
  get lastName() { return this.checkoutFormGroup.get("customer.lastName")!; }
  get email() { return this.checkoutFormGroup.get("customer.email")!; }

  get shippingAddressStreet() { return this.checkoutFormGroup.get("shippingAddress.street")!; }
  get shippingAddressCity() { return this.checkoutFormGroup.get("shippingAddress.city")!; }
  get shippingAddressCountry() { return this.checkoutFormGroup.get("shippingAddress.country")!; }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get("shippingAddress.zipCode")!; }

  get billingAddressStreet() { return this.checkoutFormGroup.get("billingAddress.street")!; }
  get billingAddressCity() { return this.checkoutFormGroup.get("billingAddress.city")!; }
  get billingAddressCountry() { return this.checkoutFormGroup.get("billingAddress.country")!; }
  get billingAddressZipCode() { return this.checkoutFormGroup.get("billingAddress.zipCode")!; }

  get cardType() { return this.checkoutFormGroup.get("cardDetails.cardType")!; }
  get nameOnCard() { return this.checkoutFormGroup.get("cardDetails.nameOnCard")!; }
  get cardNumber() { return this.checkoutFormGroup.get("cardDetails.cardNumber")!; }
  get securityCode() { return this.checkoutFormGroup.get("cardDetails.securityCode")!; }
  get expirationYear() { return this.checkoutFormGroup.get("cardDetails.expirationYear")!; }
  get expirationMonth() { return this.checkoutFormGroup.get("cardDetails.expirationMonth")!; }

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

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }else{
      console.log(this.checkoutFormGroup.get("customer")?.value);

    }
  }

  //bogdan TODOs:
  //Sections:
  //  24->save the order to DB
}
