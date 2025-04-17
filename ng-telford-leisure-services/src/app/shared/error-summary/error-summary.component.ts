import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { ErrorSummaryItem } from './../../core/constants/form-errors';

@Component({
  selector: 'app-error-summary',
  templateUrl: './error-summary.component.html',
  styleUrl: './error-summary.component.scss',
  imports: [CommonModule]
})
export class ErrorSummaryComponent {
  @Input() errors: ErrorSummaryItem[] = [];
  @Input() tabIndex: number = 1;
  @Output() focusField = new EventEmitter<string>();
  @ViewChild('errorSummary') errorSummaryDiv!: ElementRef;

  onErrorClick(fieldId: string): void {
    this.focusField.emit(fieldId);
  }

  public focusErrorSummary(): void {
    if (this.errorSummaryDiv) {
      this.errorSummaryDiv.nativeElement.focus();
    }
  }
}
