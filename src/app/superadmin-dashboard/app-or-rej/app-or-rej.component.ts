import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/_service/api-service.service';


@Component({
  selector: 'app-app-or-rej',
  templateUrl: './app-or-rej.component.html',
  styleUrls: ['./app-or-rej.component.scss']
})
export class AppOrRejComponent implements OnInit {
  

  constructor(public ApiService:ApiServiceService,
    private fb: FormBuilder) 
    { 
      this.officebearerform = this.fb.group({ //angForm
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        firstname:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
        lastname:['',[Validators.required,Validators.pattern('[A-Za-z]{1,32}')]],
        age:['',Validators.required],
        father_name:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
        educational_qualification:['',Validators.required],
        date_of_birth:[''],
        additional_qualification:[''],
        contact_no:['',[Validators.required,Validators.pattern('[789][0-9]{9}')]],
        whatsapp_no:['',[Validators.required,Validators.pattern('[789][0-9]{9}')]],
        profession:[''],
        address1:[''],
        applied_role:['',Validators.required],
        party_comments:[''],
        location_id:['1',Validators.required],
        mode:['2',Validators.required]
      });
    }
  customers:any=[];
  officebearerform !:FormGroup;
  dtOptions: DataTables.Settings = {};
  
  ngOnInit(): void {
    this.getdata();
    this.ApiService.viewtableOB();
    this.ApiService.viewtableDA();
    this.ApiService.viewtableSA();
    this.ApiService.viewtableOBapprove();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    
   
  }
  getdata(){
    this.customers=[];
        for(const prop in this.ApiService.tabledataOB) {
            this.customers.push(this.ApiService.tabledataOB[prop])
          }
          this.customers.pop();
    //console.log(this.ApiService.tabledataDA)
    //this.ApiService.viewtableOB();

  }
  postdata(officebearerform : any) //officebearerform
  {

    //if()
    if(this.officebearerform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null && this.applied_role!=null)
    {
        this.ApiService.create_office_bearers(officebearerform.value.mode,officebearerform.value.email,officebearerform.value.firstname,officebearerform.value.lastname,officebearerform.value.age,officebearerform.value.father_name,officebearerform.value.educational_qualification,officebearerform.value.date_of_birth,officebearerform.value.additional_qualification,officebearerform.value.contact_no,officebearerform.value.whatsapp_no,officebearerform.value.profession,officebearerform.value.address1,officebearerform.value.applied_role,officebearerform.value.party_comments,officebearerform.value.location_id)
        .subscribe(
        data => {
            alert("Office bearers user has been created successfully!")
        //this.router.navigate(['']);
        officebearerform.reset();
        },

        error => {
            console.log(error);
        });
    }
    else{
        alert("Please enter the valid details")
    }

  }
  delete_ob(user_id : any)
    {
        console.log(user_id)
            this.ApiService.delete_admin(user_id)
            .pipe()
            .subscribe(
            data => {

                //this.router.navigate(['uikit/formlayout']);
                alert("Office Bearer detail has been deleted !")
            },

            error => {
                console.log(error);
            });

    }
    get email() { return this.officebearerform.get('email'); }
    get firstname() { return this.officebearerform.get('firstname'); }
    get lastname() { return this.officebearerform.get('lastname'); }
    get applied_role() { return this.officebearerform.get('applied_role'); }
  

    OBid:any;
    OBname: any;
    OBlastname: any;
    OBdesig: any;
    OBparty_desig: any;
    OBmail: any;
    OBstatus: any;
    OBage: any;
    OBdateofbirth: any;
    OBfathername: any;
    OBdegree: any;
    OBaddtionaldegree: any;
    OBphonenumber: any;
    whatsappnumner: any;
    OBprofession: any;
    OBaddress: any;
    OBresponcibility: any;
    OBcomments: any;
    editbuttonviewOB(a:any){
      //console.log(a);
      let fullname=a.name.split(" ");
      this.OBid=a.id;
      this.OBname=fullname[0];
      this.OBlastname=fullname[1];
         this.OBage=a.age;
         this.OBdateofbirth=a.date_of_birth;
         this.OBfathername=a.father_name;
         this.OBdegree=a.educational_qualification;
         this.OBaddtionaldegree=a.additional_qualification;
         this.OBphonenumber=a.contact_no;
         this.whatsappnumner=a.whatsapp_no;
         this.OBmail=a.email;
         this.OBprofession=a.profession;
         this.OBaddress=a.address1;
         this.OBresponcibility=a.applied_role;
         this.OBcomments=a.party_comments;
}

}
