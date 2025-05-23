import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';

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
  error = signal('');
  httpClient = inject(HttpClient);
  private placeService = inject(PlacesService);
  private desRef = inject(DestroyRef);
  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placeService.loadAvailablePlaces().subscribe({
      next: (restData) => {
        this.places.set(restData);
        console.log(restData);
      },
      error: (error) => {
        // console.log('Error: ', error);
        // this.error.set('We have some internal issue');
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.desRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placeService
      .addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (restData) => console.log(restData),
      });

    this.desRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
