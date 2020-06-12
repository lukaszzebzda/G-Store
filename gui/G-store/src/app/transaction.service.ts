import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Transaction} from './transaction';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl = 'http://localhost/angular';
  redirectUrl: string;
  transactions: Transaction[];

  constructor(private http: HttpClient) { }

  public makeTransaction(cena, nr_przedmiotu, nr_uzytkownika) {
    return this.http.post<any>(this.baseUrl + '/transaction.php', { cena, nr_przedmiotu, nr_uzytkownika})
      .pipe(map((res) => {
        this.transactions = res['data'];
        console.log(this.transactions[0].USR_ID + this.transactions[0].TRA_DATETIME);
        return Transaction;
      }),
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // console.log(error);
    alert(error.error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}


