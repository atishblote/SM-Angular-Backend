import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AnimationPopupComponent } from '../animation-popup/animation-popup.component';
import { GlobalService } from '../../shared/global.service';
import { ToastrService } from 'ngx-toastr';

interface Food {
  value: string;
  viewValue: string;
}
interface Bazaar {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-king-bazaar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatIcon,
    RouterLink,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    AnimationPopupComponent,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './king-bazaar.component.html',
  styleUrl: './king-bazaar.component.scss',
})
export class KingBazaarComponent implements OnInit {
  animal: string = 'none';
  name: string = 'King Bazar';
  jodi: any;
  flag: boolean = false;
  kingJodiId:any
  kingId: any;
  idDate: any;

  createKingForm: any;
  getKingBazaar: any;
  updateKingForm: any;
  isRole:any
  title: string = 'King Bazaar';
  selectedTabIndex: any;
  selectedValue: any;
  getByIdData:any
  token: any;
  getByDate: boolean = true;
  isHighilited: Food[] = [
    { value: 'no', viewValue: 'No' },
    { value: 'yes', viewValue: 'Yes' },
  ];

  myFilter = (d: Date | null): boolean => {
    const today = new Date(); // Get today's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() ); // Get tomorrow's date
  
    // Prevent Sundays and future dates starting from tomorrow from being selected.
    return !(d && d.getDay() === 0) && !(d && d.getTime() > tomorrow.getTime());
  };
  

  constructor(
    public dialog: MatDialog,
    private globle: GlobalService,
    private fb: FormBuilder,
    private toster: ToastrService,
    private router: Router
  ) {
    this.createKingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      open_time: ['', [Validators.required]],
      close_time: ['', [Validators.required]],
      is_active: ['0', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isRole = this.globle.getUserData();

    this.token = this.globle.getToken();
    this.getKingBazarData();
    this.updateKingForm = this.fb.group({
      king_id: ['', [Validators.required]],
      date: ['', [Validators.required]],
      jodi: ['', [Validators.required, Validators.minLength(2)]],
      is_active: [1],
    });
  }
  openTab(value: any) {
    this.selectedTabIndex = value;
  }

  openDialog(bazaar_d:number, panel_id:number): void {
    const dialogRef = this.dialog.open(AnimationPopupComponent, {
      data: { bazaar_id: bazaar_d? bazaar_d : false, panel_id: panel_id? panel_id : false, path: "king" },
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
  
      this.getKingBazarData()

      this.animal = result;
    });
  }

  getKingBazarData() {
    this.globle.getWithToken('king', this.token).subscribe({
      next: (res: any) => {
        this.getKingBazaar = res.data;
        console.log(res.data)
      },
      error: (err: any) => {
        if (err.error.message == 'Session Expired') {
          alert(err.error.message);
          this.router.navigate(['login']);
          sessionStorage.clear();
        }
      },
    });
  }
  createKingFun(data: any) {
    if (!this.createKingForm.invalid) {
      console.log(data);
      const closet = new Date(
        '1970-01-01T' + data.close_time + ':00'
      ).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const opent = new Date(
        '1970-01-01T' + data.open_time + ':00'
      ).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const isActive = data.is_active == 'yes' ? 1 : 0;
      const body = {
        name: data.name,
        open_time: opent,
        close_time: closet,
        is_active: isActive,
      };

      this.globle.postWithToken(body, 'king/create', this.token).subscribe({
        next: (res: any) => {
          this.toster.success(res.message, 'SUCCESS');
          this.createKingForm.reset();
          this.getKingBazarData();
          this.openTab(0);
        },error: (err:any)=>{
          this.toster.error(err.error.message,"ERROR")
        }
      });
    } else {
      this.toster.warning('Fill all fields', 'Empty');
    }
  }

  // getByDate
  getBydateFun(data: any) {
    if (data.king_id != '' && data.date != '') {
      this.getByDate = false;
      this.updateKingForm.get('king_id').disable();
      this.updateKingForm.get('date').disable();
      this.kingId = data.king_id;
      const cuurentDate = this.localDate(data.date)
      this.idDate = cuurentDate;
      const body = {
        king_id: data.king_id,
        date: cuurentDate,
      };
      console.log(body);
      this.globle
        .postWithToken(body, 'king-jodi/find-by-date', this.token)
        .subscribe({
          next: (res: any) => {
            this.kingJodiId = res.data.id

            console.log(res);
            this.jodi = res.data.jodi;
            this.flag = true;
          },
          error: (err: any) => {
            console.log(err);
            this.getByDate = false;
            this.flag = false;
          },
        });

        this.getById(data.king_id)

    } else {
      this.toster.warning('Fill all fields', 'EMPTY');
    }
  }

  getById(id:any){
    const body = {
      "king_id": id
    }
    this.globle
    .postWithToken(body, 'king-jodi/by-date', this.token)
    .subscribe({
      next: (res: any) => {
        this.getByIdData = res.data
      },
      error: (err: any) => {
      
      },
    });
  }

  // update
  updateKingFun(data: any) {
    console.log(data);
    const date = new Date(this.idDate);
    const monthIndex = date.getMonth() + 1;

    console.log(data.jodi)
    console.log(monthIndex)
    console.log(this.idDate)
    console.log(data.is_active)
    console.log(this.kingJodiId)
    if (data.jodi != '') {
      if (this.flag) {
        const body ={
          "jodi":data.jodi,
          "is_active": data.is_active,
          "updated_at":new Date(),
          "id":`${this.kingJodiId}`
        }
        this.globle.updateWithToken(body,"king-jodi/update",this.token).subscribe({
          next: (res:any)=>{
            this.toster.success(res.message,"SUCCESS")
            this.updateKingForm.reset();
            this.getByDate = true
          },error:(err:any)=>{
            this.toster.error(err.error.message,"ERROR")
          }
        })
      } else {
        const body = {
          king_id: this.kingId,
          date: this.idDate,
          month_index: monthIndex,
          jodi: data.jodi,
          is_active: data.is_active,
          updated_at: new Date(),
        };

        this.globle
          .postWithToken(body, 'king-jodi/create', this.token)
          .subscribe({
            next: (res: any) => {
              // console.log(res);
              this.toster.success(res.message,"SUCCESS")
              this.jodi = res.data.jodi;
              this.flag = false;
              this.getByDate = true;
              this.updateKingForm.reset();
            },
            error: (err: any) => {
              console.log(err);
              this.toster.error(err.error.message,"ERROR")
              this.getByDate = true;
            },
          });
      }
      this.updateKingForm.get('king_id').enable();
      this.updateKingForm.get('date').enable();
    }
  }



  deleteJodiKing(id:any,jodiId:any){
      this.globle.deleteWithToken(`king-jodi/${id}`,this.token).subscribe({
        next:(res:any)=>{
          this.getById(jodiId)
          this.toster.success(res.message,"SUCCESS")

        },error:(err:any)=>{
          this.toster.error(err.error.message,"ERROR")
        }
      })
  }


  localDate(dateLo:any){
    // local time 
    const adjustedDate = new Date(dateLo);
    const timezoneOffset = adjustedDate.getTimezoneOffset() * 60000;
    const localDateTime = new Date(adjustedDate.getTime() - timezoneOffset).toISOString();

    return localDateTime
  }

}
