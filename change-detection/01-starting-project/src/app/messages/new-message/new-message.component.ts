import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
  //If we make this onpush and type some thing then count component changedetection will run if we don't make change detection strategy onpush on counter component
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMessageComponent {
  private messagesService = inject(MessagesService);
  enteredText=signal("");

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    this.messagesService.addMessage(this.enteredText())
    this.enteredText.set("");
  }
}
