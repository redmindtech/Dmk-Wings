import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-app-or-rej',
  templateUrl: './app-or-rej.component.html',
  styleUrls: ['./app-or-rej.component.scss']
})
export class AppOrRejComponent implements OnInit {
  customers:any=[];
  reqform :FormGroup;
  router: any;
  editform:FormGroup;
  dtOptions: DataTables.Settings = {};
  hidden:boolean=true;
  district:string;
  constituency:string='';
  date_of_birth :string;
  age : number;
  message: boolean;
  username: any;
  user_password: any;
  spinner: boolean;
  approval_status: string;

  constructor(public ApiService:ApiServiceService,
    private fb: FormBuilder,private spinnerService: NgxSpinnerService)
    {
      // this.ApiService.viewtableOB().subscribe((data:any) => {
      // let obj= data;
      // this.customers=obj.data;
      // ;})


  //     this.customers=[{name:'nm1',email:'em1'},{name:'nm2',email:'em2'},
  //   {name:'nm2',email:'em2'},
  //   {name:'nm2',email:'em2'},{name:'nm2',email:'em2'},{name:'nm2',email:'em2'},
  //   {name:'nm2',email:'em2'},{name:'nm2',email:'em2'},{name:'nm2',email:'em2'},
  //   {name:'nm2',email:'em2'},{name:'nm2',email:'em2'}
  // ]
      

      this.FormIntialize();
      this.editform = this.fb.group({ //angForm
        email1: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        firstname1:['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
        lastname1:['',[Validators.required,Validators.pattern('[A-Za-z ]{1,32}')]],
        age1:['',Validators.required],
        father_name1:['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
        mother_name1:['', Validators.pattern('[A-Za-z ]{1,32}')],
        educational_qualification1:['',Validators.required],
        date_of_birth1:['',Validators.required],
        additional_qualification1:['', Validators.pattern('^[a-zA-Z]+[a-zA-Z .,]+$')],
        contact_no1:['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
        whatsapp_no1:['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
        profession1:['', Validators.pattern('^[a-zA-Z]+[a-zA-Z .,]+$')],
        address1:[''],
        applied_role1:['',Validators.required],
        party_comments1:[''],
        location_id1:['1',Validators.required],
        mode1:['2',Validators.required]
      });

      this.reqform= this.fb.group({
        name: [''],
        email1:[''],
        old_designation:[''],
       new_designation1:[''],
       reason:[''],
        user_id:[''],});

        //this.district=this.ApiService.user_district;
        this.district = JSON.parse(localStorage.getItem('user_district'));

    }
    FormIntialize(){
      this.officebearerform = this.fb.group({ //angForm
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        // constituency:['',Validators.required],
        firstname:['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
        lastname:['',[Validators.required,Validators.pattern('[A-Za-z ]{1,32}')]],
        age:['',Validators.required],
        father_name:['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
        mother_name:['',[ Validators.pattern('[A-Za-z ]{1,32}')]],
        educational_qualification:['',Validators.required],
        date_of_birth:['',Validators.required],
        additional_qualification:['', Validators.pattern('^[a-zA-Z]+[a-zA-Z .,]+$')],
        contact_no:['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
        whatsapp_no:['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
        profession:['', Validators.pattern('^[a-zA-Z]+[a-zA-Z .,]+$')],
        address:[''],
        applied_role:['',Validators.required],
        party_comments:[''],
        location_id:['1',Validators.required],
        mode:['2',Validators.required]
      });

    }

  officebearerform !:FormGroup;
  district_list:any[]=this.ApiService.all_districts;
  constituency_list:any=this.ApiService.all_constituency;
  user_constituency:any;
  
  FormReset(){
    this.officebearerform.reset();
    this.FormIntialize();
    this.hidden=true;
this.test_ph1= "false";
  this.test_email1 = "false";


  }
minAge1:Date;
  ngOnInit(): void {
    
    var today = new Date();
    var minAge = 18;
     this.minAge1 = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    //console.log(this.ApiService.all_constituency['CHENGALPATTU'])
    this.ApiService.viewtableOB().subscribe((data:any) => {
      let obj= data;
      this.customers=obj.data;
      //console.log(obj.data.length);
      ;})
    //console.log(this.customers);
    //console.log(this.district_list);

    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      order:[]
    };

    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableOBapprove();
    this.getdata();
    let obj=this.constituency_list;
    this.user_constituency=obj[this.district];
    this.showSpinner();
  }
  public showSpinner(): void {
    this.spinnerService.show();
    }
  Constituency_selection(selection:any){
    //console.log(selection)
    if(selection != 'null'){
      //console.log(this.district);
      let obj=this.constituency_list;
      this.user_constituency=obj[this.district];

    }

  }
  OBconstituency_change(a:any){
    //this.user_constituency=[];
    let obj=this.constituency_list;
    this.user_constituency=obj[a];
    // this.user_constituency.unshift('Select Option');
    this.OBConstituency='';
  }
  getdata(){

    // this.customers=[];
    //     for(const prop in this.ApiService.tabledataOB) {
    //         this.customers.push(this.ApiService.tabledataOB[prop])
    //       }
    //       this.customers.pop();
    //console.log(this.ApiService.tabledataDA)
    //this.ApiService.viewtableOB();

    this.ApiService.viewtableOB().subscribe((data:any) => {
        let obj= data;
        // console.log(obj.data);

        // for(const prop in obj.data) {
        //     this.customers.push(obj.data[prop]);
        //   }
        //   console.log(this.customers);
    });

  }

  postdata(officebearerform : any) //officebearerform
  {

    console.log(officebearerform);
    if(this.officebearerform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null && this.applied_role!=null && this.district!='' && this.constituency!='' && this.approval_status!='')
    {  
       console.log(officebearerform);
        this.ApiService.create_office_bearers(officebearerform.value.mode,officebearerform.value.email,officebearerform.value.firstname,officebearerform.value.lastname,officebearerform.value.age,officebearerform.value.father_name,officebearerform.value.mother_name,officebearerform.value.educational_qualification,officebearerform.value.date_of_birth,officebearerform.value.additional_qualification,officebearerform.value.contact_no,officebearerform.value.whatsapp_no,officebearerform.value.profession,officebearerform.value.address,officebearerform.value.applied_role,
          officebearerform.value.party_comments,officebearerform.value.location_id,this.approval_status,this.district,this.constituency)
        .subscribe(
        data => {
           // window.location.reload();
            // alert("Office bearer has been created successfully!")
            console.log(data)
            this.username=data.whatsapp_no;
            console.log(officebearerform.value.whatsapp_no)
            this.user_password=data.password;
        //this.router.navigate(['']);
      //  officebearerform.reset();
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
  delete_ob(user_id : any)
  {
      console.log(user_id)
      if(confirm("Are you sure want to delete this record ?")) {
        console.log("Implement delete functionality here");
          this.ApiService.delete_admin(user_id)
          .pipe()
          .subscribe(
          data => {
              window.location.reload();
              //this.router.navigate(['uikit/formlayout']);
              alert("Office Bearer detail has been deleted !")
          },

          error => {
              console.log(error);
          });

  }
}
    get email() { return this.officebearerform.get('email'); }
    get firstname() { return this.officebearerform.get('firstname'); }
    get lastname() { return this.officebearerform.get('lastname'); }
    // get constituency() { return this.officebearerform.get('constituency'); }
    get applied_role() { return this.officebearerform.get('applied_role'); }
    get father_name() { return this.officebearerform.get('father_name'); }
    get mother_name() { return this.officebearerform.get('mother_name'); }
    get educational_qualification() { return this.officebearerform.get('educational_qualification'); }
    get additional_qualification() { return this.officebearerform.get('additional_qualification'); }
    get contact_no() { return this.officebearerform.get('contact_no'); }
    get whatsapp_no() { return this.officebearerform.get('whatsapp_no'); }
    get profession() { return this.officebearerform.get('profession'); }
    get address() { return this.officebearerform.get('address'); }
    get party_comments() { return this.officebearerform.get('party_comments'); }

    get firstname1() { return this.editform.get('firstname1'); }
    get lastname1() { return this.editform.get('lastname1'); }
    get father_name1() { return this.editform.get('father_name1'); }
    get mother_name1() { return this.editform.get('mother_name1'); }
    get educational_qualification1() { return this.editform.get('educational_qualification1'); }
    get additional_qualification1() { return this.editform.get('additional_qualification1'); }
    get contact_no1() { return this.editform.get('contact_no1'); }
    get whatsapp_no1() { return this.editform.get('whatsapp_no1'); }
    get profession1() { return this.editform.get('profession1'); }
    get applied_role1() { return this.editform.get('applied_role1'); }
    get party_comments1() { return this.editform.get('party_comments1'); }
    get address1() { return this.editform.get('address1'); }
    get email1() { return this.editform.get('email1'); }

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
    OBmothername: any;
    OBdegree: any;
    OBaddtionaldegree: any;
    OBphonenumber: any;
    whatsappnumner: any;
    OBprofession: any;
    OBaddress: any;
    OBold_designation: any;
    OBcomments: any;
    OBnew_designation:any;
    OBreason:any;
    fullname1:any;
    OBDistrict:any;
    OBConstituency:string;
    editbuttonviewOB(a:any){
      console.log(a);
      this.OBid=a.id;
      this.OBname=a.firstname;
      this.OBlastname=a.lastname;
         this.OBage=a.age;
         this.OBdateofbirth=a.date_of_birth;
         this.OBfathername=a.father_name;
         this.OBmothername=a.mother_name;
         this.OBdegree=a.educational_qualification;
         this.OBaddtionaldegree=a.additional_qualification;
         this.OBphonenumber=a.contact_no;
         this.whatsappnumner=a.whatsapp_no;
         this.OBmail=a.email;
         this.OBprofession=a.profession;
         this.OBaddress=a.address1;
         this.OBold_designation=a.applied_role;
         this.OBcomments=a.party_comments;
         this.fullname1=a.name;
         this.OBDistrict=a.district;
         this.OBConstituency=a.constituency;
         console.log(this.OBConstituency);
          let obj=this.constituency_list;
          this.user_constituency=obj[this.OBDistrict];

         this.reqform.patchValue({
          id1:this.OBid,
          email1:this.OBmail,
          name:this.fullname1,
          old_designation:this.OBold_designation,
          new_designation1:"",
          reason:""
         });
  this.editform.patchValue({
          id1:this.OBid,
          email1:this.OBmail,
          firstname1:this.OBname,
          lastname1:this.OBlastname,
          age1:this.OBage,
          designation1:this.OBdesig,
          party_designation1:this.OBparty_desig,
          approval_status1:this.OBstatus,
        father_name1:this.OBfathername,
        mother_name1:this.OBmothername,
        educational_qualification1:this.OBdegree,
        date_of_birth1:this.OBdateofbirth,
        additional_qualification1:this.OBaddtionaldegree,
        contact_no1:this.OBphonenumber,
        whatsapp_no1:this.whatsappnumner,
        profession1:this.OBprofession,
        address1:this.OBaddress,
        applied_role1:this.OBold_designation,
        party_comments1:this.OBcomments,
        location_id1:'1',
        mode1:'2'


        });
}
updatedata(updateform: any){
  // console.log(this.OBDistrict,'',this.OBConstituency);
  console.log(updateform);
  
  if(this.editform.valid==true && this.OBConstituency!=''&& this.test_email=='false'&& this.test_ph=='false'){
    console.log(updateform)
    this.spinner=true;
    //console.log("VAAALId")
    this.ApiService.updateOB('0', this.OBid, updateform.get('email1').value,updateform.get('firstname1').value, updateform.get('lastname1').value,
    updateform.get('age1').value,
    updateform.get('father_name1').value,
    updateform.get('mother_name1').value,
    updateform.get('educational_qualification1').value,
    updateform.get('date_of_birth1').value,
    updateform.get('additional_qualification1').value,
    updateform.get('contact_no1').value,
    updateform.get('whatsapp_no1').value,
    updateform.get('profession1').value,
    updateform.get('address1').value,
    updateform.get('applied_role1').value,
     updateform.get('party_comments1').value,
     updateform.get('approval_status1').value,
    '1',this.OBDistrict,this.OBConstituency)
    .pipe()
    .subscribe(
        data => {
          console.log(data);
          this.spinnerService.hide();
          setTimeout(function(){
           alert("Office Bearer detail was updated!");
           window.location.reload();
            },100)
            
        },

        error => {
            console.log(error);
        });

  }
  else{
    this.hidden=false;
  }

}
old_mail: any;
  old_whatsapp: any;
  get_oldmail(old_record) {
    this.old_mail = old_record.email;
    this.old_whatsapp = old_record.whatsapp_no;
    // console.log(this.old_whatsapp );
  }
test_ph = "false";
test_ph1= "false";
  getphone(c, add) {
    // console.log(add)
    if (add == 'ADD') {
      if (this.officebearerform.get('whatsapp_no').status == "VALID") {
        // console.log(c);
        this.ApiService.ph_check().subscribe(data => {
          //  console.log(data);
          for (let whatsapp_no in data) {
            let d = data[whatsapp_no];
            // console.log(d.whatsapp_no );
            // Do something with value
            if (c == d.whatsapp_no) {
              //console.log("tttt")
              this.test_ph = "true";
              break;
            }
            else {
              //console.log("esle")
              this.test_ph = 'false';
            }
          }
        });
      }
    }
    else{
      if (this.editform.get('whatsapp_no1').status == "VALID") {
      
        // console.log("edit");      
        // console.log(this.old_whatsapp);
        // console.log(c);
        if (this.old_whatsapp == c) {
          this.test_ph1= "false";
          // console.log(this.test_ph)

        }
        else{
        this.ApiService.ph_check().subscribe(data => {
          console.log(data);
          for (let whatsapp_no in data) {
            let d = data[whatsapp_no];
            
            if (c == d.whatsapp_no) {
              
              this.test_ph1 = "true";
              // console.log(this.test_ph)
              break;
            }
            else {
            
              this.test_ph1 = 'false';
              // console.log("else")
              // console.log(this.test_ph)
            }
          }
        });
        // console.log(this.test_ph)
      }
    }
    }
  }
  email_1: any = [];
  test_email = "false";
  test_email1 = "false";
  getemail(a, add) {
    if (add == 'ADD') {
      // console.log(add);
      // console.log('old_em')
      // console.log( this.SAmail)
      if (this.officebearerform.get('email').status == "VALID") {
        // console.log(a);
        this.ApiService.email_check().subscribe(data => {

          for (let email in data) {
            let b = data[email];
            // Do something with value
            if (a == b.email) {
              //console.log("tttt")
              this.test_email = "true";
              break;
            }
            else {
              this.test_email = 'false';
            }
          }

        });
      }
    }
    else {
      if (this.editform.get('email1').status == "VALID") {
        // console.log("edit");
        // console.log(a);
        // console.log(this.old_mail);

        if (this.old_mail == a) {
          this.test_email1 = "false";
        }
        else {
          this.ApiService.email_check().subscribe(data => {
            for (let email in data) {
              let b = data[email];
              // Do something with value
              if (a == b.email) {
                //console.log("tttt")
                this.test_email1 = "true";
                break;
              }
              else {

                this.test_email1 = 'false';
              }
            }

          });
        }
      }
    
    }

  }



postdata1(angForm1) //angForm1
{
     console.log(angForm1);
    if( angForm1.status="valid" )
    {
        this.ApiService.rq_form(angForm1.get('name').value,this.OBid,angForm1.get('email1').value,angForm1.get('old_designation').value,angForm1.get('new_designation1').value,angForm1.get('reason').value,angForm1.get('district').value && this.test_email=='false'&& this.test_ph=='false')
        .pipe()
        .subscribe(
        data => {
          // console.log(angForm1.value.name,angForm1.value.user_id,angForm1.value.new_designation,angForm1.value.old_designation,angForm1.value.reason );
            alert("Request has been created successfully!")

        this.router.navigate(['superadmin/Approve-Reject']);
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


calculateAge() {
  console.log(this.date_of_birth);


  const today = new Date();
  const birthdate = new Date(this.date_of_birth);
  this.age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    this.age--;
  }

}

edit_dateofbirth:string;
editAge:number;
editcalculateAge() {
  //console.log(this.edit_dateofbirth);
  const today1 = new Date();
  const birthdate1 = new Date(this.edit_dateofbirth);
  this.editAge = today1.getFullYear() - birthdate1.getFullYear();
  const i = today1.getMonth() - birthdate1.getMonth();
  if (i < 0 || (i === 0 && today1.getDate() < birthdate1.getDate())) {
    this.editAge--;
  }
  //console.log(this.editAge);
}


get user_id() { return this.reqform.get('user_id'); }
//get email1() { return this.reqform.get('email1'); }
get name() { return this.reqform.get('name'); }
get  new_designation() { return this.reqform.get('new_designation'); }
get old_designation() { return this.reqform.get(' old_designation'); }
get responcibility() { return this.reqform.get(' responcibility'); }
// get reason1() { return this.reqform.get('reason1'); }

}
