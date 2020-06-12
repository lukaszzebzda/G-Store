import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService} from '../user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import validate = WebAssembly.validate;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],

    });
  }

  ngOnInit() {
  }
  postdata(angForm1)
  {
    this.userService.userregistration(angForm1.value.name, angForm1.value.email, angForm1.value.mobile, angForm1.value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log('oops', error);
        });
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }

}
