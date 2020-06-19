import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

import { Item } from './item';
import {Category} from './category';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl = 'http://localhost/angular';
  item: Item[];
  category: Category[];

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

  getCategories(): Observable<Category[]>{
    return this.http.get(this.baseUrl + '/categories.php').pipe(
      map((res) => {
        this.category = res['data'];
        return this.category;
      }),
      catchError(this.handleError));
  }

  public addCategory( nazwa ){
    return this.http.post<any>(this.baseUrl + '/addCategory.php', { nazwa })
      .pipe(map(Category => {
        return Category;
      }));
  }

  public addItem( nazwa, opis, cena, image, kategoria, ocena ){
    return this.http.post<any>(this.baseUrl + '/addItem.php', { nazwa, opis, cena, image, kategoria, ocena })
      .pipe(map(Item => {
        return Item;
      }));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // console.log('XD');

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
