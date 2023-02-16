import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
// import { AnyARecord } from 'dns';
// import { Password } from 'primeng/password';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  redirectUrl!: string;
        baseUrl:string = "https://redmindtechnologies.com/dmk_dev/";
          // baseUrl:string="http://localhost/dmk_php/";
@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  valueChanges: any;
constructor(private httpClient : HttpClient) { };


user_district:any='null';


public mydist = [
    {
        name:'Select District',
        value:''
    },
    {
      name: "Namakkal",
      value:'Namakkal'
    },
    {
      name: "Salem",
      value:"Salem"
    },
    {
      name: "Trichy",
      value:"Trichy",
    },
    {
      name: "Erode",
      value:"Erode"
    },
];

public constituencies=[
  { name:'Select constituencies/தொகுதியைத் தேர்ந்தெடுக்கவும்'},{ name:'Salem (West)'}, { name:'Salem (North)'}, { name:'Salem (South)'}, { name:'Veerapandi'}, { name:'Rasipuram'},
  { name:'Senthamangalam'}, { name:'Attur'}, { name:'Yercaud'}, { name:'Namakkal'}, { name:'Rasipuram'},
  { name:'Erode (East)'}, { name:'Erode (West)'},

]
public districts=[
  { name:'Salem (West)'}, { name:'Salem (North)'}, { name:'Salem (South)'}, { name:'Veerapandi'}, { name:'Rasipuram'},
  { name:'Senthamangalam'}, { name:'Attur'}, { name:'Yercaud'}, { name:'Namakkal'}, { name:'Rasipuram'},
  { name:'Erode (East)'}, { name:'Erode (West)'},

]
// public all_districts=['Select District','ARIYALUR','CHENGALPATTU','CHENNAI','COIMBATORE','CUDDALORE','DHARMAPURI','DINDIGUL','ERODE','KALLAKURICHI',
// 'KANCHEEPURAM','KANNIYAKUMARI','KARUR', 'KRISHNAGIRI', 'MADURAI', 'NAGAPATTINAM','NAMAKKAL','PERAMBALUR','PUDUKKOTTAI',
// 'RAMANATHAPURAM','RANIPET','SALEM','SIVAGANGA','TENKASI','THANJAVUR','THE NILGIRIS','THENI','THIRUVALLUR','THIRUVARUR','THOOTHUKUDI',
// 'TIRUCHIRAPPALLI','TIRUNELVELI','TIRUPATHUR','TIRUPPUR','TIRUVANNAMALAI','VELLORE','VILLUPPURAM','VIRUDHUNAGAR'];
public all_districts=['Select District','ARIYALUR','CHENGALPATTU','CHENNAI','COIMBATORE','CUDDALORE','DHARMAPURI','DINDIGUL','ERODE','KALLAKURICHI',
'KANCHEEPURAM','KANNIYAKUMARI','KARUR', 'KRISHNAGIRI', 'MADURAI', 'NAGAPATTINAM','NAMAKKAL','PERAMBALUR','PUDUKKOTTAI',
'RAMANATHAPURAM','RANIPET','SALEM','SIVAGANGA','TENKASI','THANJAVUR','THE NILGIRIS','THENI','THIRUVALLUR','THIRUVARUR','THOOTHUKUDI',
'TIRUCHIRAPPALLI','TIRUNELVELI','TIRUPATHUR','TIRUPPUR','TIRUVANNAMALAI','VELLORE','VILLUPPURAM','VIRUDHUNAGAR'];

