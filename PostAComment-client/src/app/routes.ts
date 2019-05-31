import {Routes} from "@angular/router";
import {BodyComponent} from "./body/body.component";
import {WriteapostComponent} from "./writeapost/writeapost.component";
import {ViewpostComponent} from "./viewpost/viewpost.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./gaurds/auth.guard";

// all front end route path will exist here access the routes in app.module.td
// where routing module will access the route json array.

export const routes: Routes = [

  {path: '', component: BodyComponent , canActivate:[AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'writeapost' , component: WriteapostComponent,canActivate:[AuthGuard]},
  {path: 'viewpost/:id', component: ViewpostComponent,canActivate:[AuthGuard]},
  {path: '**', redirectTo: '/', pathMatch: 'full'}

];

