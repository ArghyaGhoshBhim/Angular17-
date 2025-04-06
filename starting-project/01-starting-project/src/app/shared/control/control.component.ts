import {
  Component,
  ContentChild,
  contentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  //Angular prefer this
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent {
  // @HostBinding("class") className="control";
  // @HostListener('click') onClick1() {
  //   console.log('Clicked!1');
  // }

  label = input.required();

  //We will get access of host element in this component and we can change the any property for the host.(this is not recomendable)
  private el = inject(ElementRef);

  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;

  //we can use fuctions instead of @ContentChild
  control=contentChild.required<ElementRef<HTMLInputElement|HTMLTextAreaElement>>('input');

  onClick() {
    console.log('Clicked!');
    console.log(this.el);
    console.log(this.control());
  }
}
