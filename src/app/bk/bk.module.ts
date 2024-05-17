import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BkRoutingModule } from './bk-routing.module';
import {  RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BkRoutingModule,
    HttpClientModule,
    RouterModule

  ]
})
export class BkModule { }
