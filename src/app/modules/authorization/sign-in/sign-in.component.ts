import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  constructor(private auth: AuthorizationService) {}

  ngOnInit() {}

  public onSubmit(): void {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.auth.loginUser(email, password).subscribe((res) => {
      // console.log(res);
    });
  }

  public getErrorMessage(): string {
    return this.form.get('email').hasError('required')
      ? 'You must enter a value'
      : this.form.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
