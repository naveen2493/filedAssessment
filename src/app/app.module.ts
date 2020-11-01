import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditCardInfoComponent } from './components/credit-card-info/credit-card-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

var firebaseConfig = {
  apiKey: "AIzaSyAl-XbCkckbSkGEttzBSnvBZS_i7r5ZqDQ",
  authDomain: "filedtask.firebaseapp.com",
  databaseURL: "https://filedtask.firebaseio.com",
  projectId: "filedtask",
  storageBucket: "filedtask.appspot.com",
  messagingSenderId: "1051478308639",
  appId: "1:1051478308639:web:42e934329f437edd7ee22a",
  measurementId: "G-W3HJ6W0QJM"
};

@NgModule({
  declarations: [
    AppComponent,
    CreditCardInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
