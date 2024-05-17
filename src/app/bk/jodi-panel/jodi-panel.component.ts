import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/global.service';
import { MatIcon } from '@angular/material/icon';
import { AnimationPopupComponent } from '../animation-popup/animation-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-jodi-panel',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatIcon, MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatSelectModule , MatButtonModule],
  templateUrl: './jodi-panel.component.html',
  styleUrl: './jodi-panel.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class JodiPanelComponent implements OnInit{
  title:string = "Jodi Panel"
  getBazaarDataAll:any
  animal:any
  updateJobiPanel:any
  filterDataArray:any
  token:any
  bazarList:any
  
  constructor(private global: GlobalService, private dialog: MatDialog, private fb: FormBuilder){
    this.updateJobiPanel = this.fb.group({
      bazaar_id: ["", [ Validators.required]],
      date_time: ["", [ Validators.required]],
    })
  }

  ngOnInit(): void {
  this.token = this.global.getToken()
  this.global.getWithToken('bazaar',this.token).subscribe({
    next: (res:any)=>{
      this.bazarList = res.data
    }
  })
   this.getDataFunction()
  }
  getDataFunction(){
    this.global.getWithToken("jodi-panel",this.token).subscribe({
      next: (res:any)=>{
        this.getBazaarDataAll = res.data
        console.log(this.getBazaarDataAll)
        this.filterDataArray = this.getBazaarDataAll
      }
    })
  }

  openDialog(bazaar_d:boolean, panel_id:number): void {
    const dialogRef = this.dialog.open(AnimationPopupComponent, {
      data: { bazaar_id: bazaar_d? bazaar_d : false, panel_id: panel_id? panel_id : false,  path: "jodi-panel" },
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
  
      this.getDataFunction()

      this.animal = result;
    });
  }




  submitUpdateJodiPanel(data:any){
    const date = new Date(data.date_time);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate)
    console.log(data)

    if(data.date_time !=  null && data.date_time !=  ''){
      const filterData = this.filterDataArray.filter((dataR:any)=>{
        return data.bazaar_id == dataR.name && formattedDate == dataR.date_time
      })
    this.getBazaarDataAll = filterData

    }else{
      const filterData = this.filterDataArray.filter((dataR:any)=>{
        return data.bazaar_id == dataR.name
      })
    this.getBazaarDataAll = filterData

    }
    this.updateJobiPanel.reset()

  }
}
