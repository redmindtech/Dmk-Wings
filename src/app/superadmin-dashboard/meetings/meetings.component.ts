import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiServiceService } from 'src/app/_service/api-service.service';


@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  MeetingOptions:any;
  participantsptions:any;
  districts:any=['Salem','Karur','Namakkal','Trichy'];
  createmeetingform !:FormGroup;
  constituencies!:any;



  constructor(private fb: FormBuilder,private dataService: ApiServiceService,private router:Router) { 
    this.createmeetingform= this.fb.group({
      meeting_name: ['',Validators.required],
      meeting_date:['',Validators.required],
      meeting_time:['',Validators.required],
      participants:['',Validators.required],
      meeting_type:['',Validators.required],
      comments:[''],
      meeting_location:['',Validators.required],
   district:['',[Validators.required]]
       
    });
  }
  

  ngOnInit():void{
    
  }
  postdata(angForm1 : any) //angForm1
    {
       console.log(angForm1);
        if( angForm1.status="valid" )
        {
          console.log(angForm1.value.comments);
          console.log(angForm1.value.district);

            this.dataService.create_meeting(angForm1.value.meeting_name,angForm1.value.meeting_date,
              angForm1.value.meeting_time,angForm1.value.participants,
              angForm1.value.meeting_type,angForm1.value.comments, 
              angForm1.value.meeting_location, angForm1.value.district)
            .pipe(first())
            .subscribe(
            data => {
                alert("Meeting has been created successfully!")
           
            this.router.navigate(['superadmin/Meetings']);
             angForm1.reset();
            },

            error => {
                console.log(error);
            });
        }
        else{
            alert("Please enter the valid details");
        }
    }

  radiobutton(option:any){
    this.MeetingOptions=option;
    console.log(this.MeetingOptions);
  }
  Participants(a:any){
    this.participantsptions=a;
  }

}
