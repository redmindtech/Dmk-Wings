import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/_service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-office-bearer-approval',
  templateUrl: './office-bearer-approval.component.html',
  styleUrls: ['./office-bearer-approval.component.scss']
})
export class OfficeBearerApprovalComponent implements OnInit {

  customers:any;
  dtOptions: DataTables.Settings = {};
  constructor(public ApiService:ApiServiceService,
    public router:Router) { }

  ngOnInit(): void {
    this.ApiService.viewtableOBapprove();
    this.ApiService.viewtableDA();
    this.ApiService.viewtableOB();
    this.ApiService.viewtableOBapprove();
    this.getdata();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
  getdata(){
    this.customers=[];
        for(const prop in this.ApiService.tabledataOBapprove) {
            this.customers.push(this.ApiService.tabledataOBapprove[prop])
          }
          this.customers.pop();
    console.log(this.ApiService.tabledataOBapprove)

  }
  // delete_ob(user_id : any)
  //   {
  //       console.log(user_id)
  //           this.ApiService.delete_admin(user_id)
  //           .pipe()
  //           .subscribe(
  //           data => {

  //               //this.router.navigate(['uikit/formlayout']);
  //               alert("Office Bearer detail has been deleted !")
  //           },

  //           error => {
  //               console.log(error);
  //           });

  //   }

  approve_role_change(user_id : any,new_role : any,status:any)
    {   
        //console.log(new_role);
        this.ApiService.approve_role(user_id,new_role,status)
            .pipe()
            .subscribe(
            data => {if(status=='approve'){
              this.router.navigate(['superadmin/Dashboard']);
              alert("Approved !")
            }
            else{
              this.router.navigate(['superadmin/Dashboard']);
              alert("Rejected !")
            }

                
            },

            error => {
                console.log(error);
            });
    }

  

}
