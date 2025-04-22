import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  effect,
  signal
} from '@angular/core';

@Directive({
  selector: '[busyButton]',
  standalone: true
})
export class BusyButtonDirective implements OnInit {
  protected readonly loadingState = signal(false);
  private readonly buttonText = signal('');
  private readonly buttonWidth = signal('');

  @Input() set isLoading(value: boolean) {
    this.loadingState.set(value);
  }

  constructor(private el: ElementRef<HTMLButtonElement>) {
    effect(() => {
      const button = this.el.nativeElement;
      const loading = this.loadingState();

      if (this.buttonText() || loading) {
        button.disabled = loading;

        if (loading) {
          if (!this.buttonWidth()) {
            this.buttonWidth.set(window.getComputedStyle(button).width);
          }

          button.style.minWidth = this.buttonWidth();
          button.style.display = 'inline-flex';
          button.style.alignItems = 'center';
          button.style.justifyContent = 'center';

          button.innerHTML = `
            <svg class="spinner-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
            </svg>
          `;
        } else {
          button.style.minWidth = '';
          button.style.display = '';
          button.style.alignItems = '';
          button.style.justifyContent = '';
          button.textContent = this.buttonText();
        }
      }
    });
  }

  ngOnInit() {
    const button = this.el.nativeElement;
    this.buttonText.set(button.textContent?.trim() || '');
    this.buttonWidth.set(window.getComputedStyle(button).width);
  }
}
