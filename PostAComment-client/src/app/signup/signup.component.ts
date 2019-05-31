import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {CustomValidatstion} from "../writeapost/CustomValidatstion";
import {match} from "./CustomPasswordValidation";
import {Md5} from 'ts-md5/dist/md5';
import {SignupService} from "./signup.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {AlertserviceService} from "../services/alertservice.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  saveRegisterForm: FormGroup;
  loading = false;
  submission = false;

  constructor(private formbuilder: FormBuilder, private ss: SignupService, private router: Router,private alert:AlertserviceService) {
  }


  ngOnInit() {

    this.saveRegisterForm = this.formbuilder.group({
      firstname: ['', [CustomValidatstion.whitespaceremover.bind(this), Validators.minLength(4), Validators.maxLength(25)]],
      lastname: ['', [CustomValidatstion.whitespaceremover.bind(this), Validators.minLength(4), Validators.maxLength(25)]],
      email: ['', [CustomValidatstion.whitespaceremover.bind(this), Validators.email]],
      password: ['', [CustomValidatstion.whitespaceremover.bind(this), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      cpwd: ['', [CustomValidatstion.whitespaceremover.bind(this)]]
    }, {
      validator: match('password', 'cpwd')
    });

  }

  get rpa() {
    return this.saveRegisterForm.controls;
  }

  validRegisterForm(value: any) {
    this.submission = true;
    if (this.saveRegisterForm.invalid) {
      return;
    } else {
      this.registerForm(value);
    }
  }

  private registerForm(value: any) {

    let val;
    const md5 = new Md5();
    for (let key in value) {
      if (key === 'password') {
        val = md5.appendStr(value[key]).end();
        break;
      }
    }
    value['password'] = val;
    value['cpwd'] = '';
    this.loading = true;
    this.ss.register(value).pipe(first()).subscribe(data => {

        this.alert.success('registration successful', true);
        this.router.navigate(['/login']);

      },
      error1 => {
       this.alert.error(error1);
       this.loading = false;
      },
      () => {}
    );
  }
}
