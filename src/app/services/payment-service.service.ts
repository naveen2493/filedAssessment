import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from "@angular/fire/firestore";
import { CreditCard } from 'src/app/models/credit-card';


@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(public httpClient: HttpClient, public afs: AngularFirestore) { }

  post(data){
    // Post credit card details in Firebase Database
    const creditCard = this.afs.doc<any>(
      "cards/"+data.creditCardNumber
    );
    return creditCard.set(data);
  }
}
