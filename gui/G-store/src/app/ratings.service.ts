import { Injectable } from '@angular/core';
import {RatingsReceived} from './ratingsReceived';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Item} from './item';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  baseUrl = 'http://localhost/angular';
  rating: RatingsReceived[];
  odpowiedz: string;

  constructor(private http: HttpClient) { }

  getRatings( PRZEDMIOT_ID ){
    return this.http.post(this.baseUrl + '/readComment.php', { PRZEDMIOT_ID })
      .pipe(map((res) => {
          this.rating = res['data'];
          return this.rating;
        }),
        catchError(this.handleError));
  }

  addRatings( ocena, wiadomosc, uzytkownik_id, przedmiot_id ){
    return this.http.post(this.baseUrl + '/addComment.php', { ocena, wiadomosc, uzytkownik_id, przedmiot_id })
      .pipe(map((res) => {
          this.odpowiedz = res['data'];
          return this.odpowiedz;
        }),
        catchError(this.handleError));
  }




  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // console.log('XD');

    // return an observable with a user friendly message
    return throwError('Error! Cos poszlo nie tak w dziale komentarzy');
  }
}