public all_constituency={'ARIYALUR':['ARIYALUR','JAYANKONDAM'],
'CHENGALPATTU':['CHENGALPATTU','CHEYYUR','MADURANTAKAM','PALLAVARAM','SHOLINGANALLUR','TAMBARAM','THIRUPORUR'],
'CHENNAI':['ANNA NAGAR','CHEPAUK-THIRUVALLIKENI','DR.RADHAKRISHNAN NAGAR','EGMORE','HARBOUR','KOLATHUR','MYLAPORE','PERAMBUR','ROYAPURAM','SAIDAPET','THIRU-VI-KA-NAGAR',
'THIYAGARAYANAGAR','THOUSAND LIGHTS','VELACHERY','VILLIVAKKAM','VIRUGAMPAKKAM'],
'COIMBATORE':['COIMBATORE NORTH','COIMBATORE SOUTH','KAVUNDAMPALAYAM','KINATHUKADAVU','METTUPALAYAM','POLLACHI','SINGANALLUR','SULUR','THONDAMUTHUR','VALPARAI'],
'CUDDALORE':['BHUVANAGIRI','CHIDAMBARAM','CUDDALORE','KATTUMANNARKOIL','KURINJIPADI','NEYVELI','PANRUTI','TITTAKUDI','VRIDHACHALAM'],
'DHARMAPURI':[ 'DHARMAPURI','HARUR','PALACODE','PAPPIREDDIPATTI','PENNAGARAM'],
'DINDIGUL':['ATHOOR','DINDIGUL','NATHAM','NILAKKOTTAI','ODDANCHATRAM','PALANI','VEDASANDUR'],
'ERODE':[ 'ANTHIYUR','BHAVANI','BHAVANISAGAR','ERODE EAST','ERODE WEST','GOBICHETTIPALAYAM','MODAKKURICHI','PERUNDURAI'],
'KALLAKURICHI':['KALLAKURICHI','RISHIVANDIYAM','SANKARAPURAM','ULUNDURPETTAI'],
'KANCHEEPURAM':['ALANDUR','KANCHEEPURAM','SRIPERUMBUDUR','UTHIRAMERUR'],
'KANNIYAKUMARI':['COLACHAL','KANNIYAKUMARI','KILLIYOOR','NAGERCOIL','PADMANABHAPURAM','VILAVANCODE'],
'KARUR':[ 'ARAVAKURICHI','KARUR','KRISHNARAYAPURAM','KULITHALAI'],
'KRISHNAGIRI':['BARGUR','HOSUR','KRISHNAGIRI','THALLY','UTHANGARAI','VEPPANAHALLI'],
'MADURAI':['MADURAI CENTRAL','MADURAI EAST','MADURAI NORTH','MADURAI SOUTH','MADURAI WEST','MELUR','SHOLAVANDAN','THIRUMANGALAM','THIRUPARANKUNDRAM','USILAMPATTI'],
'NAGAPATTINAM':['KILVELUR','MAYILADUTHURAI','NAGAPATTINAM','POOMPUHAR','SIRKAZHI','VEDHARANYAM'],
'NAMAKKAL':['KUMARAPALAYAM','NAMAKKAL','PARAMATHIVELUR','RASIPURAM','SENTHAMANGALAM','TIRUCHENGODU'],
'PERAMBALUR':['KUNNAM','PERAMBALUR'],
'PUDUKKOTTAI':['ALANGUDI','ARANTHANGI','GANDARVAKOTTAI','PUDUKKOTTAI','THIRUMAYAM','VIRALIMALAI'],
'RAMANATHAPURAM':['MUDUKULATHUR','PARAMAKUDI','RAMANATHAPURAM','TIRUVADANAI'],
'RANIPET':['ARAKKONAM','ARCOT','RANIPET','SHOLINGHUR'],
'SALEM':['ATTUR','EDAPPADI','GANGAVALLI','METTUR','OMALUR','SALEM NORTH','SALEM SOUTH','SALEM WEST','SANKARI','VEERAPANDI','YERCAUD'],
'SIVAGANGA':['KARAIKUDI','MANAMADURAI','SIVAGANGA','TIRUPPATHUR'],
'TENKASI':['ALANGULAM','KADAYANALLUR','SANKARANKOVIL','TENKASI','VASUDEVANALLUR'],
'THANJAVUR':['KUMBAKONAM','ORATHANADU','PAPANASAM','PATTUKKOTTAI','PERAVURANI','THANJAVUR','THIRUVAIYARU','THIRUVIDAIMARUDUR'],
'THE NILGIRIS':['COONOOR','GUDALUR','UDHAGAMANDALAM'],
'THENI':['ANDIPATTI','BODINAYAKKANUR','CUMBUM','PERIYAKULAM'],
'THIRUVALLUR':['AMBATTUR','AVADI','GUMMIDIPOONDI','MADHAVARAM','MADHURAVOYAL','PONNERI','POONAMALLEE','THIRUVALLUR','THIRUVOTTIYUR','TIRUTTANI'],
'THIRUVARUR':['MANNARGUDI','NANNILAM','THIRUTHURAIPOONDI','THIRUVAUR'],
'THOOTHUKUDI':['KOVILPATTI','OTTAPIDARAM','SRIVAIKUNTAM','THOOTHUKUDI','TIRUCHENDUR','VILATHIKULAM'],
'TIRUCHIRAPPALLI':['LALGUDI','MANACHANALLUR','MANAPPARAI','MUSIRI','SRIRANGAM','THIRUVERUMBUR','THURAIYUR','TIRUCHIRAPPALLI EAST','TIRUCHIRAPPALLI WEST'],
'TIRUNELVELI':['AMBASAMUDRAM','NANGUNERI','PALAYAMKOTTAI','RADHAPURAM','TIRUNELVELI'],
'TIRUPATHUR':['AMBUR','JOLARPET','TIRUPATTUR','VANIYAMBADI'],
'TIRUPPUR':['AVANASHI','DHARAPURAM','KANGAYAM','MADATHUKULAM','PALLADAM','TIRUPPUR NORTH','TIRUPPUR SOUTH','UDUMALAIPETTAI'],
'TIRUVANNAMALAI':['ARANI','CHENGAM','CHEYYAR','KALASAPAKKAM','KILPENNATHUR','POLUR','TIRUVANNAMALAI','VANDAVASI'],
'VELLORE':['ANAIKATTU','GUDIYATTAM','KATPADI','KILVAITHINANKUPPAM','VELLORE'],
'VILLUPPURAM':['GINGEE','MAILAM','TINDIVANAM','TIRUKKOYILUR','VANUR','VIKRAVANDI','VILLUPURAM'],
'VIRUDHUNAGAR':['ARUPPUKOTTAI','RAJAPALAYAM','SATTUR','SIVAKASI','SRIVILLIPUTHUR','TIRUCHULI','VIRUDHUNAGAR'],

};

