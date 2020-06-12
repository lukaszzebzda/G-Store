import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {User} from '../user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{

  message: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private user: UserService, private router: Router) {}

  ngOnInit() {
    this.user.currentMessage.subscribe(message => this.message = message);
  }

  getMessage(){
    if (this.message){
      return this.message.USR_NAME;
    }
    else {
      return '';
    }
  }

  logOut(){
    this.user.changeMessage(null);
    this.router.navigate(['']);
  }

  // Pozwala wymusić przeładowanie sklepu, jesli w nim sie znajdujemy
  redirectTo(uri: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }

  toShop(){
    if (this.router.url === '/store'){
      this.redirectTo('store');
    }
    else{
      this.router.navigate(['store']);
    }
  }

  toLibrary() {
    if (this.router.url === '/library'){
      this.redirectTo('library');
    }
    else{
      this.router.navigate(['library']);
    }
  }
}
