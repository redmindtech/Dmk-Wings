import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiServiceService } from 'src/app/_service/api-service.service';
@Component({
  selector: 'app-da-dashboard',
  templateUrl: './da-dashboard.component.html',
  styleUrls: ['./da-dashboard.component.scss']
})
export class DaDashboardComponent implements OnInit {public chart: any;
  barchat: any;
  data: any;
  keyvalue:any;
  // ApiServiceService: any;
  

  constructor(public ApiService:ApiServiceService) { }

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
    
    // this.ApiService.viewtableSA();
    this.ApiService.chartdatada().subscribe((data:any) => {
console.log('hi');
     this.barchat=data;
  
      this.createChart( this.barchat);
       this.piechart();
    
       ;})
      
  

    
  }
    createChart(data){
      console.log(data);
      let values = [];
      let keys = Object.keys(data);   
      for (let key in data) {
        values.push(data[key]);
      }

      this.chart = new Chart("MyChart", {
        
        type: 'bar', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: keys, 
          // backgroundColor: ["#800080","#7FFF00","#FF1493","#00FFFF","#DC143C","#FFFF00"],
          datasets: [
            {
                  // label: values,
              backgroundColor: ["#800080","#7FFF00","#FF1493","#00FFFF","#DC143C","#FFFF00"],
              // hoverBackgroundColor: "#2e59d9",
              // borderColor: ["#4e73df"],
              data:values,
              
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

