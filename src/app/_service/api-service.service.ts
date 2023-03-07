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
          //  baseUrl:string="http://localhost/dmk_php/";
@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  valueChanges: any;
  district: any;
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
public all_districts=['Chennai North District', 'Chennai North East District', 'Chennai East District', 'Chennai West District', 'Chennai South West District', 'Chennai South District',
'Thiruvallur East District', 'Thiruvallur Central District', 'Thiruvallur West District', 'Kanchipuram North District', 'Kanchipuram South District', 'Ranipet District', 'Vellore District',
'Tirupattur District', 'Tiruvannamalai North District', 'Tiruvannamalai South District', 'Villupuram North District', 'Villupuram South District', 'Kallakurichi North District', 'Kallakurichi South District',
'Cuddalore East District', 'Cuddalore West District', 'Thanjavur North District', 'Thanjavur Central District', 'Thanjavur South District', 'Mayiladuthurai District', 'Nagai District', 'Tiruvarur District',
'Trichy North District', 'Trichy Central District', 'Trichy South District', 'Perambalur District', 'Ariyalur District', 'Karur District', 'Pudukottai North District', 'Pudukottai South District', 'Salem East District',
'Salem West District', 'Salem Central District', 'Namakkal East District', 'Namakkal West District', 'Dharmapuri East District', 'Dharmapuri West District', 'Krishnagiri East District', 'Krishnagiri West District', 'Coimbatore North District',
'Ramanathapuram District', 'Sivagangai District', 'Virudhunagar North District', 'Virudhunagar South District', 'Tirunelveli East District', 'Tirunelveli Central District','Tenkasi North District',
'Tenkasi South District','Thoothukudi North District','Thoothukudi South District','Kanyakumari East District','Kanyakumari West Distric'];

public meeting_districts=['Chennai North District', 'Chennai North East District', 'Chennai East District', 'Chennai West District', 'Chennai South West District', 'Chennai South District',
'Thiruvallur East District', 'Thiruvallur Central District', 'Thiruvallur West District', 'Kanchipuram North District', 'Kanchipuram South District', 'Ranipet District', 'Vellore District',
'Tirupattur District', 'Tiruvannamalai North District', 'Tiruvannamalai South District', 'Villupuram North District', 'Villupuram South District', 'Kallakurichi North District', 'Kallakurichi South District',
'Cuddalore East District', 'Cuddalore West District', 'Thanjavur North District', 'Thanjavur Central District', 'Thanjavur South District', 'Mayiladuthurai District', 'Nagai District', 'Tiruvarur District',
'Trichy North District', 'Trichy Central District', 'Trichy South District', 'Perambalur District', 'Ariyalur District', 'Karur District', 'Pudukottai North District', 'Pudukottai South District', 'Salem East District',
'Salem West District', 'Salem Central District', 'Namakkal East District', 'Namakkal West District', 'Dharmapuri East District', 'Dharmapuri West District', 'Krishnagiri East District', 'Krishnagiri West District', 'Coimbatore North District',
'Ramanathapuram District', 'Sivagangai District', 'Virudhunagar North District', 'Virudhunagar South District', 'Tirunelveli East District', 'Tirunelveli Central District','Tenkasi North District',
'Tenkasi South District','Thoothukudi North District','Thoothukudi South District','Kanyakumari East District','Kanyakumari West Distric'];

