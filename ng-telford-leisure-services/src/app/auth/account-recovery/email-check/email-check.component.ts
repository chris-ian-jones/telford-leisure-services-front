import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface EmailCheckForm {
  emailCheck: FormControl<string | null>;
}

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrl: './email-check.component.scss',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule]
})
export class EmailCheckComponent implements OnInit {
  @ViewChild('yesInput', { static: false }) yesInput: ElementRef;
  @ViewChild('noInput', { static: false }) noInput: ElementRef;
  @Output() changeComponentEvent = new EventEmitter<any>();
  emailCheckForm!: FormGroup<EmailCheckForm>;
  @ViewChild('errorSummaryDiv', { static: false }) errorSummaryDiv!: ElementRef;
  errorSummary: any = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initEmailCheckForm();
  }

  initEmailCheckForm() {
    this.emailCheckForm = this.formBuilder.group<EmailCheckForm>({
      emailCheck: new FormControl('', {
        nonNullable: false,
        validators: [Validators.required]
      })
    });
  }

  selectInput(value: string) {
    this.emailCheckForm.controls['emailCheck'].setValue(value);
    this.errorSummary.length = 0;

    switch (value) {
      case 'Yes': {
        setTimeout(() => this.yesInput.nativeElement.focus());
        break;
      }
      case 'No': {
        setTimeout(() => this.noInput.nativeElement.focus());
        break;
      }
      default: {
        setTimeout(() => this.yesInput.nativeElement.focus());
        break;
      }
    }
  }

  onClickContinue() {
    this.errorSummary.length = 0;
    if (this.emailCheckForm.valid) {
      if (this.emailCheckForm.controls['emailCheck'].value === 'Yes') {
        this.router.navigateByUrl('/sign-in');
      } else {
        this.changeComponentEvent.emit('email-confirm');
      }
    } else {
      this.getAllFormValidationErrors();
    }
  }

  getAllFormValidationErrors() {
    Object.keys(this.emailCheckForm.controls).forEach((control) => {
      const controlErrors: ValidationErrors =
        this.emailCheckForm.get(control).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((error) => {
          this.errorSummary.push({
            control,
            error
          });
        });
        setTimeout(() => this.errorSummaryDiv.nativeElement.focus());
      }
    });
  }

  onClickEmailCheckError() {
    setTimeout(() => this.yesInput.nativeElement.focus());
  }
}
