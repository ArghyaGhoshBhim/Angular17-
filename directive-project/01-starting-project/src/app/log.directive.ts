import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()',
  },
})
export class LogDirective {
  hostEle = inject(ElementRef);
  onLog() {
    console.log(this.hostEle.nativeElement);
  }
}
