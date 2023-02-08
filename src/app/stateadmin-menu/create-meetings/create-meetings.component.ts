import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiServiceService } from 'src/app/_service/api-service.service';



@Component({
  selector: 'app-create-meetings',
  templateUrl: './create-meetings.component.html',
  styleUrls: ['./create-meetings.component.scss']
})
export class CreateMeetingsComponent implements OnInit {

  MeetingOptions:any;
  participantsptions:any;
  districts:any=['Salem','Karur','Namakkal','Trichy'];
  createmeetingform !:FormGroup;
  constituencies!:any;
  meeting_name: any;
  meeting_time: any;
  meeting_date: any;
  participants: any;
  meeting_type: any;
  meeting_location: any;



  constructor(private fb: FormBuilder,private dataService: ApiServiceService,private router:Router) { 
    this.createmeetingform= this.fb.group({
      meeting_name: ['',Validators.required],
      meeting_date:['',Validators.required ],
      meeting_time:['',Validators.required],
      participants:['',Validators.required],
      meeting_type:['',Validators.required],
      comments:[''],
      meeting_location:['',Validators.required],
   district:['']
       
    });
  }
  

  ngOnInit():void{
    
  }
  postdata(angForm1 : any) //angForm1
    {
        console.log(this.createmeetingform.status,
          angForm1.status,
          angForm1.value.meeting_name,
          angForm1.value.meeting_date,
       );
        if(angForm1.status == "VALID" &&  angForm1.value.meeting_name!=null  && angForm1.value.meeting_date !=null  && angForm1.value.meeting_time!=null && angForm1.value.participants !=null &&  angForm1.value.meeting_location !=null)
        {
          

            this.dataService.create_meeting(angForm1.value.meeting_name,angForm1.value.meeting_date,
              angForm1.value.meeting_time,angForm1.value.participants,
              angForm1.value.meeting_type, 
              angForm1.value.meeting_location,angForm1.value.comments, angForm1.value.district)
            .pipe(first())
            .subscribe(
            data => {
                 alert("Meeting has been created successfully!")
           
            this.router.navigate(['stateadmin/create-meetings']);
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
    // console.log(this.MeetingOptions);
  }
  Participants(a:any){
    this.participantsptions=a;
  }

}