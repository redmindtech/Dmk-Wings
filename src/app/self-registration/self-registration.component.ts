import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.scss']
})
export class SelfRegistrationComponent implements OnInit {
  selfregistration: any;
  mydist:any;
  angForm :FormGroup;

  constructor(public ApiService:ApiServiceService,
    private fb: FormBuilder, private router:Router) { 
      this.mydist = this.ApiService.mydist;

        this.angForm = this.fb.group({ //angForm
            email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            firstname:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
            lastname:['',[Validators.required,Validators.pattern('[A-Za-z]{1,32}')]],
            father_name:['',[Validators.required,Validators.pattern('[A-Za-z]{1,32}')]],
            //parent_number:['',Validators.required],
            district:['',Validators.required],
            contact_no:['',[Validators.required,Validators.pattern('[789][0-9]{9}')]],
            date_of_birth:[''],
            educational_qualification:[''],
            profession:[''],
            location_id:['1',Validators.required]
            });

    }

  ngOnInit(): void {
  }

  postdata(angForm1 : any) //angForm1
  {
      console.log(angForm1);
      //if(this.angForm.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null)
      if(1>0)
      {
          this.ApiService.userregistration(angForm1.value.email,angForm1.value.firstname,angForm1.value.lastname,angForm1.value.father_name,angForm1.value.district,angForm1.value.contact_no,angForm1.value.date_of_birth,angForm1.value.educational_qualification,angForm1.value.profession,angForm1.value.location_id)
          .subscribe(
          data => {
              alert("Self registration is completed successfully!")
          this.router.navigate(['']);
          },
      
          error => {
              console.log(error);
          });
      }
      else{
          alert("Please enter the valid data")
      }
  }
}
