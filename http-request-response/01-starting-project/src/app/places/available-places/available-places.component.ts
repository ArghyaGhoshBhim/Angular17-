import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  httpClient = inject(HttpClient);
  private desRef = inject(DestroyRef);
  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(map((restData) => restData.places))
      .subscribe({
        next: (restData) => {
          this.places.set(restData);
          console.log(restData);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

    this.desRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
