import { Component } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { chevronBackOutline } from "ionicons/icons";

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  standalone: true,
  imports: [IonIcon]
})
export class NotificationsPage {
  constructor() {
    addIcons({
      chevronBackOutline
    })
  }

  navigateBack() {
    window.history.back()
  }
}
