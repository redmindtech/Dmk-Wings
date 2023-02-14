import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiServiceService } from 'src/app/_service/api-service.service';


@Component({
  selector: 'app-sa-dashboard',
  templateUrl: './sa-dashboard.component.html',
  styleUrls: ['./sa-dashboard.component.scss']
})
export class SADashboardComponent implements OnInit {
  chart: Chart<"bar", string[], string>;
  barchat: any;

  constructor(public ApiService:ApiServiceService) { }
  ngOnInit(): void {
    // chartdatasa()
    this.ApiService.chartdatasa().subscribe((data:any) => {     
      this.barchat=data;    
      console.log(this.barchat);
        this.createChart(this.barchat);     
     
        ;})
    // this.createChart();
     this.piechart()
    
  }
    createChart(data){

      const barchatgraph = data;    
      console.log()
            const district = [];
        const counts = [];
        
        for (let i = 0; i < barchatgraph.length; i++) {
          district.push(barchatgraph[i].district);
          counts.push(barchatgraph[i].count);
        }
     
      this.chart = new Chart("MyChart", {
        type: 'bar', //this denotes tha type of chart

        data: {// values on X-Axis
          labels:district, 
          datasets: [
            {
              label: "Number of engineers in district-wise",
              backgroundColor:["#800080","#7FFF00","#FF1493","#00FFFF","#DC143C","#FFFF00","#CCFF00","#6633FF","#66FF99","#808080"],
              // hoverBackgroundColor: "#2e59d9",
              // borderColor: "#4e73df",
              data: counts,
              
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