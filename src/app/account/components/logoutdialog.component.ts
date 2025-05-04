import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-dialog',
  imports: [CommonModule],
  template: `
    <div class="backdrop" (click)="onClose()">
      <div class="dialog" @fadeZoom (click)="$event.stopPropagation()">
        <h2>Confirm</h2>
        <p>Are you sure you want to continue?</p>
        <div class="actions">
          <button (click)="confirm(true)">Yes</button>
          <button (click)="confirm(false)">No</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .backdrop {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dialog {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      min-width: 300px;
      max-width: 90vw;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    button {
      background: #1976d2;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #1565c0;
    }
  `],
  animations: [
    trigger('fadeZoom', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' })),
      ]),
    ])
  ]
})
export class DialogComponent {
  @Output() closed = new EventEmitter<boolean>();

  confirm(result: boolean) {
    this.closed.emit(result);
  }

  onClose() {
    this.closed.emit(false);
  }
}

