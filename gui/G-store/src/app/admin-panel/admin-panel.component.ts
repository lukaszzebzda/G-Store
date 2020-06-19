import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import {ItemService} from '../item.service';
import {UserService} from '../user.service';
import {RatingsService} from '../ratings.service';
import {Router} from '@angular/router';
import {User} from '../user';
import {Category} from '../category';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  name: string;
  email: string;
  message: string;
  items: Item[];
  categories: Category[];
  private showCateory: boolean;
  actualUser: User;
  itemek: Item[];
  defaultImgPath = 'assets/img/';
  itemForm = false;
  angForm: FormGroup;
  newItemForm: FormGroup;

  constructor(private fb: FormBuilder, private itemService: ItemService, private user: UserService, private router: Router) {
    this.angForm = this.fb.group({
      name: ['', [Validators.required , Validators.minLength(1)]],
    });

    this.newItemForm = this.fb.group({
      itemName: ['', [Validators.required , Validators.minLength(1)]],
      itemDescription: ['', [Validators.required , Validators.minLength(5)]],
      itemCategory: ['', [Validators.required]],
      itemCena: ['', [Validators.required, Validators.min(0)]],
      itemImage: ['', [Validators.required]],
      itemRating: ['', [Validators.required, Validators.max(10), Validators.min(0)]]
    });

  }

  ngOnInit(): void {
    this.user.currentMessage.subscribe(message => this.actualUser = message);
    if (!this.actualUser){
      this.router.navigate(['']);
    }
    this.getAdminItems();
    this.getCategories();
  }


  showitemList(){
    this.itemForm = true;
  }


  getAdminItems(): void {
    this.itemService.getItems().subscribe(
      (res: Item[]) => {
        this.items = res;
        console.log(this.items);
      },
      (err) => {
        console.log('Nie udało się załadować przedmiotów');
      }
    );
  }

  getCategories(): void {
    this.itemService.getCategories().subscribe(
      (res: Category[]) => {
        this.categories = res;
        console.log(this.categories);
      },
      (err) => {
        console.log('Nie udało się załadować przedmiotów');
      }
    );
  }

  addCategory(angForm1){
    this.itemService.addCategory(angForm1.value.name)
      .pipe(first())
      .subscribe(
        data => {
          this.getCategories();
        },
        error => {
          console.log('oops', error);
        });
  }

  processForm() {
    const allInfo = `My name is ${this.name}. My email is ${this.email}. My message is ${this.message}`;
    alert(allInfo);
  }

  addItem(newItemForm1){
    // console.log('Dodajemy:\n' + newItemForm1.value.itemName + '\n' + newItemForm1.value.itemDescription
    //     + '\n' + newItemForm1.value.itemCategory + '\n' + newItemForm1.value.itemCena
    //     + '\n' + newItemForm1.value.itemImage + '\n' + newItemForm1.value.itemRating );

    this.itemService.addItem(newItemForm1.value.itemName, newItemForm1.value.itemDescription, newItemForm1.value.itemCena, newItemForm1.value.itemImage, newItemForm1.value.itemCategory, newItemForm1.value.itemRating )
        .pipe(first())
        .subscribe(
            data => {
              console.log('Dodano przemdiot');
              this.getAdminItems();
            },
            error => {
              console.log('oops', error);
            });
  }

}