public all_designation=['Select designation ','District President / மாவட்ட தலைவர்','District Vice President / மாவட்ட துணை தலைவர்','District Organiser / மாவட்ட அமைப்பாளர்','District Deputy Organiser / மாவட்ட துணை அமைப்பாளர்','Union Organiser / ஒன்றிய அமைப்பாளர்','Union Deputy Organiser / ஒன்றிய துணை அமைப்பாளர்','City Organiser / நகர அமைப்பாளர்','City Deputy Organiser / நகர துணை அமைப்பாளர்','Area Organiser / பகுதி அமைப்பாளர்','Area Deputy Organiser / பகுதி துணை அமைப்பாளர்','illage Organiser / ஊரக அமைப்பாளர்','Village Deputy Organiser / ஊரக துணை அமைப்பாளர்'];



public constituency:any='No-Select';



public userlogin(username : any, password :any) {

return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
.pipe(map(Users => {
  //this.user_district= Users[0].district;
  localStorage.setItem('user_district', JSON.stringify(Users[0].district));

this.setToken(Users[0].name);
this.getLoggedInName.emit(true);
return Users;
//console.log(Users);
}));
}

public userregistration(email : any,firstname:any,lastname:any,father_name:any,district:any,contact_no:any,date_of_birth:any,educational_qualification:any,profession:any,location_id:any) {
  const httpOptions : Object = {
    headers: new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
    })
  };

return this.httpClient.post<any>(this.baseUrl + '/register.php', { email,firstname,lastname,father_name,district,contact_no,date_of_birth,educational_qualification,profession,location_id })
.pipe(map(Users => {
return Users;
}));
}

