import {Component, OnInit} from '@angular/core';
import {WritepostService} from "../services/writepost.service";
import {BodyService} from "../services/body.service";
import {Router} from "@angular/router";
import {NgFlashMessageService} from "ng-flash-messages";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {CustomValidatstion} from "./CustomValidatstion";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-writeapost',
  templateUrl: './writeapost.component.html',
  styleUrls: ['./writeapost.component.css']
})
export class WriteapostComponent implements OnInit {


  savePostForm: FormGroup;
  submission = false;
  private id: any;
  private name: any;
  private postid: any;

  constructor(private postservice: WritepostService, private bodyservice: BodyService, private router: Router,
              private ngflashmsg: NgFlashMessageService, private formbuilder: FormBuilder) {
  }

  ngOnInit() {

    const token  = localStorage.getItem('access_token');
    const help = new JwtHelperService();
    const decoded = help.decodeToken(token);
    this.id = decoded.body.id;
    this.savePostForm = this.formbuilder.group({

      title: ['', [CustomValidatstion.whitespaceremover.bind(this)]],
      postedby:[this.id],
      content: ['', [CustomValidatstion.whitespaceremover.bind(this), Validators.maxLength(1000)]],
      tag: ['']
    });
  }

  get wpa() {

    return this.savePostForm.controls;

  }

  ValidForm(value: any) {

    this.submission = true;
    if (this.savePostForm.invalid) {
      return;
    } else {
      this.titcont(value);
    }
  }


  /*
       titcont() will send parama to service for saving the post
       into database
   */

  titcont(postdata) {


    this.postservice.insertpost(postdata).subscribe(data => {
         this.postid = data.id;
         console.log(this.postid);
      },
      error1 => {
        console.log(error1);
      },
      () => {

        this.router.navigate(['/viewpost', this.postid]);
      }
    );
  }
}
