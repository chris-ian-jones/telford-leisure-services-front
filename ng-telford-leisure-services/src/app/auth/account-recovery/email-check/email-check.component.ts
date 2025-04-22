import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ERROR_MESSAGES,
  ErrorSummaryItem
} from './../../../core/constants/form-errors';
import { ErrorSummaryComponent } from './../../../shared/components/error-summary/error-summary.component';

interface EmailCheckForm {
  emailCheck: FormControl<string | null>;
}

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrl: './email-check.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ErrorSummaryComponent
  ]
})
export class EmailCheckComponent implements OnInit {
  @ViewChild('yesInput', { static: false }) yesInput: ElementRef;
  @ViewChild('noInput', { static: false }) noInput: ElementRef;
  @ViewChild(ErrorSummaryComponent) errorSummary!: ErrorSummaryComponent;
  @Output() changeComponentEvent = new EventEmitter<any>();

  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  form = signal<FormGroup<EmailCheckForm>>(this.initForm());
  errors = signal<ErrorSummaryItem[]>([]);

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    return this.formBuilder.group<EmailCheckForm>({
      emailCheck: new FormControl('', {
        nonNullable: false,
        validators: [Validators.required]
      })
    });
  }

  selectInput(value: string) {
    this.form().controls['emailCheck'].setValue(value);
    this.errors.set([]);

    const elementMap: { [key: string]: ElementRef | undefined } = {
      'Yes': this.yesInput,
      'No': this.noInput
    };

    const element = elementMap[value] || this.yesInput;
    setTimeout(() => element?.nativeElement.focus());
  }

  onClickContinue() {
    this.errors.set([]);
    const form = this.form();

    if (form.valid) {
      if (form.controls['emailCheck'].value === 'Yes') {
        this.router.navigateByUrl('/sign-in');
      } else {
        this.changeComponentEvent.emit('email-confirm');
      }
    } else {
      this.handleFormValidationErrors();
    }
  }

  handleFormValidationErrors() {
    const newErrors: ErrorSummaryItem[] = [];
    const form = this.form();

    Object.keys(form.controls).forEach((control) => {
      const controlErrors = form.get(control)?.errors;
      if (!controlErrors) return;

      const controlErrorMessages = ERROR_MESSAGES[control];
      if (!controlErrorMessages) return;

      Object.keys(controlErrors).forEach((errorType) => {
        if (controlErrorMessages[errorType]) {
          newErrors.push(controlErrorMessages[errorType]);
        }
      });
    });

    this.errors.set(newErrors);
    setTimeout(() => this.errorSummary.focusErrorSummary());
  }

  focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    element?.focus();
  }
}
