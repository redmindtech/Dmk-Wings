import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-sa-dashboard',
  templateUrl: './sa-dashboard.component.html',
  styleUrls: ['./sa-dashboard.component.scss']
})
export class SADashboardComponent implements OnInit {
  chart: Chart<"bar", string[], string>;

  
  ngOnInit(): void {
    this.createChart();
    this.piechart()
    
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

    piechart(){
      // this.chart = new Chart('canvas', {
      //   type: 'pie',
      //   data: {
      //     labels: ['A', 'B', 'C'],
      //     datasets: [
      //       {
      //         data: [10, 20, 30],
      //         backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
      //       }
      //     ]
      //   },
      //   options: {
      //     responsive: true,
      //     maintainAspectRatio: false
      //   }
      // });

      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: ["Hosur", "Salem", "Trichy", "Madurai", "Kanchipuram", "Chennai"],
          datasets: [
            { label: "slices",
              data: [10, 20, 30,23,40,80],
              backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              formatter: (value, ctx) => {
                return ctx.chart.data.labels[ctx.dataIndex] + ': ' + value;
              },
              color: 'white'
            }
          }
        },
        
        //plugins: [pluginDataLabels]
      });
      
    }
}