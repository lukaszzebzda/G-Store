import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import {User} from '../user';
import {ItemService} from '../item.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {RatingsReceived} from '../ratingsReceived';
import {RatingsService} from '../ratings.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  items: Item[];
  ratings: RatingsReceived[];
  defaultImgPath = 'assets/img/';
  error = '';
  selectedItem: Item;
  message: User;
  myComment: RatingsReceived;
  currentRate: number;
  currentComment: string;
  amIEdditingMyComment = false;

  constructor(private itemService: ItemService, private user: UserService, private ratingsService: RatingsService, private router: Router) { }

  ngOnInit(): void {
    this.user.currentMessage.subscribe(message => this.message = message);
    if (!this.message){
      this.router.navigate(['']);
    }
    this.getLibItems();
    this.selectedItem = null;
    this.amIEdditingMyComment = false;
  }

  getLibItems(): void {
    this.itemService.getLibItems(this.message.USR_ID).subscribe(
      (res: Item[]) => {
        this.items = res;
        console.log(this.items);
      },
      (err) => {
        console.log('Nie udało się załadować przedmiotów');
        this.error = err;
      }
    );
  }

  checkItem(item: Item): void {
    // this.router.navigate(['']);
    this.selectedItem = item;
    this.getComments();
  }

  getComments(): void{
    this.ratingsService.getRatings(this.selectedItem.PRZE_ID).subscribe(
      (res: RatingsReceived[]) => {
        this.ratings = res;
        // this.ratings.forEach(function(value) {
        //   console.log(value.OCE_MESSAGE);
        // });
        this.myComment = null;
        for (let rate of this.ratings){
          if (rate.USR_ID === this.message.USR_ID){
            // console.log('Mamy go');
            this.myComment = rate;
          }
        }
        // console.log(this.ratings);
      },
      (err) => {
        console.log('Nie udało się załadować komentarzy');
        this.error = err;
      }
    );
  }

  addComment(): void{
    this.ratingsService.addRatings(this.currentRate, this.currentComment, this.message.USR_ID, this.selectedItem.PRZE_ID).subscribe(
      (res: string) => {
        // this.wiadomosc = res;
        // console.log(this.wiadomosc);
        this.toLibrary();
      },
      (err) => {
        console.log('Nie udało się dodac komentarza');
        this.error = err;
      }
    );
  }

  // showMyComment(): void{
  //   if (this.ratings){
  //     this.ratings.forEach((element, index, array) => {
  //       if (element.USR_ID === this.message.USR_ID){
  //       console.log(element.USR_NAME); // 100, 200, 300
  //       console.log(index); // 0, 1, 2
  //       console.log(array); // same myArray object 3 times
  //       }
  //     });
  //   }
  // }
  toLibrary() {
    if (this.router.url === '/library'){
      this.redirectTo('library');
    }
    else{
      this.router.navigate(['library']);
    }
  }
  // Pozwala wymusić przeładowanie sklepu, jesli w nim sie znajdujemy
  redirectTo(uri: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }


  showEditComment(){
    this.amIEdditingMyComment = true;
    this.currentRate = this.myComment.OCE_RATE;
  }

  updateComment(): void{
    this.ratingsService.updateRatings(this.currentRate, this.currentComment, this.message.USR_ID, this.selectedItem.PRZE_ID).subscribe(
      (res: string) => {
        // this.wiadomosc = res;
        // console.log(this.wiadomosc);
        this.toLibrary();
      },
      (err) => {
        console.log('Nie zaktualizować komentarza się dodac komentarza');
        this.error = err;
      }
    );
  }
}
