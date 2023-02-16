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
  editform : FormGroup;
  hidden:boolean=true;
  email1: any;
  firstname1: any;
  lastname1: any;
  district1: any;
  designation1:any;
  whatsapp_no1:any;

  constructor(public ApiService:ApiServiceService,
    private fb: FormBuilder, )
    {   this.distadminform = this.fb.group({ //angForm
          email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          firstname:['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
          lastname:['',[Validators.required,Validators.pattern('[A-Za-z ]{1,32}')]],
            district:['',Validators.required],
          
            whatsapp_no:['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
            party_designation:[''],
            approval_status:[''],
            location_id:['1',Validators.required]
            });

        this.editform = this.fb.group({ //angForm
          email1: [this.DAname, [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          firstname1:['',[Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
          lastname1:['',[Validators.required,Validators.pattern('[A-Za-z ]{1,32}')]],
          district1:['',Validators.required],
          whatsapp_no1:['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
          party_designation1:[''],
          approval_status1:[''],
          location_id1:['1'],
          mode1:['1']
          });
  }
  district_list:any[]=this.ApiService.all_districts;

  ngOnInit(): void {
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableOBapprove();
    this.getdata();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

  }
  getdata(){
    this.ApiService.viewtableDA().subscribe(data => {
      console.log(data)
        for(const prop in data) {
            this.customers.push(data[prop])
          }
          console.log(this.customers[0]);
    });
  }

  postdata(angForm1 : any) //angForm1
    {
        console.log(angForm1);
        if(this.distadminform.valid==true && this.email!=null && this.firstname!=null && this.lastname!=null && this.district!=null)
        {
            this.ApiService.create_dist_admin('1',angForm1.value.whatsapp_no,angForm1.value.email,angForm1.value.firstname,angForm1.value.lastname,angForm1.value.district,angForm1.value.party_designation,angForm1.value.approval_status,angForm1.value.location_id)
            
            .subscribe(
            data => {
              console.log(this.whatsapp_no)
             
              alert("District admin user has been created successfully!")
                window.location.reload();
             
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

    delete_da(user_id : any)
    {
        console.log(user_id)
        if(confirm("Are you sure want to delete this record ?")) {
          console.log("Implement delete functionality here");
            this.ApiService.delete_admin(user_id)
            .pipe()
            .subscribe(
            data => {
                window.location.reload();
                alert("District admin detail has been deleted !")
            },

            error => {
                console.log(error);
            });

    }
  }
    get email() { return this.distadminform.get('email'); }
    get firstname() { return this.distadminform.get('firstname'); }
    get lastname() { return this.distadminform.get('lastname'); }
    get district() { return this.distadminform.get('district'); }
    get whatsapp_no() { return this.distadminform.get('whatsapp_no'); }

    DAid:any;
    DAname:any;
    DAlastname:any;
    DAdesig:any;
    DAparty_desig:any;
    DAdistrict: any;
    DAmail:any;
    DAstatus:any;
    DAwhats:any;

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
          this.DAwhats=a.whatsapp_no;
          

          this.editform.patchValue({
            id1:this.DAid,
            email1:this.DAmail,
            firstname1:this.DAname,
            lastname1:this.DAlastname,
            district1:this.DAdistrict,
         
            party_designation1:this.DAparty_desig,
            approval_status1:this.DAstatus,
            whatsapp_no1:this.DAwhats

          })
    }


    updatedata(updateform: any){

      console.log(updateform.value);
      
      if(this.editform.valid==true)
      {
       
      this.ApiService.updateDA('1', this.DAid, updateform.get('firstname1').value, updateform.get('lastname1').value,
        
        updateform.get('district1').value,
        updateform.get('party_designation1').value,
        updateform.get('email1').value,
        updateform.get('whatsapp_no1').value,
        updateform.get('approval_status1').value)
       
       
        .pipe()
        .subscribe(
            data => {
                window.location.reload();
                alert("District admin detail was updated!");
            },

            error => {
                console.log(error);
            });
}
}
}