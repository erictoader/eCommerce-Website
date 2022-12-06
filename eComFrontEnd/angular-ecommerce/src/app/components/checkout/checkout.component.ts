import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup = new FormGroup({});

  cardMonths: number[] = [];
  cardYears: number[] = [];

  constructor(private formBuilder: FormBuilder,
    private shopFormService: ShopFormService) {
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [""],
        lastName: [""],
        email: [""],
      }),
      shippingAddress: this.formBuilder.group({
        street: [""],
        city: [""],
        country: [""],
        zipCode: [""],
      }),
      billingAddress: this.formBuilder.group({
        street: [""],
        city: [""],
        country: [""],
        zipCode: [""],
      }),
      cardDetails: this.formBuilder.group({
        cardType: [""],
        nameOnCard: [""],
        cardNumber: [""],
        securityCode: [""],
        expirationYear: [""],
        expirationMonth: [""],
      }),
    });

    this.shopFormService.getCreditCardMonths(new Date().getMonth() + 1).subscribe(
      data => { this.cardMonths = data; }
    );

    this.shopFormService.getCreditCardYears().subscribe(
      data => { this.cardYears = data; }
    );
  }

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
    console.log(this.checkoutFormGroup.get("customer")?.value);
  }

  //bogdan TODOs:
  //Sections:
  //  20->dropdowns
  //  21->validation
  //  22->review cart totals
  //  24->save the order to DB
}
