import {
  Component,
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

  //We will get access of host element in this component and we can change the any property for the host.(this is not recomendable)
  private el = inject(ElementRef);

  label = input.required();
  onClick() {
    console.log('Clicked!');
    console.log(this.el);
  }
}
