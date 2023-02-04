import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/_service/api-service.service';

@Component({
  selector: 'app-districtadmin',
  templateUrl: './districtadmin.component.html',
  styleUrls: ['./districtadmin.component.scss']
})
export class DistrictadminComponent implements OnInit {
  customers:any=[];
  distadminform !:FormGroup;
  dtOptions: DataTables.Settings = {};
  
  constructor(public ApiService:ApiServiceService,
    private fb: FormBuilder) 
    { 
    this.distadminform = this.fb.group({ //angForm
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstname:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
      lastname:['',[Validators.required,Validators.pattern('[A-Za-z]{1,32}')]],
        district:['',Validators.required],
        designation:[''],
        party_designation:[''],
        approval_status:[''],
        location_id:['1',Validators.required]
        });
  }
   

  ngOnInit(): void {
    this.ApiService.viewtableDA();
    this.ApiService.viewtableSA();
    this.ApiService.viewtableOB();
    this.ApiService.viewtableOBapprove();
    this.getdata();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    
  }
  getdata(){
    this.customers=[];
        for(const prop in this.ApiService.tabledataDA) {
            this.customers.push(this.ApiService.tabledataDA[prop])
          }
          this.customers.pop();
    //console.log(this.ApiService.tabledataDA)
    this.ApiService.viewtableDA(); 
  }

  postdata(angForm1 : any) //angForm1
    {
        console.log(angForm1);
        if(this.distadminform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null && this.district!=null)
        {
            this.ApiService.create_dist_admin('1',angForm1.value.email,angForm1.value.firstname,angForm1.value.lastname,angForm1.value.district,angForm1.value.designation,angForm1.value.party_designation,angForm1.value.approval_status,angForm1.value.location_id)
            .subscribe(
            data => {
                alert("District admin user has been created successfully!")
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

    delete_da(user_id : any)
    {
        console.log(user_id)
            this.ApiService.delete_admin(user_id)
            .pipe()
            .subscribe(
            data => {

                alert("District admin detail has been deleted !")
            },

            error => {
                console.log(error);
            });

    }
    get email() { return this.distadminform.get('email'); }
    get firstname() { return this.distadminform.get('firstname'); }
    get lastname() { return this.distadminform.get('lastname'); }
    get district() { return this.distadminform.get('district'); }

    DAid:any;
    DAname:any;
    DAlastname:any;
    DAdesig:any;
    DAparty_desig:any;
    DAdistrict: any;
    DAmail:any;
    DAstatus:any;
    editbuttonviewDA(a:any){
      console.log(a);
       let fullname=a.name.split(" ");
       this.DAid=a.id;
       this.DAname=fullname[0];
       this.DAlastname=fullname[1];
          this.DAdesig=a.designation;
          this.DAparty_desig=a.party_designation;
          this.DAdistrict=a.district;
          this.DAmail=a.email;
          this.DAstatus=a.approval_status;
    }
}
