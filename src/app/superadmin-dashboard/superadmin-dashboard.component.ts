import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  //styleUrls: ['./superadmin-dashboard.component.scss']
})
export class SuperadminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //$.widget.bridge('uibutton', $.ui.button);
  }

  toggle:any=false;
  menuitem:any=false;

  clickEvent(event:any){
    //if you just want to toggle the class; change toggle variable.
    this.toggle = !this.toggle;       
 }
  
}
