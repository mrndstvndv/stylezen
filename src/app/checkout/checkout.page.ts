import { Component, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { chevronBackOutline, locationOutline } from "ionicons/icons";

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.page.html',
  standalone: true,
  imports: [IonIcon],
  styles: [`
    .payment-option {
      transition: all 0.2s ease;
    }
    .payment-option:hover {
      transform: translateY(-2px);
    }
  `]
})
export class CheckoutPage {
    amount = signal(0);

  constructor(
    private route: ActivatedRoute,
  ) {
    addIcons({
      chevronBackOutline,
      locationOutline
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.amount.set(Number(params['amount']));
    });
  }

  navigateBack() {
    window.history.back()
  }

  selectedPayment: string = 'mastercard';
  
  selectPayment(method: string): void {
    this.selectedPayment = method;
  }
}