public create_state_admin(mode:any,email:any,firstname:any,lastname:any,whatsapp_no:any,party_designation:any,approval_status:any,location_id:any) {
  const httpOptions : Object = {
          headers: new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded'
          })
        };
  return this.httpClient.post<any>(this.baseUrl + '/create.php?category=SA', { mode,email,firstname,lastname,whatsapp_no,party_designation,approval_status,location_id },httpOptions )
  .pipe(map(Users => {
  return Users;
  }))
  }

    public create_dist_admin(mode:any,whatsapp_no:any,email:any,firstname:any,lastname:any,district:any,party_designation:any,approval_status:any,location_id:any) {
      const httpOptions : Object = {
        headers: new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      };
      return this.httpClient.post<any>(this.baseUrl + '/create.php?category=DA', {mode, whatsapp_no,email,firstname,lastname,district,party_designation,approval_status,location_id },httpOptions )
        .pipe(map(Users => {
        return Users;
        }));
        }

          public create_office_bearers(mode:any,email:any,firstname:any,lastname:any,age:any,father_name:any,mother_name:any,educational_qualification:any,date_of_birth:any,additional_qualification:any,contact_no:any,whatsapp_no:any,profession:any,address1:any,applied_role:any,party_comments:any,location_id:any,district:any,constituency:any) {
            return this.httpClient.post<any>(this.baseUrl + '/create.php?category=OB', { mode,email,firstname,lastname,age,father_name,mother_name,educational_qualification,date_of_birth,additional_qualification,contact_no,whatsapp_no,profession,address1,applied_role,party_comments,location_id,district,constituency })
            .pipe(map(Users => {
            return Users;
            }));
            }

            // public delete_admin(user_id:any) {
            //     return this.httpClient.post<any>(this.baseUrl + '/delete.php', { user_id})
            //     .pipe(map(Users => {
            //     return Users;
            //     }));
            //     }
            public delete_admin(user_id:any) {
              const httpOptions : Object = {
                headers: new HttpHeaders({
                  'Content-Type':'application/x-www-form-urlencoded'
                })
              };
                return this.httpClient.post<any>(this.baseUrl + '/delete.php', { user_id},httpOptions)
                .pipe(map(Users => {
                return Users;
                }));
                }

tabledata:any[]=[]
public viewtableSA() {
          //  this.httpClient.get<any>(this.baseUrl+'/show.php?mode=0')
          //     .pipe(map((res)=>{
          //         const users =[];
          //         for(const key in res){
          //             if(res.hasOwnProperty(key)){
          //                 users.push({...res[key],id:key})}
          //         } return users;
          //     })).subscribe((users:any[])=>{
          //         console.log(users);
          //         this.tabledata=users[0];
          //         return this.tabledata;
          //         console.log(this.tabledata);
          //         })}
          //         public viewtableSA1():Observable<any> {
          //          return this.httpClient.get<any>(this.baseUrl+'/show.php?mode=0')
          return this.httpClient.get(this.baseUrl+'/show.php?mode=0');
                       }

