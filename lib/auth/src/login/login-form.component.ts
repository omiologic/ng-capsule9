import {
  Component,
  Input, OnInit, OnDestroy,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import {Subscription} from 'rxjs/Subscription';
import {Subscriber} from 'rxjs/Subscriber';

@Component({
  selector: 'cp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit, OnDestroy {
  // We are going to declare our variables here. We’ll have a loginForm that will represent our reactive form,
  // an authenticated boolean that will be true or false based on the users auth status and finally a profile
  // object that will hold the user data.
  location: Location;
  loginForm: FormGroup;
  @Input() public successRedirectUrl: string;

  public tokenSubscription$: any;
  constructor(
    fb: FormBuilder,
    location: Location,
    public router: Router,
    private auth: AuthService
  ) {
    // For our form, we’ll just have two fields and we’ll require both of them to be filled out before the form can be submitted
    this.loginForm = fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required],
    });
    this.location = location;
  }

  ngOnInit() {
    const loginUrl = '/admin/login';
    this.tokenSubscription$ = this.auth.tokenSubscription((token: any) => {
      if (token && token !== null && this.location.path() === loginUrl) {
        return this.router.navigate(['/admin']);
      }
    });

    const cachedToken = this.auth.token;
    if (!cachedToken) {
      this.tokenSubscription$.next(null)
    }
  }

  ngOnDestroy() {
    if (this.tokenSubscription$) {
      this.tokenSubscription$.unsubscribe();
    }
  }

  submitForm(value: any) {
    if (value.email && value.password) {
      this.auth.login(value.email, value.password);
    }
  }

}
