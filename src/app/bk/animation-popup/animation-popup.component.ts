import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {  MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { GlobalService } from '../../shared/global.service';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  bazaarId: string;
  panelId: string;
}


@Component({
  selector: 'app-animation-popup',
  standalone: true,
  imports: [ MatInputModule, FormsModule, MatButtonModule, MatDialogClose, MatDialogActions, MatDialogContent , MatIcon],
  templateUrl: './animation-popup.component.html',
  styleUrl: './animation-popup.component.scss'
})
export class AnimationPopupComponent implements OnInit {
  bazaarId:any
  panelId:any
  allData:any
  path:any
  token:any
  constructor(
    public dialogRef: MatDialogRef<AnimationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
   private global: GlobalService, private toastr: ToastrService ) {
    this.allData = data
    this.bazaarId = this.allData.bazaar_id
    this.panelId = this.allData.panel_id
    this.path = this.allData.path
  }

ngOnInit(): void {
  this.token =this.global.getToken()
  console.log(this.allData ) 
  
}

  onYesClick():void{
    if(this.panelId){
      this.global.deleteWithToken(`${this.path}/${this.panelId}`,this.token).subscribe({
        next: (res:any)=>{
          this.toastr.success(res.message,"SUCCESS")
        },
        error: (err:any)=>{
          this.toastr.error(err.error.message,"ERROR")
        }
      })
    }

  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
