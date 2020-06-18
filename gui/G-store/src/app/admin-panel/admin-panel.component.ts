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

  constructor(private fb: FormBuilder, private itemService: ItemService, private user: UserService, private router: Router) {
    this.angForm = this.fb.group({
      name: ['', [Validators.required , Validators.minLength(1)]],
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
    console.log('XD');
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


}
