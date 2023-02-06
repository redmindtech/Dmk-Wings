import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ApiServiceService } from 'src/app/_service/api-service.service';



@Component({
  selector: 'app-stateadmin',
  templateUrl: './stateadmin.component.html',
  styleUrls: ['./stateadmin.component.scss']
})
export class StateadminComponent implements OnInit {
  customers:any;
  stateadminform !:FormGroup;

  constructor(public ApiService:ApiServiceService,private fb: FormBuilder) { 
    this.stateadminform = this.fb.group({ //angForm
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstname:['',[Validators.required, Validators.pattern('[A-Za-z]{1,32}')]],
      lastname:['',[Validators.required,Validators.pattern('[A-Za-z]{1,32}')]],
      //district:['',Validators.required],
      designation:[''],
      party_designation:[''],
      approval_status:[''],
      location_id:['1'],
      mode:['0']
      });
  }

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.ApiService.viewtableSA();
    this.ApiService.viewtableDA();
    this.ApiService.viewtableOB();
    this.ApiService.viewtableOBapprove();
    this.getdata();
    //this.ApiService.viewtableSA();
    this.getdata().then(res=>this.getdataarray())
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
      
  }
  // ngAfterViewInit() {
  //   this.getdata()
  // }
  getdata(){
    this.ApiService.viewtableSA()
    //console.log(this.ApiService.viewtableSA1());
    return new Promise<void>((resolve, reject) => {
      resolve();
  });
  
    
    // this.customers=[];
    //     for(const prop in this.ApiService.tabledata) {
    //         this.customers.push(this.ApiService.tabledata[prop])
    //       }
    //       this.customers.pop();
    
    //console.log(this.ApiService.tabledata)
  }
  getdataarray(){
    // console.log("2st");
    this.customers=[];
        for(const prop in this.ApiService.tabledata) {
            this.customers.push(this.ApiService.tabledata[prop])
          }
          this.customers.pop();
    
  }
  postdata(angForm1 : any) //angForm1
  {
      //console.log(angForm1);
      //if(this.stateadminform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null)
    if(this.stateadminform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null)
    {
        this.ApiService.create_state_admin(angForm1.value.mode,angForm1.value.email,angForm1.value.firstname,
          angForm1.value.lastname,angForm1.value.designation,angForm1.value.party_designation,angForm1.value.approval_status,angForm1.value.location_id)
        .subscribe(
        data => {
            alert("State admin user has been created successfully!");
        //this.router.navigate(['']);
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
  delete_sa(user_id : any)
    {
        console.log(user_id)
            this.ApiService.delete_admin(user_id)
            .pipe()
            .subscribe(
            data => {
                alert("State admin detail was successfully Deleted !")
                window.location.reload()
            },

            error => {
                console.log(error);
            });
    }
 
    get email() { return this.stateadminform.get('email'); }
    get firstname() { return this.stateadminform.get('firstname'); }
    get lastname() { return this.stateadminform.get('lastname'); }

    SAid:any;
    SAname:any;
    SAlastname:any;
    SAdesig:any;
    SAparty_desig:any;
    SAmail:any;
    SAstatus:any;
    editbuttonviewSA(a:any){
       let fullname=a.name.split(" ");
       this.SAid=a.id;
       this.SAname=fullname[0];
       this.SAlastname=fullname[1];
          this.SAdesig=a.designation;
          this.SAparty_desig=a.party_designation;
          this.SAmail=a.email;
          this.SAstatus=a.approval_status;
    }
  

  

} 