public all_constituency={ 'Chennai North District': ['Dr. Radhakrishnan Nagar', 'Perambur', 'Rayapuram'],
'Chennai North East District': ['Madhavaram', 'Tiruvottiyur'],
'Chennai East District': ['Ambattur', 'Kolathur', 'Williwakam', 'Thiru.Vi.Ka Nagar (Separate)', ' Egmore (Separate)', 'Harbour'],
'Chennai West District': ['Chepakkam-Thiruvallikkeni', 'Aayiram Vilakku', 'Anna Nagar'],
'Chennai South West District': ['Thiagaraya Nagar', 'Mylapore'],
'Chennai South District': ['Maduravoyal', 'Virugambakkam', 'Saidapet', 'Velachery', 'Sholinganallur'],
'Thiruvallur East District': ['Gummidipoondi', 'Ponneri (Separate)'],
'Thiruvallur Central District': ['Poovirundhavalli (Separate) ', 'Avadi'],
'Thiruvallur West District': ['Tiruthani', 'Thiruvallur'],
'Kanchipuram North District': ['Alandur', 'Thiruperumbudur (Separate)', 'Pallavaram', 'Tambaram', 'Chengalpattu', 'Tiruporur'],
'Kanchipuram South District': ['cheyyur (Separate)', 'Madhuranthakam (Separate)', 'Uttaramerur', 'Kanchipuram'],
'Ranipet District': ['Arakkonam (Separate),', 'Sholingur', 'Ranippet', 'Arcot'],
'Vellore District': ['Katpadi', 'Vellore', 'Anaikattu', 'Kilvaithinankuppam (Separate)', 'Gudiyatham (Separate)'],
'Tirupattur District': ['Vaniyampadi', 'Ambur', 'Jolarpet', 'Tirupattur'],
'Tiruvannamalai North District': ['Polur', 'Arani', 'Cheyyar', 'Vandavasi (Separate)'],
'Tiruvannamalai South District': ['Sengam (Separate)', 'Thiruvannamalai', 'Kilpennathur', 'Kalasapakkam'],
'Villupuram North District': ['Senji', 'Mayilam', 'Tindivanam (Separate)'],
'Villupuram South District': ['Vanur (Separate)', 'Villupuram', 'Vikravandi', 'Thirukovilur'],
'Kallakurichi North District': ['Ulundurpet', 'Shankarapuram'],
'Kallakurichi South District': ['Rishivantiyam', 'Kallakurichi (Separate)'],
'Cuddalore East District': ['Cuddalore', 'Kurinjipadi', 'Bhuvanagiri', 'Chidambaram', 'Kattumannarkoil  (Separate)'],
'Cuddalore West District': ['Tittakudi (Separate)', 'Virudhachalam', 'Neyveli', 'Panruti'],
'Thanjavur North District': ['Thiruvidaimarudur (Separate)', 'Kumbakonam', 'Papanasam'],
'Thanjavur Central District': ['Tiruvaiyar', 'Thanjavur', 'Orathanadu'],
'Thanjavur South District': ['Pattukottai', 'Peravurani'],
'Mayiladuthurai District': ['Sirkazhi ', 'Mayiladuthurai', 'Poompuhar'],
'Nagai District': ['Nagapattinam', 'Kilvelur ', 'Vedaranyam'],
'Tiruvarur District': ['Thirutharapoondi (Separate)', 'Mannargudi.', 'Tiruvarur', 'Nannilam'],
'Trichy North District': ['Manchanallur', 'Musiri', 'Thuraiyur (Separate)'],
'Trichy Central District': ['Thiruvarangam', 'Tiruchirappalli West', 'Lalgudi'],
'Trichy South District': ['Manaparai', 'Tiruchirappalli East', 'Thiruverumbur'],
'Perambalur District': ['Perambalur (Separate)', 'Kunnam'],
'Ariyalur District': ['Ariyalur', 'Jayankondam '],
'Karur District': ['Aravakurichi', 'Karur', 'Krishnarayapuram (Separate)', 'Kulithalai'],
'Pudukottai North District': ['Gandarvakottai (Separate)', 'Viralimalai', 'Pudukottai'],
'Pudukottai South District': ['Thirumayam', 'Alangudi', 'Aranthangi'],
'Salem East District': ['Gangavalli (Separate)', 'Attur', 'Yercaud (P.G.)', 'Veerapandi'],
'Salem West District': ['Mettur', 'Edappadi', 'Sankagiri'],
'Salem Central District': ['Omalur', 'Salem West', 'Salem North', 'Salem South'],
'Namakkal East District': ['Rasipuram (Separate)', 'Sendamangalam (P.G.)', 'Namakkal'],
'Namakkal West District': ['Paramathi-Velur', 'Thiruchengode', 'Kumarapalayam'],
'Dharmapuri East District': ['Dharmapuri', 'Panakaram'],
'Dharmapuri West District': ['Palakode', 'Pappireddipatti', 'Harur (Separate)'],
'Krishnagiri East District': ['Uthangarai (Separate)', 'Bargur', 'Krishnagiri '],
'Krishnagiri West District': ['Veppanahalli', 'Hosur ', 'Thally'],
'Coimbatore North District': ['Mettupalayam', 'Thondamuthur', 'Goundampalayam', 'Avinashi (Separate)'],



'Ramanathapuram District': ['Paramakudi (Separate)', ' Thiruvadanai', 'Ramanathapuram', 'Mudukulathur'],
'Sivagangai District': ['Karaikudi', 'Thiruppathur', 'Sivagangai', 'Manamadurai'],
'Virudhunagar North District': ['Sivakasi', 'Virudhunagar', 'Tiruchuli'],
'Virudhunagar South District': ['Rajapalayam', 'Thiruvilliputhur (Separate)', 'Chatur', 'Aruppukottai'],
'Tirunelveli East District': ['Ambasamudram', 'Nanguneri', 'Radhapuram'],
'Tirunelveli Central District': ['Tirunelveli', 'Palayamkottai'],
'Tenkasi North District':['Vasudevanallur (Separate)','Sankaran Kovil (Separate)'],

'Tenkasi South District': ['Kadayanallur', 'Tenkasi', 'Alangulam'],
'Thoothukudi North District': ['Vilathikulam', 'Thoothukudi','Kovilpatti'],
 'Thoothukudi South District': ['Tiruchendur', 'Tiruvaikuntam', 'Ottapidaram (Separate)'],
 'Kanyakumari East District': ['Kanyakumari', 'Nagercoil', 'colachel'],
 'Kanyakumari West District': ['Padmanabhapuram', 'Vilavancode ','killiyoor'],


};

