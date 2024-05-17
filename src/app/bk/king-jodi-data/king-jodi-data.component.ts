import { Component } from '@angular/core';

@Component({
  selector: 'app-king-jodi-data',
  standalone: true,
  imports: [],
  templateUrl: './king-jodi-data.component.html',
  styleUrl: './king-jodi-data.component.scss'
})
export class KingJodiDataComponent {
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  daysInMonth: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  yearData: any = {}; // Assuming you have data for the entire year
  data = [
    {
        "id": 15,
        "starline_id": 3,
        "date": "01/04/2024",
        "time": "12:00 PM",
        "open": "454",
        "jodi": "12",
        "is_active": 1,
        "created_at": "2024-04-07T15:04:14.334Z",
        "updated_at": "2024-04-07T15:04:14.334Z",
        "date_index": "2"
    },
    {
        "id": 16,
        "starline_id": 3,
        "date": "01/04/2024",
        "time": "01:00 PM",
        "open": "546",
        "jodi": "01",
        "is_active": 1,
        "created_at": "2024-04-07T15:04:34.099Z",
        "updated_at": "2024-04-07T15:04:34.099Z",
        "date_index": "3"
    },
    {
        "id": 17,
        "starline_id": 3,
        "date": "01/04/2024",
        "time": "03:00 PM",
        "open": "866",
        "jodi": "03",
        "is_active": 1,
        "created_at": "2024-04-07T15:07:19.737Z",
        "updated_at": "2024-04-07T09:43:43.221Z",
        "date_index": "5"
    },
    {
        "id": 18,
        "starline_id": 3,
        "date": "01/04/2024",
        "time": "04:00 PM",
        "open": "878",
        "jodi": "04",
        "is_active": 1,
        "created_at": "2024-04-07T15:09:21.587Z",
        "updated_at": "2024-04-07T15:09:21.587Z",
        "date_index": "6"
    },
    {
        "id": 19,
        "starline_id": 3,
        "date": "01/04/2024",
        "time": "05:00 PM",
        "open": "488",
        "jodi": "05",
        "is_active": 1,
        "created_at": "2024-04-07T15:09:42.159Z",
        "updated_at": "2024-04-07T15:09:42.159Z",
        "date_index": "7"
    },
    {
        "id": 23,
        "starline_id": 3,
        "date": "02/04/2024",
        "time": "10:00 AM",
        "open": "455",
        "jodi": "10",
        "is_active": 1,
        "created_at": "2024-04-07T17:48:37.545Z",
        "updated_at": "2024-04-07T17:48:37.545Z",
        "date_index": "0"
    },
    {
        "id": 24,
        "starline_id": 3,
        "date": "02/04/2024",
        "time": "11:00 AM",
        "open": "112",
        "jodi": "11",
        "is_active": 1,
        "created_at": "2024-04-07T17:48:59.735Z",
        "updated_at": "2024-04-07T17:48:59.735Z",
        "date_index": "1"
    },
    {
        "id": 25,
        "starline_id": 3,
        "date": "02/04/2024",
        "time": "12:00 PM",
        "open": "445",
        "jodi": "12",
        "is_active": 1,
        "created_at": "2024-04-08T16:43:12.104Z",
        "updated_at": "2024-04-08T16:43:12.104Z",
        "date_index": "2"
    },
    {
        "id": 26,
        "starline_id": 3,
        "date": "03/04/2024",
        "time": "10:00 AM",
        "open": "445",
        "jodi": "10",
        "is_active": 1,
        "created_at": "2024-04-08T16:43:30.954Z",
        "updated_at": "2024-04-08T16:43:30.954Z",
        "date_index": "0"
    },
    {
        "id": 27,
        "starline_id": 3,
        "date": "03/04/2024",
        "time": "11:00 AM",
        "open": "454",
        "jodi": "11",
        "is_active": 1,
        "created_at": "2024-04-08T16:43:52.825Z",
        "updated_at": "2024-04-08T16:43:52.825Z",
        "date_index": "1"
    },
    {
        "id": 28,
        "starline_id": 3,
        "date": "04/04/2024",
        "time": "10:00 AM",
        "open": "455",
        "jodi": "10",
        "is_active": 1,
        "created_at": "2024-04-08T16:44:15.302Z",
        "updated_at": "2024-04-08T16:44:15.302Z",
        "date_index": "0"
    },
    {
        "id": 29,
        "starline_id": 3,
        "date": "05/04/2024",
        "time": "10:00 AM",
        "open": "454",
        "jodi": "10",
        "is_active": 1,
        "created_at": "2024-04-08T16:44:32.248Z",
        "updated_at": "2024-04-08T16:44:32.248Z",
        "date_index": "0"
    },
    {
        "id": 30,
        "starline_id": 3,
        "date": "06/04/2024",
        "time": "10:00 AM",
        "open": "545",
        "jodi": "10",
        "is_active": 1,
        "created_at": "2024-04-08T16:44:46.953Z",
        "updated_at": "2024-04-08T16:44:46.953Z",
        "date_index": "0"
    },
    {
        "id": 42,
        "starline_id": 3,
        "date": "23/04/2024",
        "time": "10:00 AM",
        "open": "452",
        "jodi": "10",
        "is_active": 1,
        "created_at": "2024-04-22T18:40:40.839Z",
        "updated_at": "2024-04-22T18:40:40.839Z",
        "date_index": "0"
    },
    {
        "id": 43,
        "starline_id": 3,
        "date": "01/04/2024",
        "time": "10:00 AM",
        "open": "788",
        "jodi": "10",
        "is_active": 1,
        "created_at": "2024-04-22T18:42:03.203Z",
        "updated_at": "2024-04-23T13:20:53.875Z",
        "date_index": "0"
    },
    {
        "id": 44,
        "starline_id": 3,
        "date": "23/04/2024",
        "time": "11:00 AM",
        "open": "454",
        "jodi": "11",
        "is_active": 1,
        "created_at": "2024-04-22T18:43:02.796Z",
        "updated_at": "2024-04-22T18:43:02.796Z",
        "date_index": "1"
    },
    {
        "id": 45,
        "starline_id": 3,
        "date": "23/04/2024",
        "time": "11:00 AM",
        "open": "112",
        "jodi": "11",
        "is_active": 1,
        "created_at": "2024-04-23T18:06:12.412Z",
        "updated_at": "2024-04-23T18:06:12.412Z",
        "date_index": "1"
    },
    {
        "id": 46,
        "starline_id": 3,
        "date": "23/04/2024",
        "time": "11:00 AM",
        "open": "545",
        "jodi": "11",
        "is_active": 0,
        "created_at": "2024-04-23T18:09:09.078Z",
        "updated_at": "2024-04-23T18:09:09.078Z",
        "date_index": "1"
    },
    {
        "id": 47,
        "starline_id": 3,
        "date": "23/04/2024",
        "time": "11:00 AM",
        "open": "784",
        "jodi": "11",
        "is_active": 1,
        "created_at": "2024-04-23T18:13:47.373Z",
        "updated_at": "2024-04-23T18:13:47.373Z",
        "date_index": "1"
    },
    {
        "id": 48,
        "starline_id": 3,
        "date": "23/04/2024",
        "time": "06:00 PM",
        "open": "456",
        "jodi": "06",
        "is_active": 1,
        "created_at": "2024-04-23T18:14:39.273Z",
        "updated_at": "2024-04-23T18:14:39.273Z",
        "date_index": "8"
    },
    {
        "id": 52,
        "starline_id": 3,
        "date": "01/04/2024",
        "time": "06:00 PM",
        "open": "123",
        "jodi": "06",
        "is_active": 1,
        "created_at": "2024-04-23T19:03:19.801Z",
        "updated_at": "2024-04-23T19:03:19.801Z",
        "date_index": "8"
    },
    {
        "id": 53,
        "starline_id": 3,
        "date": "01/04/2024",
        "time": "07:00 PM",
        "open": "656",
        "jodi": "07",
        "is_active": 1,
        "created_at": "2024-04-23T19:04:57.394Z",
        "updated_at": "2024-04-23T19:04:57.394Z",
        "date_index": "9"
    },
    {
        "id": 54,
        "starline_id": 3,
        "date": "01/04/2024",
        "time": "11:00 AM",
        "open": "545",
        "jodi": "11",
        "is_active": 1,
        "created_at": "2024-04-23T19:07:07.379Z",
        "updated_at": "2024-04-23T19:07:07.379Z",
        "date_index": "1"
    },
    {
        "id": 55,
        "starline_id": 3,
        "date": "01/04/2024",
        "time": "02:00 PM",
        "open": "445",
        "jodi": "02",
        "is_active": 1,
        "created_at": "2024-04-23T19:07:59.582Z",
        "updated_at": "2024-04-23T19:07:59.582Z",
        "date_index": "4"
    },
    {
        "id": 56,
        "starline_id": 3,
        "date": "02/04/2024",
        "time": "01:00 PM",
        "open": "554",
        "jodi": "01",
        "is_active": 1,
        "created_at": "2024-04-23T19:12:13.746Z",
        "updated_at": "2024-04-23T19:12:13.746Z",
        "date_index": "3"
    }
]


  currentMonthData: any[] = [];
  currentDateEntries: any[] = [];

  constructor() {
    this.generateYearData(); // Generate sample year data (replace this with your actual data)
    console.log(this.yearData)
  }


  generateYearData() {
    for (let entry of this.data) {
      const dateParts = entry.date.split('/');
      const month = dateParts[1];
      const day = dateParts[0];
  
      if (!this.yearData[month]) {
        this.yearData[month] = {};
      }
  
      this.yearData[month][day] = {
        open: entry.open,
        jodi: entry.jodi,
        isActive: entry.is_active,
        createdAt: entry.created_at,
        date: entry.date,
      };
    }
  }
  

  getDataForDayAndMonth(day: number, month: any): any {
    // console.log(this.yearData)
    // console.log(month)
    // console.log(month)

    const monthIndex = this.months.indexOf(month);
    const date = new Date(2024, monthIndex, day);
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    console.log(formattedDate); // Output: "01/24/2024"
    
   const checkDate =  this.data.filter((da:any)=>{
      return formattedDate == da.date
    })
    console.log(checkDate)
    return `${checkDate[0]?.jodi} - ${checkDate[0]?.open}`

  }
  




}
