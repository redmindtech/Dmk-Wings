import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointDistrictOffBearerComponent } from './districtadmin-menu/appoint-district-off-bearer/appoint-district-off-bearer.component';
import { CreateOffBearerComponent } from './districtadmin-menu/create-off-bearer/create-off-bearer.component';
import { DaDashboardComponent } from './districtadmin-menu/da-dashboard/da-dashboard.component';
import { DistrictadminMenuComponent } from './districtadmin-menu/districtadmin-menu.component';
import { DistrictwiseEngReportComponent } from './districtadmin-menu/districtwise-eng-report/districtwise-eng-report.component';
import { ReqOffBearerChangeComponent } from './districtadmin-menu/req-off-bearer-change/req-off-bearer-change.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SelfRegistrationComponent } from './self-registration/self-registration.component';
import { CreateMeetingsComponent } from './stateadmin-menu/create-meetings/create-meetings.component';
import { ReportAllDistrictComponent } from './stateadmin-menu/report-all-district/report-all-district.component';
import { SADashboardComponent } from './stateadmin-menu/sa-dashboard/sa-dashboard.component';
import { SentMeetingsNotifyComponent } from './stateadmin-menu/sent-meetings-notify/sent-meetings-notify.component';
import { StateadminMenuComponent } from './stateadmin-menu/stateadmin-menu.component';
import { AppOrRejComponent } from './superadmin-dashboard/app-or-rej/app-or-rej.component';
import { DashboardComponent } from './superadmin-dashboard/dashboard/dashboard.component';
import { DistrictadminComponent } from './superadmin-dashboard/districtadmin/districtadmin.component';
import { MeetingsComponent } from './superadmin-dashboard/meetings/meetings.component';
import { OfficeBearerApprovalComponent } from './superadmin-dashboard/office-bearer-approval/office-bearer-approval.component';
import { ReportsComponent } from './superadmin-dashboard/reports/reports.component';
import { SignOutComponent } from './superadmin-dashboard/sign-out/sign-out.component';
import { StateadminComponent } from './superadmin-dashboard/stateadmin/stateadmin.component';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"superadmin", component: SuperadminDashboardComponent,
        children: [
          { path: '', component: DashboardComponent},
          { path: 'Dashboard', component: DashboardComponent},
          { path: 'Districtadmin', component: DistrictadminComponent},
          { path:"Stateadmin", component: StateadminComponent},
          { path:"Approve-Reject", component: AppOrRejComponent},
          { path:"Meetings", component: MeetingsComponent},
          { path:"Reports", component: ReportsComponent},
          { path:"office-bearer-approval", component: OfficeBearerApprovalComponent},
          ],},
  {path:"stateadmin", component: StateadminMenuComponent,
          children: [
            { path: '', component: SADashboardComponent},
            { path: 'Dashboard', component: SADashboardComponent},
            { path: 'create-meetings', component: CreateMeetingsComponent },
            { path: 'sent-meetings-notification', component: SentMeetingsNotifyComponent},
            { path: 'report-of-all-districts', component: ReportAllDistrictComponent},
            ],},

  {path:"districtadmin", component: DistrictadminMenuComponent ,
            children: [
              { path: '', component: DaDashboardComponent},
              { path: 'Dashboard', component: DaDashboardComponent},
              { path: 'create-office-bearers', component: CreateOffBearerComponent},
              { path: 'appoint-district-office-bearers', component: AppointDistrictOffBearerComponent},
              { path: 'request-office-bearers-change', component: ReqOffBearerChangeComponent},
              { path: 'districtwise-engieers-report', component: DistrictwiseEngReportComponent},
              ],},
  {path:"forgot_password", component: ForgotPasswordComponent},
  {path:"self-registration", component: SelfRegistrationComponent},
  {path:"**",redirectTo:'', component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
