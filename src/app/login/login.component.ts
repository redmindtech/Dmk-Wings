import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiServiceService } from '../_service/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   
  userForm: FormGroup;
  @Output() districtadmin_constituency: EventEmitter<any> = new EventEmitter();

  constructor( private fb: FormBuilder,
    private dataService: ApiServiceService,
    private router:Router) { 
      this.userForm = this.fb.group({
        whatsapp_no: ['',[Validators.required,Validators.pattern('[6789][0-9]{9}')]],
        password: ['', Validators.required]
        });
        //console.log(this.userForm);
    }

  ngOnInit(): void {
  }
  postdata(userForm : any)
{
this.dataService.userlogin(userForm.value.whatsapp_no,userForm.value.password)
.pipe(first())
.subscribe(
data => {
    console.log(data);
    console.log(data[0].category)
    if(data[0].category=='SAD'){
const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : 'superadmin';
this.router.navigate([redirect]);
this.districtadmin_constituency.emit(data[0].district);
    }
    else if(data[0].category=='SA'){
      const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : 'stateadmin';
this.router.navigate([redirect]);
this.districtadmin_constituency.emit(data[0].district);
    }
    else if(data[0].category=='DA'){
      const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : 'districtadmin';
this.router.navigate([redirect]);

this.districtadmin_constituency.emit(data[0].district);

    }

},
error => {
alert("User name or password is incorrect")
});
}
get whatsapp_no() { return this.userForm.get('whatsapp_no'); }
get password() { return this.userForm.get('password'); }




}
