import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-districtadmin',
  templateUrl: './districtadmin.component.html',
  styleUrls: ['./districtadmin.component.scss']
})
export class DistrictadminComponent implements OnInit {
  customers: any = [];
  distadminform !: FormGroup;
  dtOptions: DataTables.Settings = {};
  editform: FormGroup;
  hidden: boolean = true;
  email1: any;
  //email: any;
  party_designation: any;
  message: boolean;
  spinner: boolean;
  tableshow: boolean = false;
  districtadminform: any;
  DAcontact_no: any;

  // firstname1: any;
  //lastname1: any;
  //district1: any;
  // designation1:any;
  //whatsapp_no1:any;

  constructor(public ApiService: ApiServiceService,
    private fb: FormBuilder, private spinnerService: NgxSpinnerService) {
    this.FormIntialize();

    this.editform = this.fb.group({ //angForm
      email1: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstname1: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      lastname1: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      district1: ['', Validators.required],
      whatsapp_no1: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      party_designation1: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      approval_status1: ['', Validators.required],
      location_id1: ['1', Validators.required],
      mode1: ['1'],
      contact_no1: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
    });
  }
  FormIntialize() {
    this.distadminform = this.fb.group({ //angForm
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstname: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      lastname: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      district: ['', Validators.required],

      whatsapp_no: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
      party_designation: ['', [Validators.required, Validators.pattern('[A-Za-z ]{1,32}')]],
      approval_status: ['', Validators.required],
      location_id: ['1', Validators.required],
      contact_no: ['', [Validators.required, Validators.pattern('[6789][0-9]{9}')]],
    });
  }
  district_list: any[] = this.ApiService.all_districts;

  ngOnInit(): void {
    // this.ApiService.viewtableDA();
    // this.ApiService.viewtableSA();
    // this.ApiService.viewtableOB();
    // this.ApiService.viewtableOBapprove();
    this.getdata();
    this.dtOptions = {
      pagingType: 'full_numbers',
      order: []
    };
    this.showSpinner();
  }
  public showSpinner(): void {
    this.spinnerService.show();
  }
  getdata() {
    this.ApiService.viewtableDA().subscribe(data => {
      // console.log(data)
      for (const prop in data) {
        this.customers.push(data[prop])
      }
      console.log(this.customers[0]);
      this.tableshow = true;
    });
  }

