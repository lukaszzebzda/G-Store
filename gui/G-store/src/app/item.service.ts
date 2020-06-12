import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl = 'http://localhost/angular';
  item: Item[];

  constructor(private http: HttpClient) { }




  getItems(): Observable<Item[]> {
    return this.http.get(this.baseUrl + '/items.php').pipe(
      map((res) => {
        this.item = res['data'];
        return this.item;
      }),
      catchError(this.handleError));
  }

  getLibItems(User_id){
    return this.http.post(this.baseUrl + '/biblioteka.php', { User_id })
      .pipe(map((res) => {
        this.item = res['data'];
        return this.item;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // console.log('XD');

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
