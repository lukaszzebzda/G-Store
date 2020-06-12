import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User} from '../user';
import { UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.angForm = this.fb.group({

      email: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', Validators.required]

    });
  }

  ngOnInit(): void {
  }

  postdata(angForm1)
  {
    this.userService.userlogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
        data => {
          const redirect = this.userService.redirectUrl ? this.userService.redirectUrl : '/';
          this.router.navigate([redirect]);
        },
        error => {
          alert('User name or password is incorrect');
        });
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }

}
