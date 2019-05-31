import {Component, OnInit} from '@angular/core';
import {BodyService} from "../services/body.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData:any;
  name:string;

  constructor(private bodyserv: BodyService,private auth: AuthenticationService, private route: Router) {

  }

  ngOnInit() {
    this.details();
  }

  details() {

    let token  = localStorage.getItem('access_token');
    const help = new JwtHelperService();
      const decoded = help.decodeToken(token);
      this.name = decoded.body.name;

    // this.auth.key.subscribe(data =>{
    //   this.userData = data;
    //   // console.log("token is",data);
    //   const help = new JwtHelperService();
    //   const decoded = help.decodeToken(this.userData);
    //   // console.log("decoded",decoded)
    //   this.name = decoded.body.name;
    //   // console.log('name is',this.name);
    // })
  }

  logout() {
    this.auth.logoout();
    this.route.navigate(['login']);
  }
}
