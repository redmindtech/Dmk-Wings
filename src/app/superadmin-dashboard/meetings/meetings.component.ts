import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  MeetingOptions:any;
  participantsptions:any;
  districts:any=['Salem','Karur','Namakkal','Trichy'];


  constructor() { }
  

  ngOnInit():void{
    
  }
  radiobutton(option:any){
    this.MeetingOptions=option;
    console.log(this.MeetingOptions);
  }
  Participants(a:any){
    this.participantsptions=a;
  }

}
