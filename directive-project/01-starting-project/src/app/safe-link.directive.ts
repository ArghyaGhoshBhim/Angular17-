import { Directive, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp');
  constructor() {
    console.log('SafeDirective is active NOW!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeavePage = window.confirm('Do you want to leave this page!');
    const url = (event.target as HTMLAnchorElement).href;
    (event.target as HTMLAnchorElement).href = url +"?from="+ this.queryParam();
    if (wantsToLeavePage) {
      return;
    }
    event.preventDefault();
  }
}
