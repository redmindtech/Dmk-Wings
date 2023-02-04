import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stateadmin-menu',
  templateUrl: './stateadmin-menu.component.html',
  styleUrls: ['./stateadmin-menu.component.scss']
})
export class StateadminMenuComponent implements OnInit {

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
