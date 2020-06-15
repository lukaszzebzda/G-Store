import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import {ItemService} from '../item.service';
import {Router} from '@angular/router';
import {TransactionService} from '../transaction.service';
import {User} from '../user';
import {BreakpointObserver} from '@angular/cdk/layout';
import {UserService} from '../user.service';
import {first} from 'rxjs/operators';
import {RatingsService} from '../ratings.service';
import {RatingsReceived} from '../ratingsReceived';



@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  items: Item[];
  ratings: RatingsReceived[];
  error = '';
  success = '';
  defaultImgPath = 'assets/img/';
  selectedItem: Item;
  message: User;
  checked = false;
  currentRate = 8;
  // private list: Element;
  private that: this;
  private messageSuccess: boolean;


  constructor(private itemService: ItemService, private user: UserService, private ratingsService: RatingsService, private transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {
    this.getItems();
    this.user.currentMessage.subscribe(message => this.message = message);
    this.selectedItem = null;
  }

  getItems(): void {
    this.itemService.getItems().subscribe(
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
    // console.log('Kupiono gre o id: ' + id);
    // this.router.navigate(['']);
    this.selectedItem = item;
    // document.getElementsByTagName("mat-sidenav-content")[0].setAttribute("class", "tloSklepowe");
    // this.list.classList.add("tloSklepowe")
    this.getComments();
  }

  buyItem(): void{
    // document.getElementsByTagName('buy')[0].setAttribute('[disabled]', 'true');
    if (this.message){
      console.log('Kupuje item: ' + this.selectedItem.PRZE_NAZWA + ' Przez: ' + this.message.USR_NAME);
      this.transactionService.makeTransaction(this.selectedItem.PRZE_CENA, this.selectedItem.PRZE_ID, this.message.USR_ID)
        .pipe(first())
        .subscribe(
          data => {
            alert('Gratulacje udany zakup');
            setTimeout(() => {
              this.router.navigate(['library']);
            }, 3000);
          },
          error => {
            // console.log('oops', error);
            this.router.navigate(['home']);
          });
    }
    else{
      alert('Aby zakupić przedmiot musisz być zalogowany!');
      this.router.navigate(['login']);
    }
  }

  getComments(): void{
    this.ratingsService.getRatings(this.selectedItem.PRZE_ID).subscribe(
      (res: RatingsReceived[]) => {
        this.ratings = res;
        console.log(this.ratings);
      },
      (err) => {
        console.log('Nie udało się załadować komentarzy');
        this.error = err;
      }
    );
  }

}
