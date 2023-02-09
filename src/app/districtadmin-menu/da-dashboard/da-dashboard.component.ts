import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-da-dashboard',
  templateUrl: './da-dashboard.component.html',
  styleUrls: ['./da-dashboard.component.scss']
})
export class DaDashboardComponent implements OnInit {public chart: any;
  

  constructor() { }

  // chartOptions = {
	//   animationEnabled: true,
	//   theme: "dark2",
	//   title:{
	// 	text: "Social Media Engagement"
	//   },
	//   data: [{
	// 	type: "pie",
	// 	startAngle: 45,
	// 	indexLabel: "{name}: {y}",
	// 	indexLabelPlacement: "inside",
	// 	yValueFormatString: "#,###.##'%'",
	// 	dataPoints: [
	// 	  { y: 21.3, name: "Facebook" },
	// 	  { y: 27.7, name: "Instagram" },
	// 	  { y: 17, name: "Twitter" },
	// 	  { y: 14.9, name: "LinkedIn" },
	// 	  { y: 10.6, name: "Pinterest" },
	// 	  { y: 8.5, name: "Others" }
	// 	]
	//   }]
	// }

  ngOnInit(): void {
    //get data when login completed
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableOBapprove();
    this.createChart();
    this.piechart()
    // this.ApiService.viewtableSA();

    
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
