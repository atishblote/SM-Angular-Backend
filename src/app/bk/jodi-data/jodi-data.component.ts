import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/global.service';
import { ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'app-jodi-data',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './jodi-data.component.html',
  styleUrl: './jodi-data.component.scss'
})
export class JodiDataComponent implements OnInit {
  token: any;
  id: any;
  timeBreaks:any
  openTime:any
  closeTime:any
  name:any
  starlineResData: any[] = [];
  filteredData: any[] = [];
  selectedInterval:any = "60"

  constructor(private router: ActivatedRoute, private global: GlobalService) {}

  ngOnInit(): void {
    this.router.params.subscribe((params: any) => {
      this.id = params['id'];
      this.token = this.global.getToken();
      this.getJodiData();
    });
    this.router.queryParams.subscribe((parm:any)=>{
      // console.log(parm)
      this.openTime = parm.open_time
      this.closeTime = parm.close_time
      this.name = parm.name
      this.generateTimeBreaks(this.openTime,this.closeTime)
    })
  }

  getJodiData() {
    this.global.getWithToken(`starline-jodi/jodi-data/${this.id}`, this.token).subscribe({
      next: (res: any) => {
        this.starlineResData = res.data;
        console.log(this.starlineResData);
        this.filterDataByDate();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  generateTimeBreaks(openTime:any, closeTime:any) {
    this.timeBreaks = [];
    this.timeBreaks.push(openTime);
    let startTime = new Date('1970-01-01 ' + openTime); // Set date to ensure proper comparison
    startTime.setHours(startTime.getHours() + 1); // Add 1 hour to the open time
    const endTime = new Date('1970-01-01 ' + closeTime); // Set date to ensure proper comparison

    while (startTime <= endTime) {
      this.timeBreaks.push(this.formatTime(startTime));
      startTime = new Date(startTime.getTime() + this.selectedInterval * 60000); // Increment by selected interval in milliseconds
    }
    // console.log(this.timeBreaks)

  }
  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  filterDataByDate() {
    const today = new Date();
    for (let index = 0; index < 30; index++) {
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() - index);
      const formattedDate = this.formatDate(currentDate);
      const filteredItems = this.starlineResData.filter(item => item.date === formattedDate);
      
      if (filteredItems.length > 0) {
        this.filteredData.push({
          date: formattedDate,
          jodiData: filteredItems
        });
      }
    }
    console.log(this.filteredData);
  }
  sortDataByIndex(data:any) {
    data.sort((a:any, b:any) => {
      return parseInt(a.date_index) - parseInt(b.date_index);
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  
  getValueForDay(fullDay: any, day: string) {
    // console.log(fullDay.date)
    // console.log(day)
    const dayData = fullDay.jodiData.find((item: any) =>{
       return item.date_index == day
    });
    // console.log(dayData)
    if(dayData == '' || dayData == undefined){
      return '-';
    } else {
      return `${dayData.open} - ${dayData.jodi}`;
    }
  }
}