import { Directive } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  constructor() {
    console.log('SafeDirective is active NOW!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeavePage = window.confirm('Do you want to leave this page!');
    if (wantsToLeavePage) {
      return;
    }
    event.preventDefault();
  }
}
