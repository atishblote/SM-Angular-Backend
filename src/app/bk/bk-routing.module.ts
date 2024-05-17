import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { RegularBazaarComponent } from './regular-bazaar/regular-bazaar.component';
import { StarlineBazaarComponent } from './starline-bazaar/starline-bazaar.component';
import { KingBazaarComponent } from './king-bazaar/king-bazaar.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { UpdateOneComponent } from './update-one/update-one.component';
import { JodiPanelComponent } from './jodi-panel/jodi-panel.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { roleGuard } from '../shared/role.guard';
import { isLoginGuard } from '../shared/is-login.guard';
import { writeGuard } from '../shared/write.guard';
import { updateGuard } from '../shared/update.guard';
import { JodiDataComponent } from './jodi-data/jodi-data.component';
import { KingJodiDataComponent } from './king-jodi-data/king-jodi-data.component';
import { StarlineJodiDataComponent } from './starline-jodi-data/starline-jodi-data.component';
import { KingAllJodiDataComponent } from './king-all-jodi-data/king-all-jodi-data.component';

const routes: Routes = [
  { path: ""  , canActivateChild:[roleGuard, isLoginGuard],  component : DashAdminComponent , children: [
    { path: "home" , component : HomeComponent  },
    { path: "regular-bazaar"  ,children:[
      {path: "",  component: RegularBazaarComponent},
      {path: "create-new/:id", canActivate:[writeGuard], component: CreateNewComponent},
      {path: "update-one/:id", canActivate:[updateGuard], component: UpdateOneComponent}
    ]  },
    { path: "starline-bazaar" , children:[
      {path: "",  component:  StarlineBazaarComponent},
      {path: "update-one/:id",canActivate:[updateGuard],  component: UpdateOneComponent},
      {path: "all-data",canActivate:[writeGuard],  component: StarlineJodiDataComponent},
      {path: "jodi-data/:id",canActivate:[writeGuard],  component: JodiDataComponent}
    ] },
    { path: "king-bazaar" , children:[
      {path: "" , component: KingBazaarComponent},
      {path: "update-one/:id" ,canActivate:[updateGuard], component: UpdateOneComponent},
      {path: "all-data" ,canActivate:[updateGuard], component: KingAllJodiDataComponent},
      {path: "jodi-data/:id",canActivate:[writeGuard],  component: KingJodiDataComponent}
    ]  },
    { path: "users"  , children: [
      {path: "", component: UsersComponent},
      {path: "reset/:id",canActivate:[writeGuard],  component: ResetPasswordComponent},
      {path: "update-one/:id",canActivate:[writeGuard],  component: UpdateOneComponent}
    ] },
    { path: "profile" , children:[
      {path: "", component: ProfileComponent},
      {path: "reset/:id",canActivate:[roleGuard],  component: ResetPasswordComponent},
      {path: "update-one/:id",canActivate:[updateGuard],  component: UpdateOneComponent}
    ]  },
    {path: "all-jodi-panel" ,canActivate:[writeGuard],component: JodiPanelComponent},
    {path: "" , redirectTo: 'home' , pathMatch: 'full'},

  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BkRoutingModule { }