tabledataDA:any[]=[];
public viewtableDA() {
          //  this.httpClient.get<any>(this.baseUrl + '/show.php?mode=1')
          //     .pipe(map((res)=>{

          //         const users =[];
          //         for(const key in res){
          //             if(res.hasOwnProperty(key)){
          //                 users.push({...res[key],id:key})}
          //         } return users;
          //     })).subscribe((users:any[])=>{

          //         this.tabledataDA=users[0];
          //         })
          return this.httpClient.get(this.baseUrl + '/show.php?mode=1');
    

    }


                  tabledataOB:any[]=[];
                      public viewtableOB() {
                      // this.httpClient.get<any>(this.baseUrl +'/show.php?mode=2')
                      //                   .pipe(map((res)=>{
                      //                             const users =[];
                      //                             for(const key in res){
                      //                                 if(res.hasOwnProperty(key)){
                      //                                     users.push({...res[key],id:key})}
                      //                             } return users;
                      //                         })).subscribe((users:any[])=>{
                      //                             //console.log(users)
                      //                             this.tabledataOB=users[0];
                      //                             })
                      return this.httpClient.get(this.baseUrl +'/show.php?mode=2');
                    }

               tabledataOBapprove:any[]=[];
                public viewtableOBapprove() {

                // this.httpClient.get<any>(this.baseUrl +'/rolechange_approvel_show.php')
                // .pipe(map((res)=>{
                //   const users =[];
                //   for(const key in res){
                //   if(res.hasOwnProperty(key)){
                //     users.push({...res[key],id:key})}
                //    } return users;
                //    })).subscribe((users:any[])=>{
                //     console.log(users);
                //    this.tabledataOBapprove=users[0];
                //     })
                return this.httpClient.get(this.baseUrl +'/rolechange_approvel_show.php');
            }

            barchartdatada:any[]=[];
            public chartdatada() {
              return this.httpClient.get(this.baseUrl +'/dashboardda.php');
            }
          public sendmail(email:any) {
            return this.httpClient.post<any>(this.baseUrl + 'send_email.php', { email })
            .pipe(map(Users => {
            return Users;
            }));
            }
            public userreg_email(email:any,firstname:any,lastname:any,father_name:any,district:any,contact_no:any,date_of_birth:any,educational_qualification:any,profession:any) {
              return this.httpClient.post<any>(this.baseUrl + '/self_reg_email.php', { email,firstname,lastname,father_name,district,contact_no,date_of_birth,educational_qualification,profession })
              .pipe(map(Users => {
              return Users;
              }));
              }
            public resetpassword(email:any,password:any,cpassword:any) {
                return this.httpClient.post<any>(this.baseUrl + '/update_password.php', { email,password,cpassword })
                .pipe(map(Users => {
                return Users;
                }));
                }
                public updateSA(mode:any,user_id:any,firstname:any,lastname:any,whatsapp_no:any,party_designation:any,email:any,approval_status:any,location_id='1') {
                  //let firstname='names'
                  const httpOptions : Object = {
                          headers: new HttpHeaders({
                            'Content-Type':'application/x-www-form-urlencoded'
                          })
                        };
                        console.log(user_id);
                    console.log("apidata : "+user_id,firstname,lastname,whatsapp_no,party_designation,approval_status)
                        return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=0', {mode,user_id,firstname,lastname,whatsapp_no,party_designation,email,approval_status,location_id},httpOptions)
                                .pipe(map(Users => {
                                return Users;
                                }));
                          }

      public approve_role(user_id:any,new_role:any,status:any) {
            //console.log(new_role);
                           // new_role="head";
                           // user_id = ar_id;
        const httpOptions : Object = {
           headers: new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded'
                 })
                            };
            return this.httpClient.post<any>(this.baseUrl + '/rolechange_app_rej.php', { user_id,new_role,status},httpOptions)
            .pipe(map(Users => {
              return Users;
                  }));
                              }

                                public create_meeting(meeting_name:any,meeting_date:any,meeting_time:any,participants:any,meeting_type:any,meeting_location:any, comments:any,constituency:any) {
                                  console.log(constituency);
                                return this.httpClient.post<any>(this.baseUrl + '/createmeeting.php',
                                { meeting_name,meeting_time,meeting_date,participants,meeting_type,meeting_location,comments,constituency},)
                                .pipe(map(Users => {
                                return Users;
                                }));
                                }

                                public rq_form(name:any,user_id:any,email:any,old_designation:any,new_designation:any, reason:any) {
                                  const httpOptions: Object = {
                                    headers: new HttpHeaders({
                                      'Content-Type': 'application/x-www-form-urlencoded'
                                    })
                                  };
                               // console.log("sdf")
                                  //console.log(name);
                                 return this.httpClient.post<any>(this.baseUrl + '/rolechange_req.php',
                                  {name,email,old_designation,new_designation,reason ,user_id},httpOptions)
                                  .pipe(map(Users => {
                                  return Users;
                                  }));

                                }
                                public updateDA(mode:any,user_id:any,firstname:any,lastname:any,district:any,party_designation:any,email:any,whatsapp_no:any,approval_status:any,location_id='1') {
                                  //let firstname='names'
                                  const httpOptions : Object = {
                                          headers: new HttpHeaders({
                                            'Content-Type':'application/x-www-form-urlencoded'
                                          })
                                        };
                                        console.log(user_id);
                                    console.log("apidata : "+user_id,firstname,lastname,district,party_designation,approval_status)
                                        return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=1', {mode,user_id,firstname,lastname,district,party_designation,email,whatsapp_no,approval_status,location_id},httpOptions)
                                                .pipe(map(Users => {
                                                return Users;
                                                }));
                                          } 

                                          public updateOB(mode:any,user_id:any,email:any,firstname:any,lastname:any,age:any,father_name:any,mother_name:any,educational_qualification:any,date_of_birth:any,additional_qualification:any,contact_no:any,whatsapp_no:any,profession:any,address:any,applied_role:any,
                                            party_comments:any,location_id:'1',district:any,constituency:any) {
                                            //let firstname='names'
                                            const httpOptions : Object = {
                                                    headers: new HttpHeaders({
                                                      'Content-Type':'application/x-www-form-urlencoded'
                                                    })
                                                  };
                                                  console.log(user_id);
                                              // console.log("apidata : "+user_id,firstname,lastname,father_name,educational_qualification,date_of_birth,additional_qualification,contact_no,whatsapp_no,profession,address,applied_role,party_comments,location_id)
                                                  return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=2', {mode,user_id,email,firstname,lastname,age,father_name,mother_name,educational_qualification,date_of_birth,additional_qualification,contact_no,whatsapp_no,profession,address,applied_role,
                                                    party_comments,location_id,district,constituency},httpOptions)
                                                          .pipe(map(Users => {
                                                          return Users;
                                                          }));
                                                    }

                                                    tabledatameeting:any[]=[];
                                                    public viewtablemeeting() {
                                                    // this.httpClient.get<any>(this.baseUrl +'/tablemeeting.php')
                                                    //                   .pipe(map((res)=>{
                                                    //                             const users =[];
                                                    //                             for(const key in res){
                                                    //                                 if(res.hasOwnProperty(key)){
                                                    //                                     users.push({...res[key],id:key})}
                                                    //                             } return users;
                                                    //                         })).subscribe((users:any[])=>{
                                                    //                             //console.log(users)
                                                    //                             this.tabledatameeting=users[0];
                                                    //                             })
                                                    return this.httpClient.get(this.baseUrl +'/tablemeeting.php');
                                                                              }


