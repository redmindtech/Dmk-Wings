import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';



@Component({
  selector: 'app-create-meetings',
  templateUrl: './create-meetings.component.html',
  styleUrls: ['./create-meetings.component.scss']
})
export class CreateMeetingsComponent implements OnInit {
  MeetingOptions:any;
  participantsptions:any;
  // districts:any=['Salem','Karur','Namakkal','Trichy'];
  createmeetingform !:FormGroup;
  constituencies!:any;
  meeting_name: any;
  meeting_time: any;
  meeting_date: any;
  participants: any;
  meeting_type: any;
  meeting_location: any;
  hidden:boolean=true;
  dropdownList : string[]= [];
  dropdownSettings:IDropdownSettings={};
 
  selectedItems = [];
  
  dropDownForm: FormGroup;

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onItemDeSelect(item: any) {
      console.log('onItemDeSelect', item);
  }
  onSelectAll(items: any) {
      console.log('onSelectAll', items);
  }
  onUnSelectAll() {
      console.log('onUnSelectAll fires');
  }


  constructor(private fb: FormBuilder,private ApiService: ApiServiceService,private router:Router) {
    this.createmeetingform= this.fb.group({
      meeting_name: ['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      meeting_date:['',Validators.required ],
      meeting_time:['',Validators.required],
      participants:['',Validators.required],
      meeting_type:['',Validators.required],
      comments:[''],
      meeting_location:['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      meeting_district:['']

    });
  }


  dtOptions: DataTables.Settings = {};

  ngOnInit():void{
    this.ApiService.viewtablemeeting().subscribe((data:any) => {
      let obj= data;
      this.customers=obj.data;
      //console.log(obj.data.length);
      ;})

    // this.getdata();
    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableOBapprove();
    // this.ApiService.viewtablemeeting();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    const all_districts = this.ApiService.meeting_districts;
    this.dropdownList = all_districts;
  
   
    this.selectedItems = [
      { }
    ];
    this.dropDownForm = this.fb.group({
      meeting_district: [this.selectedItems]
  });

  }

  customers:any=[];
  getdata(){
    this.customers=[];
        for(const prop in this.ApiService.tabledatameeting) {
            this.customers.push(this.ApiService.tabledatameeting[prop])
          }
          this.customers.pop();
    //console.log(this.ApiService.tabledataDA)
    //this.ApiService.viewtableOB();

  }

  postdata(angForm1 : any) //angForm1
    {
        console.log(this.createmeetingform.status,
          angForm1.status,
          angForm1.value.meeting_name,
          angForm1.value.meeting_date,
       );
        if(angForm1.status == "VALID" &&  angForm1.value.meeting_name!=null  && angForm1.value.meeting_date !=null  && angForm1.value.meeting_time!=null && angForm1.value.participants !=null &&  angForm1.value.meeting_location !=null &&  angForm1.value.meeting_district !=null)
        {


            this.ApiService.create_meeting(angForm1.value.meeting_name,angForm1.value.meeting_date,
              angForm1.value.meeting_time,angForm1.value.participants,
              angForm1.value.meeting_type,
              angForm1.value.meeting_location,angForm1.value.comments, angForm1.value.meeting_district.toString())
            .pipe(first())
            .subscribe(
            data => {
                 window.location.reload();
                 alert("Meeting has been created successfully!")

            //this.router.navigate(['superadmin/Meetings']);
             angForm1.reset();
            },

            error => {
                console.log(error);
            });
         }
        else{
            this.hidden=false;
        }
    }
    delete_CM(id : any){
      console.log(id)
      if(confirm("Are you sure want to cancel this meeting ?")) {
        console.log("Implement delete functionality here");
          this.ApiService.deletemeeting(id)
          .pipe()
          .subscribe(
          data => {
              window.location.reload();
              alert("Meeting has been canceled!")
          },

          error => {
              console.log(error);
          });

  }
}

    

  radiobutton(option:any){
    this.MeetingOptions=option;
    // console.log(this.MeetingOptions);
  }
  Participants(a:any){
    this.participantsptions=a;
  }
  CM_name:any;
  CM_meeting_location:any;
  CM_date:any;
  CM_time:any;
  CM_meeting_type:any;
  CM_comments:any;
  CM_participants:any;
  CM_constituency:any;


  buttonviewmeeting(a:any){
    console.log(a)

console.log(a.date)

      
          this.CM_name=a.meeting_name;
          this.CM_meeting_location=a.meeting_location;
          this.CM_date=a.date;
          this.CM_time=a.time;
          this.CM_meeting_type=a.meeting_type;
          this.CM_comments=a.comments;
          this.CM_participants=a.participants;
          this.CM_constituency=a.constituency;
          console.log(this.CM_name)
          }

}


