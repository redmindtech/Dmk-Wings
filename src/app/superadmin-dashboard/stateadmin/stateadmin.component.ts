import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ApiServiceService } from 'src/app/_service/api-service.service';



@Component({
  selector: 'app-stateadmin',
  templateUrl: './stateadmin.component.html',
  styleUrls: ['./stateadmin.component.scss']
})
export class StateadminComponent implements OnInit {
  customers:any[]=[];
  stateadminform !:FormGroup;
  editform: FormGroup;
  hidden:boolean=true;
  updateform: FormGroup;
  message: boolean;
  username: any;
  user_password: any;

  constructor(public ApiService:ApiServiceService,private fb: FormBuilder) {
    this.stateadminform = this.fb.group({ //angForm
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstname:['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      lastname:['',[Validators.required,Validators.pattern('[A-Za-z ]{1,32}')]],
      //district:['',Validators.required],
      whatsapp_no:['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
      party_designation:['',[Validators.required,Validators.pattern('[A-Za-z ]{1,32}')]],
      approval_status:['',Validators.required],
      location_id:['1'],
      mode:['0']
      });

      this.editform = this.fb.group({ //angForm
        email1: [this.SAfirstname, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        firstname1:['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
        lastname1:['',[Validators.required,Validators.pattern('[A-Za-z ]{1,32}')]],
        //district:['',Validators.required],
        whatsapp_no1:['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
        party_designation1:['',[Validators.required,Validators.pattern('[A-Za-z ]{1,32}')]],
        approval_status1:['',Validators.required],
        location_id1:['1'],
        mode1:['0']
        });




  }
  //firstname1=new FormControl('hu');


  // updateName() {
  //   this.firstname1.setValue('Nancy');
  // }



  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableOBapprove();
    this.getdata();
    //this.ApiService.viewtableSA();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };



  }

  getdata(){
    this.ApiService.viewtableSA().subscribe(data => {
      console.log(data)
        for(const prop in data) {
            this.customers.push(data[prop])
          }
          console.log(this.customers);
    });



    // this.customers=[];
    //     for(const prop in this.ApiService.tabledata) {
    //         this.customers.push(this.ApiService.tabledata[prop])
    //       }
    //       this.customers.pop();

    //console.log(this.ApiService.tabledata)
  }
  // getdataarray(){
  //   console.log("2st");
  //   this.customers=[];
  //       for(const prop in this.ApiService.tabledata) {
  //           this.customers.push(this.ApiService.tabledata[prop])
  //         }
  //         this.customers.pop();

  // }
  postdata(angForm1 : any) //angForm1
  {
      //console.log(angForm1);
      //if(this.stateadminform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null)
    if(this.stateadminform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null)
    {
        this.ApiService.create_state_admin(angForm1.value.mode,angForm1.value.email,angForm1.value.firstname,
          angForm1.value.lastname,angForm1.value.whatsapp_no,angForm1.value.party_designation,angForm1.value.approval_status,angForm1.value.location_id)
        .subscribe(
        data => {
          console.log(data)
          this.username=angForm1.value.whatsapp_no;
          console.log(angForm1.value.whatsapp_no)
          this.user_password=data.password;
           // window.location.reload();
            //alert("State admin user has been created successfully!");

      //  angForm1.reset();
        },

        error => {
            console.log(error);
        });
    }
    else{
      this.hidden=false;
    }
    this.message=true;
  }
  reload(){
    window.location.reload();

  }
  delete_sa(user_id : any)
  {
      console.log(user_id)
      if(confirm("Are you sure want to delete this record ?")) {
        console.log("Implement delete functionality here");


          this.ApiService.delete_admin(user_id)
          .pipe()
          .subscribe(
          data => {
              window.location.reload()
              alert("State admin detail was successfully Deleted !")

          },

          error => {
              console.log(error);
          });
        }
}

    get email() { return this.stateadminform.get('email'); }
    get firstname() { return this.stateadminform.get('firstname'); }
    get lastname() { return this.stateadminform.get('lastname'); }

    SAid:any;
    SAfirstname:any;
    SAlastname:any;
    SAdesig:any;
    SAwhatsapp_no:any;
    SAparty_desig:any;
    SAmail:any;
    SAstatus:any;
    editbuttonviewSA(a:any){
      //  let fullname=a.name.split(" ");
       this.SAid=a.id;
      //  alert(this.SAid);
       this.SAfirstname=a.firstname;
       this.SAlastname=a.lastname;
          this.SAdesig=a.designation;
          this.SAwhatsapp_no=a.whatsapp_no;
          this.SAparty_desig=a.party_designation;
          this.SAmail=a.email;
          this.SAstatus=a.approval_status;

          this.editform.patchValue({
            id1:this.SAid,
            email1:this.SAmail,
            firstname1:this.SAfirstname,
            lastname1:this.SAlastname,
            designation1:this.SAdesig,
            whatsapp_no1:this.SAwhatsapp_no,
            party_designation1:this.SAparty_desig,
            approval_status1:this.SAstatus


          })
    }


    updatedata(updateform: any){
      if(this.editform.valid==true)
      {
          console.log(updateform.value);
          this.ApiService.updateSA('0', this.SAid, updateform.get('firstname1').value, updateform.get('lastname1').value,
            updateform.get('whatsapp_no1').value,
            updateform.get('party_designation1').value,
            updateform.get('email1').value,
            updateform.get('approval_status1').value)
            .pipe()
            .subscribe(
                data => {
                    window.location.reload();
                    alert("State admin detail was updated!");

                },

                error => {
                    console.log(error);
                });
    }

  }


}
