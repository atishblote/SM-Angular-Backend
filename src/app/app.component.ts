import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'satta-matka';
  constructor(private toastr:ToastrService){
  }


  showSuccess() {
    this.toastr.success('Hello, this is a success toast!', 'Success');
  }
}
