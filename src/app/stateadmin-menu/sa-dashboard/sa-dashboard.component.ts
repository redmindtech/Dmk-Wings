import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sa-dashboard',
  templateUrl: './sa-dashboard.component.html',
  styleUrls: ['./sa-dashboard.component.scss']
})
export class SADashboardComponent implements OnInit {

  public chart: any;
  

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }
  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ["Hosur", "Salem", "Trichy", "Madurai", "Kanchipuram", "Chennai"], 
	       datasets: [
          {
            label: "Applicants",
            backgroundColor: "#4e73df",
            hoverBackgroundColor: "#2e59d9",
            borderColor: "#4e73df",
            data: ['154',' 255', '300','355', '500','780'],
            
          },
        ]
      },
      options: {
        aspectRatio:2.0,
        
      }
      
    });

  }

}
