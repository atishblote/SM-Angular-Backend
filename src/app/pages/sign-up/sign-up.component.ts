import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../shared/global.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatIconModule,RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{
  signUpForm:any
  idd:boolean = false
  constructor(private fb: FormBuilder, private toastr: ToastrService, private global: GlobalService){
    this.signUpForm = this.fb.group({
      full_name: ["", [ Validators.required]],
      email: ["", [ Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[@#])[a-zA-Z0-9@#]{4,12}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      is_active:  [0, Validators.required]
    })
  }

  ngOnInit(): void {
    
  }


  signUpSubmit(data:any){
    if(this.signUpForm.invalid){
      this.toastr.warning("Fill all fields", "Warning")
    }else{
      this.global.postWithoutToken(data,"user/create").subscribe({
        next: (res:any)=>{
          this.toastr.success(res.message ,"Success")
          this.signUpForm.reset()
        },
        error:(err)=> {
          this.toastr.error(err.error.message ,"Error")
        },
      })
    }

  }
}
