import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit{

  places = signal<Place[] | undefined>(undefined);
    isFetching = signal(false);
    error = signal('');
    httpClient = inject(HttpClient);
    private desRef = inject(DestroyRef);
    ngOnInit(): void {
      this.isFetching.set(true);
      const subscription = this.httpClient
        .get<{ places: Place[] }>('http://localhost:3000/user-places')
        .pipe(
          map((restData) => restData.places),
          catchError((err) => {
            console.log('Error', err);
            return throwError(() => new Error('We have some internal issue to load your favourite'));
          })
        )
        .subscribe({
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
}
