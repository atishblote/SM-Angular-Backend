import { Component, OnChanges, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { GlobalService } from '../../shared/global.service';
import { error } from 'console';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatSelectModule,MatIcon, MatTabsModule, MatFormFieldModule, FormsModule, MatButtonModule,MatInputModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  title:string= "Profile data"
  selectedValue:any
  selectedTabIndex:any
  name:any
  dataGet:any
  id:string = ""
  email:string = ""
  phone:string = ""
  permission:string = ""
  token:any
  idss:any

  
constructor(private global: GlobalService){}

ngOnInit(): void {
  this.token = this.global.getToken()
    this.idss  = sessionStorage.getItem('userData');
    this.id = JSON.parse(this.idss).id
  
  this.getData()
}
  openTab(value:any){}


getData(){
  this.global.getWithToken(`user/${this.id}`,this.token).subscribe({
    next:(res:any)=>{
      this.dataGet = res.data
      this.id = res.data.id
      
    },
    error: (err)=>{
      // console.log(error)
    }
  })
}


}