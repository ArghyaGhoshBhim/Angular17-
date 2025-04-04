import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class NewTicketComponent {
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  onSubmit(titleEle: string, textEle: string): void {
    console.log('SUBMITTED!');
    console.dir('SUBMITTED TITLE: ' + titleEle);
    console.dir('SUBMITTED TEXT: ' + textEle);
    this.form?.nativeElement.reset();
  }
}
