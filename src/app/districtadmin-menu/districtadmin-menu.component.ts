import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/_service/api-service.service';

@Component({
  selector: 'app-districtadmin-menu',
  templateUrl: './districtadmin-menu.component.html',
  styleUrls: ['./districtadmin-menu.component.scss']
})
export class DistrictadminMenuComponent implements OnInit {

  constructor(public ApiService:ApiServiceService) { }

  ngOnInit(): void {
    // this.ApiService.viewtableDA()
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableOBapprove();
  }
  toggle:any=false;
  menuitem:any=false;

  clickEvent(event:any){
    //if you just want to toggle the class; change toggle variable.
    this.toggle = !this.toggle;       
 }

}
