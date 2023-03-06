import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/_service/api-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  resetpassword:FormGroup;
    sent_email:string;
  

  constructor(public ApiService:ApiServiceService,
    private route:ActivatedRoute,
    private fb: FormBuilder, private router:Router
    
    ) {
      this.sent_email=this.route.snapshot.params['email'];
      this.resetpassword = this.fb.group({
        email: [this.sent_email, [Validators.required,Validators.minLength(1), Validators.email]],
        password:['',[Validators.required]],
        cpassword:['',[Validators.required]],
        }); 
      
    }

  ngOnInit(): void {
  }
  postdata(forgotForm : any)
  { 
    // console.log(forgotForm.value.password);
    // console.log(forgotForm.value.cpassword);
    // console.log("forgotForm.value.email");

    if(forgotForm.value.password==forgotForm.value.cpassword)
    {
      if(forgotForm.value.password != '' && forgotForm.value.cpassword!= '' ){
        console.log(forgotForm.value.password);
      this.ApiService.resetpassword(forgotForm.value.email,forgotForm.value.password,forgotForm.value.cpassword)
      .subscribe( data => {
                      alert("Password has been updated");
                      this.resetpassword.reset();
                      this.router.navigate(['']);},
                  error => {
                      console.log(error)});
      // console.log('if');
    }
    else{
    alert("Please enter password");
    }
  }
    else{
      alert("Password and confirm password not same");
      window.location.reload()
      
    }
  }
get email() { return this.resetpassword.get('email'); }
get password() { return this.resetpassword.get('password'); }
get cpassword() { return this.resetpassword.get('cpassword'); }

 

}