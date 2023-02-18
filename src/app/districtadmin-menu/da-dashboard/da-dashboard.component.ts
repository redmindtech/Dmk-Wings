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
  regob:any
  piechartdata: any;
  dashboardcarddata: any;
  appob: any;
  activeob: any;
  districtname: any;
  // ApiServiceService: any;


  constructor(public ApiService:ApiServiceService) { }

   ngOnInit(): void {
 this.districtname=JSON.parse(localStorage.getItem('user_district'));

    this.ApiService.piedatada(this.districtname).subscribe((data:any) => {
     this.barchat=data;

       this.createChart(this.barchat);

       ;})
       this.ApiService.chartdatada(this.districtname).subscribe((piedate:any) => {
        
       this.piechartdata=piedate;
         this.piechart(this.piechartdata);

         ;})
         this.ApiService.dashboardcardda(this.districtname).subscribe((cardata:any) => {
          // console.log('card');
         this.dashboardcarddata=cardata;        
         let obj= this.dashboardcarddata;
       this.regob=obj.REGOB;
       this.appob=obj.APPOB;
       this.activeob=obj.ACTIVEOB;

           ;})


  }
    createChart(data){

      const barchatgraph = data;

            const months = [];
        const counts = [];

        for (let i = 0; i < barchatgraph.length; i++) {
          months.push(barchatgraph[i].month);
          counts.push(barchatgraph[i].count);
        }


      this.chart = new Chart("MyChart", {

        type: 'bar', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: months ,
          // backgroundColor: ["#800080","#7FFF00","#FF1493","#00FFFF","#DC143C","#FFFF00"],
          datasets: [
            {                  //
                  // labels: months,
                  label:'Number of engineeers joined' ,
              backgroundColor: ["#800080","#7FFF00","#FF1493","#00FFFF","#DC143C","#FFFF00"],
              // hoverBackgroundColor: "#2e59d9",
              // borderColor: ["#4e73df"],
              data:counts,

            },
          ]
        },
        options: {
          aspectRatio:2.0,

        }

      });

    }
    piechart(data){

let values = [];
      let keys = Object.keys(data);
      for (let key in data) {
        values.push(data[key]);
      }
      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          // labels: ["Hosur", "Salem", "Trichy", "Madurai", "Kanchipuram", "Chennai"],
          labels:keys,
          datasets: [
            {
               label: "Number of engineers",
              data:values,
              backgroundColor: ['#3B55E6', '#EB4E36', '#43D29E', '#32CBD8', '#E8C63B', '#28C63B',]
            }
          ]
        },
        options: {
          // responsive: true,
          // maintainAspectRatio: false,
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
      //   // plugins: [pluginDataLabels]
       });

    }
  }