import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(private auth: AuthorizationService, public router: Router) {}

  ngOnInit() {}

  public onSubmit(): void {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    const firstName = this.form.get('firstName').value;
    const lastName = this.form.get('lastName').value;

    this.auth.registerUser(firstName, lastName, email, password).subscribe();
  }

  public getErrorMessage(): string {
    return this.form.get('email').hasError('required')
      ? 'You must enter a value'
      : this.form.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