public all_designation=['Select designation ','District President / மாவட்ட தலைவர்','District Vice President / மாவட்ட துணை தலைவர்','District Organiser / மாவட்ட அமைப்பாளர்','District Deputy Organiser / மாவட்ட துணை அமைப்பாளர்','Union Organiser / ஒன்றிய அமைப்பாளர்','Union Deputy Organiser / ஒன்றிய துணை அமைப்பாளர்','City Organiser / நகர அமைப்பாளர்','City Deputy Organiser / நகர துணை அமைப்பாளர்','Area Organiser / பகுதி அமைப்பாளர்','Area Deputy Organiser / பகுதி துணை அமைப்பாளர்','illage Organiser / ஊரக அமைப்பாளர்','Village Deputy Organiser / ஊரக துணை அமைப்பாளர்'];



public constituency:any='No-Select';
checktoken:any[]=[]
public check_token(email:string) {
          return this.httpClient.get(this.baseUrl+"/check_token.php?email="+email);
                       }

userlogincheck:any[]=[];
public logincheck() {
  return this.httpClient.get(this.baseUrl +'/loginusercheck.php');
}
public locked(whatsapp_no:any) {
  // console.log("api");
  //  console.log(whatsapp_no);
  // dadistrict=this.district;

  return this.httpClient.post(this.baseUrl +'/lock.php',{whatsapp_no})
  .pipe(map(Users => {
    return Users;
    }));
}

public userlogin(username : any, password :any) {

  return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
  .pipe(map(Users => {
    this.user_district= Users[0].district;
    localStorage.setItem('user_district', JSON.stringify(Users[0].district));
    // this.districtname=JSON.parse(localStorage.getItem('user_district'));
    console.log(this.user_district)
    this.district=this.user_district;

  this.setToken(Users[0].name);
  this.getLoggedInName.emit(true);
  //only authorized user to login
  if(Users!=''){
    //console.log(window.localStorage.getItem('UserToken'));
    sessionStorage.setItem('validUserToken', 'true');
  }
  return Users;
  //console.log(Users);
  }));
  }

public userregistration(email : any,firstname:any,lastname:any,father_name:any,district:any,contact_no:any,date_of_birth:any,educational_qualification:any,profession:any,location_id:any,age:any,address1:any,address2:any,town_city:any,taluk:any,pincode:any,self_profession:any) {
  const httpOptions : Object = {
    headers: new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
    })
  };
