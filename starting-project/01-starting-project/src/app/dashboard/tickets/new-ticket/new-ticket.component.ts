import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;

  //private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  addTicket = output<{ title: string; text: string }>();

  //Confirm view child loaded
  ngAfterViewInit(): void {
    console.log('After View INIT', this.form?.nativeElement);
  }

  // If we use viewChild function we will get the access of this.form().nativeElement in the OnInit as well.
  ngOnInit(): void {
    console.log('After ON INIT', this.form?.nativeElement);
  }
  onSubmit(titleEle: string, textEle: string): void {
    console.log('SUBMITTED!');
    console.dir('SUBMITTED TITLE: ' + titleEle);
    console.dir('SUBMITTED TEXT: ' + textEle);
    this.addTicket.emit({ title: textEle, text: textEle });
    this.form?.nativeElement.reset();
    // this.form()?.nativeElement.reset();
  }
}
