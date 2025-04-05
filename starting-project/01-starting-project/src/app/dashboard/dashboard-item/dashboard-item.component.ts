import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
  //Don't use hosh here because angular will try to find the call attibute in won component template if it's not  encapsulation:ViewEncapsulation.None
  //In this case we can use :host in css file
  // host: {
  //   class: 'dashboard-item',
  // },
})
export class DashboardItemComponent {
  // @Input({required:true}) image!:{ src: ""; alt: ""; } ;
  // @Input({required:true}) !title:string;

  image = input.required<{ src: string; alt: string }>();
  title = input.required<string>();
}
