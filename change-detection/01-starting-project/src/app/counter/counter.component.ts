import { Component, inject, NgZone, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
})
export class CounterComponent implements OnInit {
  count = signal(0);
  private zone = inject(NgZone);
  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.count.set(0);
    }, 4000);

    //This is a task which don't have any impact on the template, so here we don't need any change detection
    //That's the reason we are using zone js and running this outside of the zone js
    //After logging this console change detection will not run
    //This is call avoiding zone polution
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('Timer expired!');
      }, 6000);
    });
  }
  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