//    public updateSA(mode:any,firstname:any,lastname:any,designation:any,party_designation:any,email:any,approval_status:any,location_id='1') {
//  const httpOptions : Object = {
//       headers: new HttpHeaders({
//         'Content-Type':'application/x-www-form-urlencoded'
//       })
//     };
//       console.log("apidata"+firstname,lastname,designation,party_designation,approval_status,mode)
//           return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=0', {mode,firstname,lastname,designation,party_designation,email,approval_status,location_id})
//                   .pipe(map(Users => {
//                   return Users;
//                   }));
//             }
  // public delete_admin(user_id:any) {
  //   const httpOptions : Object = {
  //     headers: new HttpHeaders({
  //       'Content-Type':'application/x-www-form-urlencoded'
  //     })
  //   };
  //     return this.httpClient.post<any>(this.baseUrl + '/delete.php', { user_id},httpOptions)
  //     .pipe(map(Users => {
  //     return Users;
  //     }));
  //     }


  barchartdatasa:any[]=[];
  public chartdatasa() {
    return this.httpClient.get(this.baseUrl +'/dashboardsabar.php');
  }

            piechartdatada:any[]=[];
            public piedatada() {
              return this.httpClient.get(this.baseUrl +'/dashboarddamonth.php');
            }
            dashboardcarddata:any[]=[];
            public dashboardcardda() {
              return this.httpClient.get(this.baseUrl +'/dashboarddacard.php');
            }
            public deletemeeting(id:any) {
              const httpOptions : Object = {
                headers: new HttpHeaders({
                  'Content-Type':'application/x-www-form-urlencoded'
                })
              };
                return this.httpClient.post<any>(this.baseUrl + '/deletemeeting.php', { id},httpOptions)
                .pipe(map(Users => {
                return Users;
                }));
                }


//token
setToken(token: string) {
  localStorage.setItem('token', token);
  }
  getToken() {
  return localStorage.getItem('token');
  }
  deleteToken() {
  localStorage.removeItem('token');
  }
  isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
  return true
  }
  return false;
  }

}
