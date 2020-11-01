import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card';

// Custom Validators to Validate given Expire Date is Not Past Date
export class ExpireDateValidator {
  static cannotPastExpire(control: AbstractControl): ValidationErrors | null {
    if (control.value <= new Date()) {
      return { cannotPastExpire: true };
    }
    return null;
  }
}

// Custom Validators to Validate given Amount is Not Zero
export class NoZeroValidator {
  static noZero(control: AbstractControl): ValidationErrors | null {
    if (control.value <= 0) {
      return { noZero: true };
    }
    return null;
  }
}

@Component({
  selector: 'app-credit-card-info',
  templateUrl: './credit-card-info.component.html',
  styleUrls: ['./credit-card-info.component.scss']
})
export class CreditCardInfoComponent implements OnInit {

  creditCardForm: FormGroup;
  creditCardNumber: FormControl;
  cardholder: FormControl;
  expirationDate: FormControl;
  securityCode: FormControl;
  amount: FormControl;

  constructor(
    public router: Router,
    public paymentServiceService: PaymentServiceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.validateInputs();
    this.createFormGroup();
  }

  validateInputs() {
    this.creditCardNumber = new FormControl("", [
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(16),
      Validators.maxLength(16),
    ]);
    this.cardholder = new FormControl("", [Validators.required]);
    this.expirationDate = new FormControl("", [Validators.required, ExpireDateValidator.cannotPastExpire]);
    this.securityCode = new FormControl("", [Validators.minLength(3), Validators.maxLength(3)]);
    this.amount = new FormControl("", [Validators.required, NoZeroValidator.noZero]);
  }

  // Created the ReactiveFormModule
  createFormGroup() {
    this.creditCardForm = new FormGroup({
      creditCardNumber: this.creditCardNumber,
      cardholder: this.cardholder,
      expirationDate: this.expirationDate,
      securityCode: this.securityCode,
      amount: this.amount
    });
  }

  // Go back to AppComponent
  goToBack() {
    this.router.navigate([''])
  }

  // Prepare the JSON params and Sent to PaymentServiceService Post request
  submitPayment() {
    let params = {};

    params["creditCardNumber"] = this.creditCardNumber.value;
    params["cardholder"] = this.cardholder.value;
    params["expirationDate"] = this.expirationDate.value;
    params["securityCode"] = this.securityCode.value;
    params["amount"] = this.amount.value;

    this.paymentServiceService.post(params).then(
      data => {
        this.goToBack();
        const dialogRef = this.dialog.open(DialogBoxComponent, {
          width: '250px',
          data: { dialogType: 'Success', text: "Credit Card details are submitted successfully" }
        });
      }).catch(
        err => {
          const dialogRef = this.dialog.open(DialogBoxComponent, {
            width: '250px',
            data: { dialogType: 'Failed', text: "Credit Card details are not submitted" }
          });
        }
      );
  }

  // Get a confirmation from user to submit
  goToCreditCard() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { dialogType: 'Confirm', text: "Are you confirm to give submit?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User gave Ok to post the Payment request
        this.submitPayment();
      }
    });


  }

}
