import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'filedAssessment';
  homePage: boolean = true;

  constructor(public router: Router) {}

  goToCreditCard() {
    this.homePage = false;
    // Angular router to navigate to the new page (CreditCardPage)
    this.router.navigate(['/credit-card'])
  }
}
