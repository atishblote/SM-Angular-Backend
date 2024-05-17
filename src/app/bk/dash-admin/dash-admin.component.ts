import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GlobalService } from '../../shared/global.service';

@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [RouterLink,MatIcon, RouterLinkActive, RouterOutlet],
  templateUrl: './dash-admin.component.html',
  styleUrl: './dash-admin.component.scss'
})
export class DashAdminComponent {
  constructor(private global: GlobalService, private router:Router){}

  logOut(){
    this.global.logout()
    this.router.navigate(['/login'])
  }
}
