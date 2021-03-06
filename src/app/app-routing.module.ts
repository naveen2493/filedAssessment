import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreditCardInfoComponent } from './components/credit-card-info/credit-card-info.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'credit-card', component: CreditCardInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
