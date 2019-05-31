import {Component,  OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewpostService} from "../services/viewpost.service";
import {Router} from "@angular/router";
import {NgFlashMessageService} from "ng-flash-messages";
import {FormBuilder,Validators,FormGroup} from "@angular/forms";
import {CustomValidatstion} from "../writeapost/CustomValidatstion";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {

  saveCommentForm:FormGroup
  submission = false;

  vid: number;
  likes:any;
  flag: boolean = false;
  title:string;
  content:string;
  comment: any;
  listvault : any = [];
  count:number;
  commentsVault: any = [];
  alllikes: any;
  finallikes:any = [];
  tags:string;
  private id: any;
  private name: any;


  constructor(private url:ActivatedRoute,private viewpostservice:ViewpostService,private router:Router,
              private  ngflashmsg:NgFlashMessageService,private formbuilder:FormBuilder) { }


  ngOnInit() {

    // calling all methods when page loaded.
    const token  = localStorage.getItem('access_token');
    const help = new JwtHelperService();
    const decoded = help.decodeToken(token);
    this.id = decoded.body.id;
    this.vid = parseInt(this.url.snapshot.paramMap.get('id'));
    this.viewPost();
    this.getAllComments();
    this.getAllLikes();

    this.saveCommentForm = this.formbuilder.group({

          commentedby: [this.id],
          commentcontent:['',[CustomValidatstion.whitespaceremover.bind(this),Validators.maxLength(255)]],
          postid: [this.vid]
    });
  }

  get cpa(){
    return this.saveCommentForm.controls;
  }


  /*
      viepost() will access service get the related post content data.
   */
  viewPost(){

    let id = this.vid;
    this.viewpostservice.getByIdAll(id).subscribe((response) => {

      this.listvault = response;
      this.tags = response[0].tag.split(',');
      this.name = this.listvault[0].user.firstname+this.listvault[0].user.lastname;
    });

  }


  validCommentForm(value: any) {

      this.submission = true;

      if(this.saveCommentForm.invalid){
        return;
      }else{
        this.submitcomment(value);
      }
  }
  /*
      submitcomment(params) will subscribe the service , send the params
      to service fro saving into data base.
   */
  submitcomment(commentdata) {

    let savedObject;
    this.viewpostservice.submitcomment(commentdata).subscribe(data => {
        savedObject = data;
        console.log("returned object of comment",savedObject);
        this.ngflashmsg.showFlashMessage({
          messages: ['commented successfully'],
          timeout : 4000,
          dismissible: true,
          type: 'success'
        });
        this.getAllComments();
      },
      error1 => {
        console.log(error1);
      },
      ()=> {
        this.saveCommentForm.reset();
      }
    );
  }

  /*
      getAllComments() will subscribe the service  get the comments object
      from publisher in service
   */
  getAllComments(){

    let id = this.vid;
    this.viewpostservice.getAllComments(id).subscribe((response) =>{
      this.commentsVault = response;
      console.log("comments in client",this.commentsVault);
    });
  }

  /*
      submitLikes() will subscribe the service , send the params
      to service fro saving likes into data base for a particular
      id.
   */
  submitLikes(){

    let id = this.vid;
    let likesObj;
    this.viewpostservice.submitlikes(id).subscribe(data => {

        this.getAllLikes();
        likesObj = data;
    },
       error1 => {
      console.log(error1);
      },
      );
    // this.viewpostservice.setlikesAll(type);

  }

  /*
      getAllLikes() will subscribe the service  get the likes object
      from publisher in service
   */
  getAllLikes(){

    let id = this.vid;
    this.viewpostservice.getAllLikes(id).subscribe((response) => {
      this.alllikes = response;
      //one way data binding.
      this.finallikes = this.alllikes.count;
    });
  }
}
