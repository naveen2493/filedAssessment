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

export class ExpireDateValidator {
  static cannotPastExpire(control: AbstractControl): ValidationErrors | null {
    if (control.value <= new Date()) {
      return { cannotPastExpire: true };
    }

    return null;
  }
}

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

  constructor(public paymentServiceService: PaymentServiceService, public dialog: MatDialog) { }

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

  createFormGroup() {
    this.creditCardForm = new FormGroup({
      creditCardNumber: this.creditCardNumber,
      cardholder: this.cardholder,
      expirationDate: this.expirationDate,
      securityCode: this.securityCode,
      amount: this.amount
    });
  }

  submitPayment() {
    let param = {};
    param["creditCardNumber"] = this.creditCardNumber.value;
    param["cardholder"] = this.cardholder.value;
    param["expirationDate"] = this.expirationDate.value;
    param["securityCode"] = this.securityCode.value;
    param["amount"] = this.amount.value;

    this.paymentServiceService.post(param).then(
      data => {
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

  goToCreditCard() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { dialogType: 'Confirm', text: "Are you confirm to give submit?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitPayment();
      }
    });


  }

}