console.log(location_id);
return this.httpClient.post<any>(this.baseUrl + '/register.php', { email,firstname,lastname,father_name,district,contact_no,date_of_birth,educational_qualification,profession,location_id,age,address1,address2,town_city,taluk,pincode,self_profession})
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

          public create_office_bearers(mode:any,email:any,firstname:any,lastname:any,age:any,father_name:any,mother_name:any,educational_qualification:any,date_of_birth:any,additional_qualification:any,contact_no:any,whatsapp_no:any,profession:any,address1:any,applied_role:any,party_comments:any,location_id:any,district:any,constituency:any,approval_status:any) {
            const httpOptions : Object = {
              headers: new HttpHeaders({
                'Content-Type':'application/x-www-form-urlencoded'
              })
            };
            return this.httpClient.post<any>(this.baseUrl + '/create.php?category=OB', { mode,email,firstname,lastname,age,father_name,mother_name,educational_qualification,date_of_birth,additional_qualification,contact_no,whatsapp_no,profession,address1,applied_role,party_comments,location_id,district,constituency,approval_status},httpOptions)
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
            email_checking:any[]=[];
            public email_check() {
            return this.httpClient.get(this.baseUrl +'/email.php');
        }
        email_phone:any[]=[];
        public ph_check() {
        return this.httpClient.get(this.baseUrl +'/phone.php');
    }



            piechartdatasa:any[]=[];
            public piedatasa() {
              return this.httpClient.get(this.baseUrl +'/dashboardsapie.php');
            }
            cardsa:any[]=[];
            public carddatasa() {
              return this.httpClient.get(this.baseUrl +'/dashboardsacard.php');
            }

            barchartdatasa:any[]=[];
            public chartdatasa() {
              return this.httpClient.get(this.baseUrl +'/dashboardsabar.php');
            }
            tableda:any[]=[];
            public datablelogin(dadistrict:any) {
              // console.log(this.district);
              // dadistrict=this.district;
              
              return this.httpClient.post(this.baseUrl +'/dashow.php',{dadistrict})
              // return this.httpClient.get(this.baseUrl +'/rolechange_approvel_show.php');
              .pipe(map(Users => {
                return Users;
                }));
            
              }

              public roledatablelogin(dadistrict:any) {
                // console.log(this.district);
                // dadistrict=this.district;
                
                return this.httpClient.post(this.baseUrl +'/rolechange_req.php',{dadistrict})
                // return this.httpClient.get(this.baseUrl +'/rolechange_approvel_show.php');
                .pipe(map(Users => {
                  return Users;
                  }));
              }

            piechartdatada:any[]=[];
            logindistrict:any;
            public piedatada(ldistrict:any) {
               console.log('str');

               console.log(ldistrict);
          
              return this.httpClient.post<any>(this.baseUrl +'/dashboarddamonth.php',{ldistrict})
              .pipe(map(Users => {
                return Users;
                }));
            }

            barchartdatada:any[]=[];
            public chartdatada(barchart:any) {
              
               console.log(barchart);
                return this.httpClient.post(this.baseUrl +'/dashboardda.php',{barchart})
              .pipe(map(Users => {
                return Users;
                }));
            }
            dashboardcarddata:any[]=[];
            public dashboardcardda(cardistrict:any) {
              //  console.log("cardistrict");
               console.log(cardistrict);
              return this.httpClient.post(this.baseUrl +'/dashboarddacard.php',{cardistrict})
              .pipe(map(Users => {
                return Users;
                }));
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
                                  // console.log(Users);
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

                                public create_meeting(meeting_name:any,meeting_date:any,meeting_time:any,participants:any,meeting_type:any,meeting_location:any, comments:any,meeting_district:any) {
                                  // console.log(constituency);
                                return this.httpClient.post<any>(this.baseUrl + '/createmeeting.php',
                                { meeting_name,meeting_time,meeting_date,participants,meeting_type,meeting_location,comments,meeting_district},)
                                .pipe(map(Users => {
                                return Users;
                                }));
                                }

                                public rq_form(name:any,user_id:any,email:any,old_designation:any,new_designation:any,reason:any,district:any) {
                                  const httpOptions: Object = {
                                    headers: new HttpHeaders({
                                      'Content-Type': 'application/x-www-form-urlencoded'
                                    })
                                  };
                               // console.log("sdf")
                                  //console.log(name);
                                 return this.httpClient.post<any>(this.baseUrl + '/rolechange_req.php',
                                  {name,email,old_designation,district,new_designation,reason,user_id},httpOptions)
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

                                          public updateOB(mode:any,user_id:any,email:any,firstname:any,lastname:any,age:any,father_name:any,mother_name:any,educational_qualification:any,date_of_birth:any,additional_qualification:any,contact_no:any,whatsapp_no:any,profession:any,address1:any,applied_role:any,
                                            party_comments:any,location_id:'1',district:any,approval_status:any,constituency:any) {
                                            //let firstname='names'
                                            const httpOptions : Object = {
                                                    headers: new HttpHeaders({
                                                      'Content-Type':'application/x-www-form-urlencoded'
                                                    })
                                                  };
                                                  console.log(user_id);
                                              // console.log("apidata : "+user_id,firstname,lastname,father_name,educational_qualification,date_of_birth,additional_qualification,contact_no,whatsapp_no,profession,address,applied_role,party_comments,location_id)
                                                  return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=2', {mode,user_id,email,firstname,lastname,age,father_name,mother_name,educational_qualification,date_of_birth,additional_qualification,contact_no,whatsapp_no,profession,address1,applied_role,
                                                    party_comments,location_id,district,constituency,approval_status},httpOptions)
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
