import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-districtadmin-menu',
  templateUrl: './districtadmin-menu.component.html',
  styleUrls: ['./districtadmin-menu.component.scss']
})
export class DistrictadminMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  toggle:any=false;
  menuitem:any=false;

  clickEvent(event:any){
    //if you just want to toggle the class; change toggle variable.
    this.toggle = !this.toggle;       
 }

}
