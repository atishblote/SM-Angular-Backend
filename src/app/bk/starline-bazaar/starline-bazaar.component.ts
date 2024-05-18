import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { DatePipe } from '@angular/common';
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
  selector: 'app-starline-bazaar',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    DatePipe,
    MatIcon,
    RouterLink,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AnimationPopupComponent,
  ],
  templateUrl: './starline-bazaar.component.html',
  styleUrl: './starline-bazaar.component.scss',
})
export class StarlineBazaarComponent implements OnInit {
  animal: string = 'none';
  name: string = 'Regular Bazar';

  title: string = 'Starline Bazaar';
  selectedTabIndex: any = 0;
  selectedValue: any;
  token: any;
  isRole: any;
  starlineData: any;
  starlineID: any;
  showField: boolean = false;
  selectedInterval: number = 60;
  openTime: any; // Your open time
  closeTime: any; // Your close time
  timeBreaks: string[] = [];
  timeBreaksGenerated: boolean = false;
  starlineJodiId: any;
  byDateData: any;
  filterDate: any;
  openSJ: any;
  closeSJ: any;
  publishSJ: any;

  findById:any
  findByDate:any
  findByTime:any

  createStalineForm: any;
  updateStarlineJodi: any;
  flag: boolean = false;
  filedDisable: boolean = true;
  isHighilited: Food[] = [
    { value: 'no', viewValue: 'No' },
    { value: 'yes', viewValue: 'Yes' },
  ];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 7;
  };

  constructor(
    public dialog: MatDialog,
    private global: GlobalService,
    private fb: FormBuilder,
    private toster: ToastrService,
    private router: Router
  ) {
    this.createStalineForm = this.fb.group({
      name: ['', [Validators.required]],
      open_time: ['', [Validators.required]],
      close_time: ['', [Validators.required]],
      time_interval: ['', [Validators.required]],
      is_active: ['', [Validators.required]],
    });

    this.updateStarlineJodi = this.fb.group({
      starline_id: [{ value: '', disabled: false }, [Validators.required]],
      date: [{ value: '', disabled: false }, [Validators.required]],
      date_index: [''],
      time: [{ value: '', disabled: false }, [Validators.required]],
      open: [
        '',
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.minLength(3),
          Validators.pattern('[0-9]*'),
        ],
      ],
      jodi: [
        '',
        [
          Validators.required,
          Validators.maxLength(2),
          Validators.minLength(2),
          Validators.pattern('[0-9]*'),
        ],
      ],
      is_active: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isRole = this.global.getUserData();

    this.token = this.global.getToken();
    this.loadStarlineData();
  }

  onSelectionChange(event: any) {
    const selectedValue = event.value;
    const filterData = this.starlineData.filter((filter: any) => {
      return filter.id == selectedValue;
    });
    //console.log(filterData);
    this.generateTimeBreaks(filterData[0].open_time, filterData[0].close_time);

    // Add your logic here based on the selected value
  }

  openTab(value: any) {
    this.selectedTabIndex = value;
  }

  loadStarlineData() {
    this.global.getWithToken('starline', this.token).subscribe({
      next: (res: any) => {
        ////console.log(res.data)
        this.starlineData = res.data;
      },
      error: (err) => {
        if (err.error.message == 'Session Expired') {
          alert(err.error.message);
          this.router.navigate(['login']);
          sessionStorage.clear();
        }
      },
    });
  }

  openDialog(bazaar_d: number, panel_id: number): void {
    const dialogRef = this.dialog.open(AnimationPopupComponent, {
      data: {
        bazaar_id: bazaar_d ? bazaar_d : false,
        panel_id: panel_id ? panel_id : false,
        path: 'starline',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      ////console.log('The dialog was closed');
      this.loadStarlineData();
      this.animal = result;
    });
  }

  generateTimeBreaks(openTime: any, closeTime: any) {
    this.timeBreaks = [];
    this.timeBreaks.push(openTime);
    let startTime = new Date('1970-01-01 ' + openTime); // Set date to ensure proper comparison
    startTime.setHours(startTime.getHours() + 1); // Add 1 hour to the open time
    const endTime = new Date('1970-01-01 ' + closeTime); // Set date to ensure proper comparison

    while (startTime <= endTime) {
      this.timeBreaks.push(this.formatTime(startTime));
      startTime = new Date(startTime.getTime() + this.selectedInterval * 60000); // Increment by selected interval in milliseconds
    }

    this.timeBreaksGenerated = true;

    console.log(this.timeBreaks)
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // create sarline bazar
  createStarlineFn(data: any) {
    const currentdate = new Date();
    const closet = new Date(
      '1970-01-01T' + data.close_time + ':00'
    ).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const opent = new Date(
      '1970-01-01T' + data.open_time + ':00'
    ).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    ////console.log(closet)
    ////console.log(opent)
    if (!this.createStalineForm.invalid) {
      const body = {
        name: `${data.name}`,
        time_interval: `${data.time_interval}`,
        open_time: `${opent}`,
        close_time: `${closet}`,
        is_active: `${data.is_active}`,
        updated_at: `${currentdate}`,
      };
      this.global.postWithToken(body, 'starline/create', this.token).subscribe({
        next: (res: any) => {
          this.toster.success(res.message, 'SUCCESS');
          this.createStalineForm.reset();
          this.loadStarlineData();
        },
        error: (err) => {
          this.toster.error(err.error.message, 'ERROR');
        },
      });
    } else {
      this.toster.warning('Fill the all fields', 'EMPTY');
    }
  }

  // update starline jodi
  starlineJodiFunc(data: any) {
    //console.log(this.timeBreaks);
    //console.log(this.showField);
    this.updateStarlineJodi.get('starline_id').enable();
    this.updateStarlineJodi.get('time').enable();
    this.updateStarlineJodi.get('date').enable();
    // ////console.log(this.openSJ)
    // ////console.log(this.closeSJ)

    console.log(data);
    if (!this.updateStarlineJodi.invalid) {
      // this.showField = true
      const index = this.timeBreaks.indexOf(this.findByTime);

      //console.log(index);
      ////console.log(this.updateStarlineJodi.value)
      if (this.flag) {
        const isAc = data.is_active == 'yes' ? 1 : 0;
        const body = {
          id: this.starlineJodiId,
          open: data.open,
          jodi: data.jodi,
          date_index: `${index}`,
          is_active: isAc,
          updated_at: new Date(),
        };
        // update
        this.global
          .updateWithToken(body, 'starline-jodi/update', this.token)
          .subscribe({
            next: (res: any) => {
              this.toster.success(res.message, 'SUCCESS');
              this.updateStarlineJodi.reset();
              this.showField = false;
            },
            error: (err) => {
              this.toster.error(err.error.message, 'ERROR');
            },
          });
        //console.log('update');
      } else {
        // create
        const isAc = data.is_active == 'yes' ? 1 : 0;
        
        
        const body = {
          starline_id: this.findById,
          date: this.findByDate,
          date_index: `${index}`,
          time: this.findByTime,
          open: data.open,
          jodi: data.jodi,
          is_active: isAc,
        };

        console.log(body)

        this.global
          .postWithToken(body, 'starline-jodi/create', this.token)
          .subscribe({
            next: (res: any) => {
              this.toster.success(res.message, 'SUCCESS');
              this.updateStarlineJodi.reset();
              this.showField = false;
            },
            error: (err) => {
              this.toster.error(err.error.message, 'ERROR');
            },
          });
        //console.log('create');
      }
    } else {
      this.toster.warning('Fill all fields', 'EMPTY');
    }
  }

  getByDate(data: any) {
    console.log(data);

    if (
      data.starline_id != '' ||
      (data.starline_id != null && data.time != '') ||
      (data.time != null && data.date != '') ||
      (data.date != null && data.open == '') ||
      (data.open == null && data.jodi == '') ||
      (data.jodi == null && data.is_active == '') ||
      data.is_active == null
    ) {
      const currentDate = this.localDate(data.date)
      const body = {
        starline_id: data.starline_id,
        date: currentDate,
        time: data.time,
      };
      this.findById = data.starline_id
      this.findByTime = data.time

      
      
      this.findByDate = this.localDate(data.date)
      console.log(this.findByTime)
      console.log(this.findByDate)

      this.global
        .postWithToken(body, 'starline-jodi/find-by-date', this.token)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.openSJ = res.data.open;
            this.closeSJ = res.data.jodi;
            this.publishSJ = res.data.is_active == 1 ? 'yes' : 'no';
            this.flag = true;

            this.showField = true;

            this.starlineJodiId = res.data.id;
          },
          error: (err) => {
            ////console.log(err)
            this.flag = false;
            this.showField = true;
            if (err.error.message == 'Session Expired') {
              alert(err.error.message);
              this.router.navigate(['login']);
              sessionStorage.clear();
            }
          },
        });

      this.getbyDateData(data.starline_id, data.date);
    }
    this.updateStarlineJodi.get('starline_id').disable();
    this.updateStarlineJodi.get('time').disable();
    this.updateStarlineJodi.get('date').disable();
  }

  // by date
  getbyDateData(id: any, date: any) {
    const currentDate = this.localDate(date)
    const bydate = {
      starline_id: id,
      date: currentDate,  
    };
    this.global
      .postWithToken(bydate, 'starline-jodi/by-date', this.token)
      .subscribe({
        next: (res: any) => {
          this.byDateData = res.data;
          //console.log(this.byDateData);
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

  deleteJodiSatrline(id: any) {
    this.global.deleteWithToken(`starline-jodi/${id}`, this.token).subscribe({
      next: (res: any) => {
        // thisgetbyDateData()
        this.toster.success(res.message, 'SUCCESS');
      },
      error: (err: any) => {
        //console.log(err)
        this.toster.error(err.error.message, 'ERROR');
      },
    });
  }
  // reset form
  resetForm() {
    this.showField = false;
    this.updateStarlineJodi.get('starline_id').enable();
    this.updateStarlineJodi.get('time').enable();
    this.updateStarlineJodi.get('date').enable();
    this.updateStarlineJodi.reset();
  }

  localDate(dateLo:any){
    // local time 
    const adjustedDate = new Date(dateLo);
    const timezoneOffset = adjustedDate.getTimezoneOffset() * 60000;
    const localDateTime = new Date(adjustedDate.getTime() - timezoneOffset).toISOString();

    return localDateTime
  }
}
