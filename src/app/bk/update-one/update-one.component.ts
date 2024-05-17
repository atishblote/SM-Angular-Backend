import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { GlobalService } from '../../shared/global.service';
import { ToastrService } from 'ngx-toastr';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-update-one',
  standalone: true,
  providers: [
    DatePipe, // Add DatePipe to the providers array
  ],
  imports: [
    NgSwitch,
    NgSwitchCase,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIcon,
    FormsModule,
  ],
  templateUrl: './update-one.component.html',
  styleUrl: './update-one.component.scss',
})
export class UpdateOneComponent implements OnInit {
  title: string = '';
  token: any;
  id: any;
  dataGet: any;
  selectedValue: any;
  paramsValue: any;
  regularBazaarData: any;
  value: any;
  path: any;
  hide = true;
  titleName: any;
  openTime: any;
  closeTime: any;
  isHilighted: any;
  bazaarFormData: any;

  fullName: any = '1';
  email: any = '1';
  password: any = '1';
  phone: any = '1';
  permission: any = 'un-assign';
  userActive: any = '1';

  hourInterval: any;
  myGroup: any;
  isActive: any;
  selected: any;
  daysSelecte: [] = [];
  checkPage: any;
  daysList: string[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  isHighilited: Food[] = [
    { value: 'no', viewValue: 'No' },
    { value: 'yes', viewValue: 'Yes' },
  ];

  constructor(
    private router: ActivatedRoute,
    private global: GlobalService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.token = this.global.getToken();
    this.router.queryParams.subscribe((param: any) => {
      this.checkPage = param.name;
      this.title = this.checkPage;
      this.value = this.checkPage;
      this.id = param.id;
      console.log(this.id);
      if (this.checkPage == 'users') {
        this.getUserData(param);
      }
      if (this.checkPage == 'regular-bazaar') {
        this.getRegularData(param);
      }
      if (this.checkPage == 'starline-bazaar') {
        this.getStartlineData(param);
      }
      if (this.checkPage == 'king-bazaar') {
        this.getKingData(param);
      }
    });
  }

  getRegularData(param: any) {
    const url = `${param.path}/${param.id}`;
    this.global.getWithToken(url, this.token).subscribe({
      next: (res: any) => {
        this.dataGet = res.data;
        console.log(this.dataGet);
        this.titleName = this.dataGet.name;
        this.openTime = this.dataGet.open_time;
        this.closeTime = this.dataGet.close_time;
        this.daysSelecte = this.dataGet.day_of_week.split(',');
        const views = this.dataGet.is_highlighted;
        if (views) {
          this.selected = 'yes';
        } else {
          this.selected = 'no';
        }
        const views2 = this.dataGet.is_active;
        if (views2) {
          this.isActive = 'yes';
        } else {
          this.isActive = 'no';
        }
      },
    });
  }

  getUserData(params: any) {
    const url = `${params.path}/${params.id}`;
    console.log(url);
    this.global.getWithToken(url, this.token).subscribe({
      next: (res: any) => {
        console.log(res.data);
        const userData = res.data;
        this.fullName = userData.full_name;
        this.email = userData.email;
        this.password = userData.password;
        this.phone = userData.phone;
        this.permission = userData.role;
        this.userActive = `${userData.is_active}`;
      },
    });
  }

  getStartlineData(param: any) {
    const url = `${param.path}/${param.id}`;
    console.log(url);
    this.global.getWithToken(url, this.token).subscribe({
      next: (res: any) => {
        this.dataGet = res.data;
        console.log(this.dataGet);
        this.titleName = this.dataGet.name;
        this.openTime = this.dataGet.open_time;
        this.closeTime = this.dataGet.close_time;
        this.hourInterval = this.dataGet.time_interval;

        const views2 = this.dataGet.is_active;
        if (views2) {
          this.isActive = 'yes';
        } else {
          this.isActive = 'no';
        }
        console.log(views2);
        console.log(this.isActive);
      },
    });
  }

  getKingData(param: any) {
    const url = `${param.path}/${param.id}`;
    console.log(url);
    this.global.getWithToken(url, this.token).subscribe({
      next: (res: any) => {
        this.dataGet = res.data;
        console.log(this.dataGet);
        this.titleName = this.dataGet.name;
        this.openTime = this.dataGet.open_time;
        this.closeTime = this.dataGet.close_time;

        const views2 = this.dataGet.is_active;
        if (views2) {
          this.isActive = 'yes';
        } else {
          this.isActive = 'no';
        }
        console.log(views2);
        console.log(this.isActive);
      },
    });
  }

  // sumit bazaar
  submitUpdateBazaar(value: any) {
    console.log(value);
  }

  convertTimeTo12hr(time24hr: string): string {
    const date = new Date();
    const [hours, minutes] = time24hr.split(':').map(Number);
    date.setHours(hours);
    date.setMinutes(minutes);

    return this.datePipe.transform(date, 'hh:mm a') || '';
  }

  // set time
  setTimeFunc(value: any, option: any) {
    console.log(value);
    if (option == 'open') {
      this.openTime = this.convertTimeTo12hr(value);
    } else {
      this.closeTime = this.convertTimeTo12hr(value);
    }
  }

  // regular data submit
  regularBazaarDataFunc(name: any): void {
    const is_highlighted = this.selected == 'yes' ? 1 : 0;
    const is_active = this.isActive == 'yes' ? 1 : 0;
    const data = {
      id: this.id,
      name: name,
      open_time: this.openTime,
      close_time: this.closeTime,
      is_highlighted: is_highlighted,
      day_of_week: this.daysSelecte,
      is_active: is_active,
    };
    console.log(name);
    console.log(data);
    if (
      data.id == '' &&
      data.name == '' &&
      data.open_time == '' &&
      data.close_time == '' &&
      data.day_of_week.length > 0
    ) {
      this.toastr.warning('Fill all the fields', 'WARN');
    } else {
      this.global.updateWithToken(data, 'bazaar/update', this.token).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'SUCCESS');
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'ERROR');
        },
      });
    }
  }

  //user update
  userDataFunc(name: any, phone: any, role: any, isactive: any) {
    const data = {
      id: this.id,
      full_name: name,
      role: role,
      updated_at: new Date(),
      phone: phone,
      is_active: isactive,
    };
    this.global.updateWithToken(data, 'user/update', this.token).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message, 'SUCCESS');
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'ERROR');
      },
    });
  }

  starlineDataFunc(data: any) {
    const is_active = this.isActive == 'yes' ? '1' : '0';
    const currentDate = new Date();

    const dataStarline = {
      id: this.id,
      name: data,
      open_time: this.openTime,
      close_time: this.closeTime,
      time_interval: this.hourInterval,
      is_active: is_active,
      updated_at: currentDate,
    };
    console.log(dataStarline);
    this.global
      .updateWithToken(dataStarline, 'starline', this.token)
      .subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'SUCCESS');
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'ERROR');
        },
      });
  }


  kingDataFunc(data: any) {
    const is_active = this.isActive == 'yes' ? '1' : '0';
    const currentDate = new Date();
    if(data != "" ){
      const dataKing = {
        id: this.id,
        name: data,
        open_time: this.openTime,
        close_time: this.closeTime,
        is_active: is_active,
        updated_at: currentDate,
      };
      console.log(dataKing);
      this.global
        .updateWithToken(dataKing, 'king', this.token)
        .subscribe({
          next: (res: any) => {
            this.toastr.success(res.message, 'SUCCESS');
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'ERROR');
          },
        });
    }else{
      this.toastr.warning("Fill all", "EMPTY")
    }
    
  }

}
