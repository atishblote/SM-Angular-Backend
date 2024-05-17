import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/global.service';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { AnimationPopupComponent } from '../animation-popup/animation-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgxSearchFilterModule } from 'ngx-search-filter';

@Component({
  selector: 'app-starline-jodi-data',
  standalone: true,
  imports: [RouterLink, MatButtonModule,MatInputModule,MatFormField, MatIcon, MatInputModule, FormsModule , NgxSearchFilterModule],
  templateUrl: './starline-jodi-data.component.html',
  styleUrl: './starline-jodi-data.component.scss'
})
export class StarlineJodiDataComponent implements OnInit {
  starlineData:any
  token:any
  term:any = ''
  animal: string = 'none';
  title:string = "All Starline Jodi"
  searchText:string = ""
  constructor(private global:GlobalService , private dialog:MatDialog, private router: Router){

  }

  ngOnInit(): void {
    this.token = this.global.getToken()
    this.getStarlineData()
  }

  getStarlineData(){
    this.global.getWithToken("starline-jodi",this.token).subscribe({
      next:(res:any)=>{
        console.log(res.data)
        this.starlineData = res.data.reverse()
      },error: (err:any)=>{
        if(err.error.message == 'Session Expired'){
          alert(err.error.message)
          this.router.navigate(['login'])
          sessionStorage.clear()
        }
      }
    })
  }



  // de;ete
  openDialog(bazaar_d: number, panel_id: number): void {
    const dialogRef = this.dialog.open(AnimationPopupComponent, {
      data: {
        bazaar_id: bazaar_d ? bazaar_d : false,
        panel_id: panel_id ? panel_id : false,
        path: 'starline-jodi',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      ////console.log('The dialog was closed');
      this.getStarlineData();
      this.animal = result;
    });
  }

  // serach
  searchType(data:any){
    console.log(data)
    const filterData = this.starlineData.filter((item:any)=>{
      return item.name.includes(data) 
    })

    this.starlineData = filterData
  }
}
