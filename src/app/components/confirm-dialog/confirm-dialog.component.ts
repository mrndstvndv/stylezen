import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, IonIcon],
  template: `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-[--background] rounded-2xl p-6 w-[90%] max-w-md">
        <h2 class="text-xl font-bold text-[--foreground] mb-4">{{title}}</h2>
        <p class="text-[--muted-foreground] mb-6">{{message}}</p>
        
        <div class="flex gap-4">
          <button (click)="onCancel()" 
            class="flex-1 py-2 rounded-xl border border-[--border] text-[--foreground] hover:bg-[--border]">
            Cancel
          </button>
          <button (click)="onConfirm()" 
            class="flex-1 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600">
            Confirm
          </button>
        </div>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() onConfirm: () => void = () => {};
  @Input() onCancel: () => void = () => {};
} 