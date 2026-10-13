import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';

/** Keep keyboard navigation and scrolling inside an open modal. */
@Directive({ selector: '[appDialog]', standalone: true })
export class DialogAccessibility implements OnInit, OnDestroy {
  private previousFocus = document.activeElement as HTMLElement | null;
  private previousOverflow = document.body.style.overflow;
  private timer: ReturnType<typeof setTimeout>;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngOnInit() {
    document.body.style.overflow = 'hidden';
    this.timer = setTimeout(() => {
      const root = this.element.nativeElement;
      (root.querySelector<HTMLElement>('textarea') || this.focusable()[0])?.focus();
    });
  }

  @HostListener('keydown', ['$event'])
  trapFocus(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;
    const elements = this.focusable();
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  private focusable() {
    return Array.from(
      this.element.nativeElement.querySelectorAll<HTMLElement>(
        'button:not(:disabled), textarea, input, select, a[href], [tabindex="0"]',
      ),
    );
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    document.body.style.overflow = this.previousOverflow;
    this.previousFocus?.focus();
  }
}
