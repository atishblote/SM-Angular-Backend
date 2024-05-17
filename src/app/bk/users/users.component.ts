import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControlName,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AnimationPopupComponent } from '../animation-popup/animation-popup.component';
import { GlobalService } from '../../shared/global.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatSelectModule,
    MatIcon,
    RouterLink,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  animal: string = 'none';
  name: string = 'King Bazar';
  title: string = 'All Users';
  selectedValue: any;
  selectedTabIndex: any;
  hide = true;
  allUsers: any;
  createUserForm: any;
  is_activeUser: any;
  isRole:any
  token:any

  constructor(
    public dialog: MatDialog,
    private global: GlobalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.isRole = this.global.getUserData()
    this.createUserForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[@])(?=.*[0-9]).{4,}$'),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      is_active: ['', [Validators.required]],
      role: ['', [Validators.required]],
      updated_at: [new Date()],
    });
  }

  // email = new FormControl('', [Validators.required, Validators.email]);

  // getErrorMessage() {
  //   if (this.createUserForm.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.createUserForm.email.hasError('email') ? 'Not a valid email' : '';
  // }

  ngOnInit(): void {
    this.token =  this.global.getToken()
    this.getAllUser();
  }
  getAllUser() {
    this.global.getWithToken('user',this.token).subscribe({
      next: (res: any) => {
        this.allUsers = res.data;
        console.log(this.allUsers);
      },
      error: (err) => {
        console.log(err.error.message);
        if(err.error.message == 'Session Expired'){
          alert(err.error.message)
          this.router.navigate(['login'])
          sessionStorage.clear()
        }
      },
    });
  }

  openTab(value: any) {}

  openDialog(id:any): void {
    const dialogRef = this.dialog.open(AnimationPopupComponent, {
      data: { bazaar_id:"" , panel_id: id, path: "user" }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.getAllUser();
      this.animal = result;
    });
  }

  createUserFunc(value: any) {
    this.is_activeUser =  value.is_active == 'yes' ? 1 : 0;

    const data = {
      full_name: value.full_name,
      email: value.email,
      password: value.password,
      phone: value.phone,
      is_active: this.is_activeUser,
      role: value.role,
      updated_at: value.updated_at,
    };
    console.log(value);
    if (this.createUserForm.invalid) {
      this.toastr.warning('Fill all fields', 'Warning');
    } else {
      this.global.postWithToken(data, 'user/create', '123135').subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'SUCCESS');
          this.getAllUser();

          this.selectedTabIndex = 0;
          this.createUserForm.reset()
        },
        error: (err: any) => {
          this.toastr.error(err.error.message, 'ERROR');
        },
      });
    }
  }
}
