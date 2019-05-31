import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import { NgFlashMessagesModule } from "ng-flash-messages";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { TagInputModule } from 'ngx-chips';
import { JwtModule } from '@auth0/angular-jwt';

import {BodyService} from "./services/body.service";
import { WritepostService } from "./services/writepost.service";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { routes } from "./routes";
import { WriteapostComponent } from './writeapost/writeapost.component';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { Querys } from "./connect/Querys";
import { FilterPipeModule } from "ngx-filter-pipe";
import { SearchPipe } from './pipes/search.pipe';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AlertComponent } from './alert/alert.component';
import { AlertserviceService } from "./services/alertservice.service";
import { AuthGuard } from "./gaurds/auth.guard";
import {AuthenticationService} from "./services/authentication.service";


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    WriteapostComponent,
    ViewpostComponent,
    SearchPipe,
    LoginComponent,
    SignupComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(routes)],
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgFlashMessagesModule.forRoot(),
    FilterPipeModule,
    TagInputModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        whitelistedDomains:[],
        blacklistedRoutes:[]
      }
    })
  ],
  providers: [AuthenticationService,AuthGuard,AlertserviceService,BodyService,WritepostService,Querys],
  bootstrap: [AppComponent]
})
export class AppModule { }
