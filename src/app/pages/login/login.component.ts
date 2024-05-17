import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../shared/global.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm:any
  isLogin:boolean = true
  loaded:boolean = false

  constructor(private formBuilder: FormBuilder, private global: GlobalService ,private router: Router, private toastr: ToastrService, @Inject(PLATFORM_ID) private platformId: Object){
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
    this.loginForm = this.formBuilder.group({
      email: ['atish@gmail.com', [Validators.required, Validators.email]],
      password: ['******', Validators.required]
    });
    // sessionStorage.setItem('token',"undefined")

  }
  ngOnInit(): void {
  }

  onSubmit(value:any){
    this.loaded = true
    console.log(value)
    if(this.loginForm.invalid){
      this.toastr.warning("Fill all the fields", 'Warning');
    }else{
      this.global.postWithoutToken(value,"user/login").subscribe({
        next:(res:any)=>{
          if(res.code){
            this.toastr.success(res.message,"Success")
            console.log(res)
            this.global.setToken(res.token)
            this.global.storeUserData(res.data); 
            this.router.navigate(['/bk'])
            this.loaded= false
          }
        },
        error: (err)=>{
          console.log(err)
          this.toastr.error(err.error.message, 'Error');
          this.loaded = false
        }
      })
    }
  }

}
