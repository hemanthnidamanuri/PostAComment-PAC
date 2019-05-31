import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomValidatstion} from "../writeapost/CustomValidatstion";
import {Router} from "@angular/router";
import {AlertserviceService} from "../services/alertservice.service";
import {AuthenticationService} from "../services/authentication.service";
import {Md5} from 'ts-md5/dist/md5';
import {first} from "rxjs/operators";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  submission = false;
  loading = false;

  constructor
  (
    private formbuilder: FormBuilder,
    private router: Router,
    private alert: AlertserviceService,
    private authservice: AuthenticationService

  ) {}

  ngOnInit() {

    this.loginForm = this.formbuilder.group({

      email: ['',CustomValidatstion.whitespaceremover.bind(this)],
      password: ['',CustomValidatstion.whitespaceremover.bind(this)]

    });

    this.authservice.logoout();

  }




  get lpa() {
    return this.loginForm.controls;
  }

  validLoginForm(value: any) {
    this.submission = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginFormFunc(value);
      this.loginForm.reset();
    }
  }

  private loginFormFunc(value) {

    let val;
    const md5 = new Md5();

    for (let key in value) {
      if (key === 'password') {
        val = md5.appendStr(value[key]).end();
        value['password'] = val;
        break;
      }
    }

    this.authservice.login(value).pipe(first()).subscribe(data => {

        this.router.navigate(['/']);
      },
      error => {
        this.alert.error(error);
        this.loading = false;
      },
      () =>{

      }
    )
  }
}
