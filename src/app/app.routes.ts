import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { isLoginGuard } from './shared/is-login.guard';

export const routes: Routes = [
    { path:"", 'title':"Login | Satta Matka" ,component: LoginComponent},
    { path:"login", 'title':"Login | Satta Matka" ,component: LoginComponent},
    { path:"sign-up", component: SignUpComponent},
    { path:"dashboard", component: DashboardComponent},
    { path:"bk",'title':"Dashboard | Satta Matka" , loadChildren: () => import('./bk/bk.module').then( (m) => m.BkModule )},
    { path: "", redirectTo: 'login', pathMatch: 'full' },
    { path:"**", component: PageNotFoundComponent},
];
