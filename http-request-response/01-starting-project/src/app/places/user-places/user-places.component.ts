import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal(false);
  error = signal('');
  private placeService = inject(PlacesService);

  httpClient = inject(HttpClient);
  private desRef = inject(DestroyRef);
  places = this.placeService.loadedUserPlaces;
  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placeService.loadUserPlaces().subscribe({
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

  onRemove(selectedPlace: Place) {
    const subscription = this.placeService
      .removeUserPlace(selectedPlace)
      .subscribe({
        next: (restData) => console.log(restData),
      });

    this.desRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
