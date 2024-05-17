import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/global.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIcon,MatButton, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  title: string = 'All Users';
  id:any
  name:any
  userData:any
  hide = true;
  token:any
  userForm:any
  constructor(private router:ActivatedRoute, private navraouter:Router, private global:GlobalService, private toastr: ToastrService, private fb: FormBuilder ){

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = params.get('id');
      // console.log(this.id)
      
    });
    this.token =this.global.getToken()
    this.router.queryParams.subscribe((params:any)=>{
      this.name = params.name
      console.log( this.name)

    })

    this.userForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[@])(?=.*[0-9]).{4,}$'),
        ]
      ],
      updated_at: [new Date()]
    })

  }

  updatePassFun(value:any){
    console.log(value)
    if (this.userForm.invalid) {
      this.toastr.warning('Fill all fields', 'Warning');
    } else {
      this.global.updateWithToken(value, `user/reset/${this.id}`, this.token).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'SUCCESS');
          this.userForm.reset()
          this.navraouter.navigate(['/bk/users'])
        },
        error: (err: any) => {
          this.toastr.error(err.error.message, 'ERROR');
        },
      });
    }
  }

}
