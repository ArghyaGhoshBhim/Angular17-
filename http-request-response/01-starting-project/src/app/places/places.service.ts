import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlace(
      'http://localhost:3000/places',
      'We have some internal issue'
    );
  }

  loadUserPlaces() {
    return this.fetchPlace(
      'http://localhost:3000/user-places',
      'We have some internal issue to load your favourite'
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevValue = this.userPlaces();
    if (!this.userPlaces().some((p) => p.id === place.id)) {
      this.userPlaces.update((prev) => [...prev, place]);
    }
    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.userPlaces.set(prevValue);
            this.errorService.showError(
              "Can't update favourite due to some internal error!!"
            );
            return new Error(
              "Can't update favourite due to some internal error!!"
            );
          });
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevValue = this.userPlaces();
    if (this.userPlaces().some((p) => p.id === place.id)) {
      const newFavourites = prevValue.filter((p) => p.id != place.id);
      this.userPlaces.set(newFavourites);
    }
    return this.httpClient
      .delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        catchError((err) => {
          return throwError(() => {
            this.userPlaces.set(prevValue);
            this.errorService.showError(
              "Can't be delete due to some internal error!!"
            );
            return new Error("Can't be delete due to some internal error!!");
          });
        })
      );
  }

  private fetchPlace(url: string, error: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((restData) => restData.places),
      catchError((err) => {
        console.log('Error', err);
        this.errorService.showError(err);
        return throwError(() => new Error(error));
      })
    );
  }
}
