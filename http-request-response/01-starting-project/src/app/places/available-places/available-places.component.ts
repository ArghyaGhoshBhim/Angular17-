import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  httpClient = inject(HttpClient);
  private desRef = inject(DestroyRef);
  ngOnInit(): void {
    const subscription = this.httpClient
      .get<{ palces: Place[] }>('http://localhost:3000/places')
      .subscribe({
        next: (restData) => {
          console.log(restData);
        },
      });

    this.desRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
