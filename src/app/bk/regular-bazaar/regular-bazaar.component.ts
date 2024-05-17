import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimationPopupComponent } from '../animation-popup/animation-popup.component';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../shared/global.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ShortenDayPipe } from '../pipes/shorten-day.pipe';
import { OpeningTimeTextPipe } from '../../shared/pipes/opening-time-text.pipe';


interface Food {
  value: string;
  viewValue: string;
}
interface Bazaar {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-regular-bazaar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule,ReactiveFormsModule, MatIcon, DatePipe , OpeningTimeTextPipe, ShortenDayPipe, UpperCasePipe , RouterLink, MatTabsModule ,MatProgressSpinnerModule, MatButtonModule , MatInputModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule, AnimationPopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './regular-bazaar.component.html',
  styleUrl: './regular-bazaar.component.scss',
  host: {ngSkipHydration: 'true'}
})
export class RegularBazaarComponent implements OnInit{
  animal: string = "none";
  name: string = "Regular Bazar";
  createBazaarForm:any
  updateJobiPanel:any
  getBazaarDataAll:any
  transformedBazaarList:any
  isLoaded:boolean = false
  title:string = "Regular Bazaar"
  selectedTabIndex:number = 0
  selectedValue: any;
  newJodi:boolean = true

  bazaarName:any
  jodiDate:any
  loaded:boolean = false
  openData:any 
  closeData:any
  jodiData:any
  jId:any
  // myFilter:any
  token:any

  bazaarList: Bazaar[] = []

  daysList: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  myFilter = (d: Date | null): boolean => {
    const today = new Date(); // Get today's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() ); // Get tomorrow's date
  
    // Prevent Sundays and future dates starting from tomorrow from being selected.
    return !(d && d.getDay() === 0) && !(d && d.getTime() > tomorrow.getTime());
  };
  isRole:any
  
  
  
  
  
  


  constructor(public dialog: MatDialog, private global: GlobalService ,private fb: FormBuilder, private toastr: ToastrService , private router: Router){
    this.isRole = this.global.getUserData()
    this.createBazaarForm = this.fb.group({
      name: ["", [ Validators.required]],
      open_time: ["", [ Validators.required]],
      close_time: ["", [ Validators.required]],
      is_highlighted: ["", [ Validators.required]],
      day_of_week: ['', [Validators.required]],
      is_active:  [1]
    })

    this.updateJobiPanel = this.fb.group({
      bazaar_id: ["", [ Validators.required]],
      date_time: ["", [ Validators.required]],
      open: [null, Validators.pattern(/^[0-9]{3}$/)],
      close: [null,Validators.pattern(/^[0-9]{3}$/)],
      jodi: [null],
      is_active:  [1]
    })
  } 

  ngOnInit(): void {
   this.token =  this.global.getToken()
    console.log(this.isRole)
    this.getDataFunction()
    this.loadBazaarName()
  }


  getDataFunction(){
    this.global.postWithToken("","bazaar/regular-back",this.token).subscribe({
      next:(res:any)=>{
        this.getBazaarDataAll = res.data
        this.isLoaded = true
        console.log(this.getBazaarDataAll)
        this.loaded= true
      },
      error: (err)=>{
        console.log(err.error.message);
        if(err.error.message == 'Session Expired'){
          alert(err.error.message)
          this.router.navigate(['login'])
          sessionStorage.clear()
        }
        this.loaded= false
      }
    })

  }

  openTab(value:any){
    this.selectedTabIndex = value
  }

  loadBazaarName(){
    this.global.getWithToken("bazaar",this.token).subscribe({
      next:(value:any)=> {
        console.log(value)
        this.transformedBazaarList = value.data
      },
      error: (err)=>{
        console.log(err.error.message);
        if(err.error.message == 'Session Expired'){
          alert(err.error.message)
          this.router.navigate(['login'])
          sessionStorage.clear()
        }
      }
    })
    // map
    
  }


  openDialog(bazaar_d:number, panel_id:number): void {
    const dialogRef = this.dialog.open(AnimationPopupComponent, {
      data: { bazaar_id: bazaar_d? bazaar_d : false, panel_id: panel_id? panel_id : false, path: "jodi-panel" },
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
  
      this.getDataFunction()

      this.animal = result;
    });
  }

  // gtInput()
  getInputvalue(value:any){
    if(value.length === 3){
      console.log(value)
      var digit = 0
      var numberString = value.toString();

      for(var i=0 ; i < numberString.length; i++  ){
        digit = parseInt(numberString[i]);
        digit = digit + digit
        console.log(digit);


      }
    }
  }

  // submit entry
  submitCreateBazaar(data:any){
    console.log(data)
    if(this.createBazaarForm.invalid){
      this.toastr.warning("Fill all the fields", "WARN")
    }else{
      this.global.postWithToken(data,"bazaar/create",this.token).subscribe({
        next: (res:any)=>{
          this.getDataFunction()

          this.toastr.success(res.message,"SUCCESS")
          this.createBazaarForm.reset()
          
        },
        error: (err)=>{
          this.toastr.error(err.error.message,"ERROR")
        }
      })
    }
  }



   // submit entry
   submitUpdateJodiPanel(data:any){
    console.log(data)
    console.log(this.token)
    if(this.updateJobiPanel.invalid){
      this.toastr.warning("Fill all the fields", "WARN")
    }else{
      if(this.newJodi){
        this.global.postWithToken(data,"jodi-panel/create",this.token).subscribe({
          next: (res:any)=>{
            this.getDataFunction()
  
            this.toastr.success(res.message,"SUCCESS")
            this.updateJobiPanel.reset()
            this.selectedTabIndex = 0
  
          },
          error: (err)=>{
            this.toastr.error(err.error.message,"ERROR")
          }
        })
      }else{
        const newData={
          "id":this.jId,
          "open":data.open,
          "close":data.close,
          "jodi":data.jodi
      }
        this.global.updateWithToken(newData,"jodi-panel/update",this.token).subscribe({
          next: (res:any)=>{
            this.getDataFunction()
  
            this.toastr.success(res.message,"SUCCESS")
            this.updateJobiPanel.reset()
            this.selectedTabIndex = 0
  
          },
          error: (err)=>{
            this.toastr.error(err.error.message,"ERROR")
          }
        })
      }
      

    }
  }


  // filter
  filterBydate(){
    console.log(this.updateJobiPanel.value)

    this.global.getWithToken(`jodi-panel/find-panel/${this.updateJobiPanel.value.bazaar_id}?date=${this.updateJobiPanel.value.date_time}`,this.token).subscribe({
      next: (res:any)=>{
        console.log(res)
        this.openData = res.data.open
        this.closeData = res.data.close
        this.jodiData = res.data.jodi
        this.jId = res.data.id
        this.newJodi = false
      },
      error: (err:any)=>{
        console.log(err)
        this.openData = ""
        this.closeData = ""
        this.jodiData = ""
        this.jId = ""
        this.newJodi = true
      }
    })
  }

}
