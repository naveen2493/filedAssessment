import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from "@angular/fire/firestore"
// import { HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  endpoint = "";

  constructor(public httpClient: HttpClient, public afs: AngularFirestore) { }

  post(data){
    const creditCard = this.afs.doc<any>(
      "cards/"+data.creditCardNumber
    );
    return creditCard.set(data);
    // return creditCard.set(data);
    // return this.httpClient.post(this.endpoint, data);
  }
}
