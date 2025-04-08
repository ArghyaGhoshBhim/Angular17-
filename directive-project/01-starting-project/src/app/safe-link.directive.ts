import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  queryParam = input('myapp');
  hostElement = inject(ElementRef<HTMLAnchorElement>);
  constructor() {
    console.log('SafeDirective is active NOW!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeavePage = window.confirm('Do you want to leave this page!');
    const url = this.hostElement.nativeElement.href;
    this.hostElement.nativeElement.href = url + '?from=' + this.queryParam();
    if (wantsToLeavePage) {
      return;
    }
    event.preventDefault();
  }
}