  username: any;
  user_password: any;
  user_email: any;
  postdata(angForm1: any) //angForm1
  {
    console.log(angForm1);

    if (this.distadminform.valid == true && this.email != null && this.firstname != null && this.lastname != null && this.district != null && this.test_email == 'false' && this.test_ph == 'false') {
      this.ApiService.create_dist_admin('1', angForm1.value.whatsapp_no, angForm1.value.email, angForm1.value.firstname, angForm1.value.lastname, angForm1.value.district, angForm1.value.party_designation, angForm1.value.approval_status, angForm1.value.location_id,angForm1.value.contact_no)

        .subscribe(
          data => {
            console.log(data)
            this.username = data.whatsapp_no;
            console.log(angForm1.value.whatsapp_no)
            this.user_password = data.password;
            this.user_email = data.email;

            // alert("District admin user has been created successfully!")


            // window.location.reload();


            //angForm1.reset();


          },

          error => {
            console.log(error);
          });
    }
    else {
      this.hidden = false;
    }
    this.message = true;


  }
  reload() {
    window.location.reload();

  }
  delete_da(user_id: any) {
    console.log(user_id)
    if (confirm("Are you sure want to delete this record ?")) {
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
  get contact_no() { return this.distadminform.get('contact_no'); }

  get party_designation1() { return this.editform.get('party_designation1'); }
  get firstname1() { return this.editform.get('firstname1'); }
  get lastname1() { return this.editform.get('lastname1'); }
  get district1() { return this.editform.get('district1'); }
  get contact_no1() { return this.distadminform.get('contact_no1'); }
  //get district1() { return this.editform.get('district1'); }

  DAid: any;
  DAname: any;
  DAlastname: any;
  DAdesig: any;
  DAparty_desig: any;
  DAdistrict: any;
  DAmail: any;
  DAstatus: any;
  DAwhats: any;

  editbuttonviewDA(a: any) {
    console.log(a);
    let fullname = a.name.split(" ");
    this.DAid = a.id;
    this.DAname = fullname[0];
    this.DAlastname = fullname[1];
    this.DAdesig = a.designation;
    this.DAparty_desig = a.party_designation;
    this.DAdistrict = a.district;
    this.DAmail = a.email;
    this.DAstatus = a.approval_status;
    this.DAwhats = a.whatsapp_no;
    this.DAcontact_no=a.contact_no;


    this.editform.patchValue({
      id1: this.DAid,
      email1: this.DAmail,
      firstname1: this.DAname,
      lastname1: this.DAlastname,
      district1: this.DAdistrict,

      party_designation1: this.DAparty_desig,
      approval_status1: this.DAstatus,
      whatsapp_no1: this.DAwhats,
      contact_no1:this.DAcontact_no

    })
  }

  formReset() {
    this.distadminform.reset();
    this.FormIntialize();
    this.hidden = true;
    this.test_email = "false";
    this.test_ph = "false";
    this.test_email1 = "false";
    this.test_ph1 = "false";
  }
  old_mail: any;
  old_whatsapp: any;
  get_oldmail(old_record) {
    this.old_mail = old_record.email;
    this.old_whatsapp = old_record.whatsapp_no;
    console.log(this.old_whatsapp);
  }
  test_email = "false";
  test_email1 = "false";
  getemail(a, add) {
    if (add == 'ADD') {
      console.log(add);
      // console.log('old_em')
      // console.log( this.SAmail)
      if (this.distadminform.get('email').status == "VALID") {
        console.log(a);
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
        console.log("edit");
        console.log(a);
        console.log(this.old_mail);

        if (this.old_mail == a) {
          this.test_email1 = "false";
          console.log(this.test_email1);
        }
        else {
          this.ApiService.email_check().subscribe(data => {
            for (let email in data) {
              let b = data[email];
              // Do something with value
              if (a == b.email) {
                //console.log("tttt")
                this.test_email1 = "true";
                console.log(this.test_email1);
                break;
              }
              else {

                this.test_email1 = 'false';
                console.log(this.test_email1);
              }
            }

          });
        }
      }

    }

  }
  test_ph = "false";
  test_ph1 = "false";
  getphone(c, add) {
    // console.log(add)
    if (add == 'ADD') {
      if (this.distadminform.get('whatsapp_no').status == "VALID") {
        // console.log(c);
        this.ApiService.ph_check().subscribe(data => {
          //  console.log(data);
          for (let whatsapp_no in data) {
            let d = data[whatsapp_no];
            //  console.log(d.whatsapp_no );
            // Do something with value
            if (c == d.whatsapp_no) {
              //console.log("tttt")
              this.test_ph = "true";
              // console.log(this.test_ph);
              break;
            }
            else {
              //console.log("esle")
              this.test_ph = 'false';
              // console.log(this.test_ph  );
            }
          }
        });
      }
    }
    else {
      if (this.editform.get('whatsapp_no1').status == "VALID") {

        // console.log("edit");      
        // console.log(this.old_whatsapp);
        // console.log(c);
        if (this.old_whatsapp == c) {
          this.test_ph1 = "false";
          // console.log(this.test_ph)

        }
        else {
          this.ApiService.ph_check().subscribe(data => {
            // console.log(data);
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



  updatedata(updateform: any) {

    console.log(updateform.value);

    if (this.editform.valid == true && this.test_email == 'false' && this.test_ph == 'false') {
      this.spinner = true;

      this.ApiService.updateDA('1', this.DAid, updateform.get('firstname1').value, updateform.get('lastname1').value,

        updateform.get('district1').value,
        updateform.get('party_designation1').value,
        updateform.get('email1').value,
        updateform.get('whatsapp_no1').value,
        updateform.get('approval_status1').value,"",
        updateform.get('contact_no1').value)


        .pipe()
        .subscribe(
          data => {
            this.spinnerService.hide();
            setTimeout(function () {
              alert("District admin detail was updated!");
              window.location.reload();
            }, 100)

          },

          error => {
            console.log(error);
          });
    }
  }
}
