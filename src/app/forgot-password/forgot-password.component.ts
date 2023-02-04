import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/_service/api-service.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  sendmail:FormGroup;

  constructor(public ApiService:ApiServiceService,
    private fb: FormBuilder, private router:Router) { 
      this.sendmail = this.fb.group({
        email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
        });
    }

  ngOnInit(): void {
  }

  postdata(forgotForm : any)
{
console.log(this.sendmail)
this.ApiService.sendmail(forgotForm.value.email)
.subscribe(
data => {
alert("The reset link has been sent to your registeres mail");
this.router.navigate(['']);
},
error => {
    console.log(error)
    alert("The reset link has been sent to your registeres mail");
    this.sendmail.reset();
    this.router.navigate(['']);
});
}

}
