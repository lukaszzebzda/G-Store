import { Component, OnInit } from '@angular/core';

import { Item} from './item';
import { ItemService} from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'G store';
  items: Item[];
  error = '';
  success = '';

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe(
      (res: Item[]) => {
        this.items = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
}

