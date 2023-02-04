import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiServiceService } from 'src/app/_service/api-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chart: any;
  

  constructor(public ApiService:ApiServiceService) { }

  ngOnInit(): void {
    //get data when login completed
    this.ApiService.viewtableSA();
    this.ApiService.viewtableDA();
    this.ApiService.viewtableOB();
    this.ApiService.viewtableOBapprove();
    // this.createChart();
    // this.ApiService.viewtableSA();
  }
  // createChart(){
  //   this.chart = new Chart("MyChart", {
  //     type: 'bar', //this denotes tha type of chart

  //     data: {// values on X-Axis
  //       labels: ["Hosur", "Salem", "Trichy", "Madurai", "Kanchipuram", "Chennai"], 
	//        datasets: [
  //         {
  //           label: "Applicants",
  //           backgroundColor: "#4e73df",
  //           hoverBackgroundColor: "#2e59d9",
  //           borderColor: "#4e73df",
  //           data: ['154',' 255', '300','355', '500','780'],
            
  //         },
  //       ]
  //     },
  //     options: {
  //       aspectRatio:2.0,
        
  //     }
      
  //   });

  // }

  

}
