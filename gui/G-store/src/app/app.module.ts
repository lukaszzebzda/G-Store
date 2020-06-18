import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { StoreComponent } from './store/store.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { LibraryComponent } from './library/library.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    StoreComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    LibraryComponent,
    AdminPanelComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatGridListModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        NgbModule,
        MatTabsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
