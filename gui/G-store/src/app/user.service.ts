import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost/angular';
  redirectUrl: string;
  uzytkownicy: User[];

  private messageSource = new BehaviorSubject<User>(null);
  currentMessage = this.messageSource.asObservable();

  constructor( private http: HttpClient ) { }

  public userlogin(email, password) {
    return this.http.post<any>(this.baseUrl + '/login.php', { email, password })
      .pipe(
        map((res) => {
          this.uzytkownicy = res['data'];
          this.changeMessage(this.uzytkownicy[0]);
          console.log(this.uzytkownicy[0]);
          return User;
      }));
  }
  public userregistration(name, email, tel, pwd) {

    return this.http.post<any>(this.baseUrl + '/registration.php', { name, email, tel, pwd })
      .pipe(map(User => {
        return User;
      }));
  }

  changeMessage(message: User){
    this.messageSource.next(message);
  }
}
