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
            //  baseUrl:string="http://localhost/DMK_TODAY/Dmk-Wings/php";
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
public all_districts=['Chennai North', 'Chennai North East', 'Chennai East', 'Chennai West', 'Chennai South West', 'Chennai South',
'Thiruvallur East', 'Thiruvallur Central', 'Thiruvallur West', 'Kanchipuram North', 'Kanchipuram South', 'Ranipet', 'Vellore',
'Tirupattur', 'Tiruvannamalai North', 'Tiruvannamalai South', 'Villupuram North', 'Villupuram South', 'Kallakurichi North', 'Kallakurichi South',
'Cuddalore East', 'Cuddalore West', 'Thanjavur North', 'Thanjavur Central', 'Thanjavur South', 'Mayiladuthurai', 'Nagai', 'Tiruvarur',
'Trichy North', 'Trichy Central', 'Trichy South', 'Perambalur', 'Ariyalur', 'Karur', 'Pudukottai North', 'Pudukottai South', 'Salem East',
'Salem West', 'Salem Central', 'Namakkal East', 'Namakkal West', 'Dharmapuri East', 'Dharmapuri West', 'Krishnagiri East', 'Krishnagiri West', 'Coimbatore North',
'Coimbatore South','Coimbatore','Tirupur North','Tirupur South','Erode North','Erode South','Nilgiri','Madurai North','Madurai South','Madurai','Dindigul East',
'Dindigul West','Theni North','Theni South',
'Ramanathapuram', 'Sivagangai', 'Virudhunagar North', 'Virudhunagar South', 'Tirunelveli East', 'Tirunelveli Central','Tenkasi North',
'Tenkasi South','Thoothukudi North','Thoothukudi South','Kanyakumari East','Kanyakumari West'];

public meeting_districts=['Chennai North', 'Chennai North East', 'Chennai East', 'Chennai West', 'Chennai South West', 'Chennai South',
'Thiruvallur East', 'Thiruvallur Central', 'Thiruvallur West', 'Kanchipuram North', 'Kanchipuram South', 'Ranipet', 'Vellore',
'Tirupattur', 'Tiruvannamalai North', 'Tiruvannamalai South', 'Villupuram North', 'Villupuram South', 'Kallakurichi North', 'Kallakurichi South',
'Cuddalore East', 'Cuddalore West', 'Thanjavur North', 'Thanjavur Central', 'Thanjavur South', 'Mayiladuthurai', 'Nagai', 'Tiruvarur',
'Trichy North', 'Trichy Central', 'Trichy South', 'Perambalur', 'Ariyalur', 'Karur', 'Pudukottai North', 'Pudukottai South', 'Salem East',
'Salem West', 'Salem Central', 'Namakkal East', 'Namakkal West', 'Dharmapuri East', 'Dharmapuri West', 'Krishnagiri East', 'Krishnagiri West', 'Coimbatore North',
'Coimbatore South','Coimbatore','Tirupur North','Tirupur South','Erode North','Erode South','Nilgiri','Madurai North','Madurai South','Madurai','Dindigul East',
'Dindigul West','Theni North','Theni South',
'Ramanathapuram', 'Sivagangai', 'Virudhunagar North', 'Virudhunagar South', 'Tirunelveli East', 'Tirunelveli Central','Tenkasi North',
'Tenkasi South','Thoothukudi North','Thoothukudi South','Kanyakumari East','Kanyakumari West'];

public all_constituency={ 'Chennai North': ['Dr. Radhakrishnan Nagar', 'Perambur', 'Rayapuram'],
'Chennai North East': ['Madhavaram', 'Tiruvottiyur'],
'Chennai East': ['Ambattur', 'Kolathur', 'Williwakam', 'Thiru.Vi.Ka Nagar (Separate)', ' Egmore (Separate)', 'Harbour'],
'Chennai West': ['Chepakkam-Thiruvallikkeni', 'Aayiram Vilakku', 'Anna Nagar'],
'Chennai South West': ['Thiagaraya Nagar', 'Mylapore'],
'Chennai South': ['Maduravoyal', 'Virugambakkam', 'Saidapet', 'Velachery', 'Sholinganallur'],
'Thiruvallur East': ['Gummidipoondi', 'Ponneri (Separate)'],
'Thiruvallur Central': ['Poovirundhavalli (Separate) ', 'Avadi'],
'Thiruvallur West': ['Tiruthani', 'Thiruvallur'],
'Kanchipuram North': ['Alandur', 'Thiruperumbudur (Separate)', 'Pallavaram', 'Tambaram', 'Chengalpattu', 'Tiruporur'],
'Kanchipuram South': ['cheyyur (Separate)', 'Madhuranthakam (Separate)', 'Uttaramerur', 'Kanchipuram'],
'Ranipet': ['Arakkonam (Separate),', 'Sholingur', 'Ranippet', 'Arcot'],
'Vellore': ['Katpadi', 'Vellore', 'Anaikattu', 'Kilvaithinankuppam (Separate)', 'Gudiyatham (Separate)'],
'Tirupattur': ['Vaniyampadi', 'Ambur', 'Jolarpet', 'Tirupattur'],
'Tiruvannamalai North': ['Polur', 'Arani', 'Cheyyar', 'Vandavasi (Separate)'],
'Tiruvannamalai South': ['Sengam (Separate)', 'Thiruvannamalai', 'Kilpennathur', 'Kalasapakkam'],
'Villupuram North': ['Senji', 'Mayilam', 'Tindivanam (Separate)'],
'Villupuram South': ['Vanur (Separate)', 'Villupuram', 'Vikravandi', 'Thirukovilur'],
'Kallakurichi North': ['Ulundurpet', 'Shankarapuram'],
'Kallakurichi South': ['Rishivantiyam', 'Kallakurichi (Separate)'],
'Cuddalore East': ['Cuddalore', 'Kurinjipadi', 'Bhuvanagiri', 'Chidambaram', 'Kattumannarkoil  (Separate)'],
'Cuddalore West': ['Tittakudi (Separate)', 'Virudhachalam', 'Neyveli', 'Panruti'],
'Thanjavur North': ['Thiruvidaimarudur (Separate)', 'Kumbakonam', 'Papanasam'],
'Thanjavur Central': ['Tiruvaiyar', 'Thanjavur', 'Orathanadu'],
'Thanjavur South': ['Pattukottai', 'Peravurani'],
'Mayiladuthurai': ['Sirkazhi (Separate)', 'Mayiladuthurai', 'Poompuhar'],
'Nagai': ['Nagapattinam', 'Kilvelur (Separate) ', 'Vedaranyam'],
'Tiruvarur': ['Thirutharapoondi (Separate)', 'Mannargudi.', 'Tiruvarur', 'Nannilam'],
'Trichy North': ['Manchanallur', 'Musiri', 'Thuraiyur (Separate)'],
'Trichy Central': ['Thiruvarangam', 'Tiruchirappalli West', 'Lalgudi'],
'Trichy South': ['Manaparai', 'Tiruchirappalli East', 'Thiruverumbur'],
'Perambalur': ['Perambalur (Separate)', 'Kunnam'],
'Ariyalur': ['Ariyalur', 'Jayankondam '],
'Karur': ['Aravakurichi', 'Karur', 'Krishnarayapuram (Separate)', 'Kulithalai'],
'Pudukottai North': ['Gandarvakottai (Separate)', 'Viralimalai', 'Pudukottai'],
'Pudukottai South': ['Thirumayam', 'Alangudi', 'Aranthangi'],
'Salem East': ['Gangavalli (Separate)', 'Attur', 'Yercaud (P.G.)', 'Veerapandi'],
'Salem West': ['Mettur', 'Edappadi', 'Sankagiri'],
'Salem Central': ['Omalur', 'Salem West', 'Salem North', 'Salem South'],
'Namakkal East': ['Rasipuram (Separate)', 'Sendamangalam (P.G.)', 'Namakkal'],
'Namakkal West': ['Paramathi-Velur', 'Thiruchengode', 'Kumarapalayam'],
'Dharmapuri East': ['Dharmapuri', 'Panakaram'],
'Dharmapuri West': ['Palakode', 'Pappireddipatti', 'Harur (Separate)'],
'Krishnagiri East': ['Uthangarai (Separate)', 'Bargur', 'Krishnagiri '],
'Krishnagiri West': ['Veppanahalli', 'Hosur ', 'Thally'],
'Coimbatore North': ['Mettupalayam', 'Thondamuthur', 'Goundampalayam', 'Avinashi (Separate)'],
'Coimbatore South':['Sulur','Kinathukadavu','Pollachi','Valparai (Separate)'],
'Coimbatore': ['Coimbatore North', 'Coimbatore South', 'Singanallur'],
 'Tirupur North': ['Tirupur North', 'Tirupur South','Palladam'],
  'Tirupur South': ['Dharapuram (Separate)', 'Kangayam', 'Udumalaipettai','Madathukulam'],
 'Erode North': ['Bhavani', 'Anthiyur', 'Gopichettipalayam','Bhavani Sagar (Separate)'],
 'Erode South': ['Erode East', 'Erode West','Modakurichi','Perundurai'],
 'Nilgiri':['Udhagamandalam','gudalur (Separate)','Coonoor'],
  'Madurai North': ['Melur', 'Madurai East', 'Sholavandan (Separate)'],
  'Madurai South': ['Tirumangalam', 'Thiruparankundram','Usilampatti'],
  'Madurai': ['Madurai North','Madurai South','Madurai Centre','Madurai West'], 
'Dindigul East': ['Palani', 'Athur','Nilakkottai (Separate)','Dindigul'],
  'Dindigul West': ['Oddanchatram', 'Natham','Vedasandur'],
'Theni North': ['Periyakulam (Separate)', 'Bodinayakanur'],
 'Theni South': ['Andipatti','Kambam'],
'Ramanathapuram': ['Paramakudi (Separate)', ' Thiruvadanai', 'Ramanathapuram', 'Mudukulathur'],
'Sivagangai': ['Karaikudi', 'Thiruppathur', 'Sivagangai', 'Manamadurai (Separate)'],
'Virudhunagar North': ['Sivakasi', 'Virudhunagar', 'Tiruchuli'],
'Virudhunagar South': ['Rajapalayam', 'Thiruvilliputhur (Separate)', 'Chatur', 'Aruppukottai'],
'Tirunelveli East': ['Ambasamudram', 'Nanguneri', 'Radhapuram'],
'Tirunelveli Central': ['Tirunelveli', 'Palayamkottai'],
'Tenkasi North':['Vasudevanallur (Separate)','Sankaran Kovil (Separate)'],
'Tenkasi South': ['Kadayanallur', 'Tenkasi', 'Alangulam'],
'Thoothukudi North': ['Vilathikulam', 'Thoothukudi','Kovilpatti'],
 'Thoothukudi South': ['Tiruchendur', 'Tiruvaikuntam', 'Ottapidaram (Separate)'],
 'Kanyakumari East': ['Kanyakumari', 'Nagercoil', 'colachel'],
 'Kanyakumari West': ['Padmanabhapuram', 'Vilavancode ','killiyoor'],


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

public userregistration(email : any,firstname:any,lastname:any,father_name:any,district:any,contact_no:any,date_of_birth:any,educational_qualification:any,profession:any,location_id:any,age:any,address1:any,flat_no:any,town_city:any,taluk:any,pincode:any,self_profession:any,other_qualification:any) {
  const httpOptions : Object = {
    headers: new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
    })
  };
console.log(location_id);
return this.httpClient.post<any>(this.baseUrl + '/register.php', { email,firstname,lastname,father_name,district,contact_no,date_of_birth,educational_qualification,profession,location_id,age,address1,flat_no,town_city,taluk,pincode,self_profession,other_qualification})
.pipe(map(Users => {
return Users;
}));
}

public create_state_admin(mode:any,email:any,firstname:any,lastname:any,whatsapp_no:any,party_designation:any,approval_status:any,location_id:any,contact_no:any) {
  const httpOptions : Object = {
          headers: new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded'
          })
        };
  return this.httpClient.post<any>(this.baseUrl + '/create.php?category=SA', { mode,email,firstname,lastname,whatsapp_no,party_designation,approval_status,location_id,contact_no },httpOptions )
  .pipe(map(Users => {
  return Users;
  }))
  }

    public create_dist_admin(mode:any,whatsapp_no:any,email:any,firstname:any,lastname:any,district:any,party_designation:any,approval_status:any,location_id:any,contact_no:any) {
      const httpOptions : Object = {
        headers: new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      };
      return this.httpClient.post<any>(this.baseUrl + '/create.php?category=DA', {mode, whatsapp_no,email,firstname,lastname,district,party_designation,approval_status,location_id,contact_no },httpOptions )
        .pipe(map(Users => {
        return Users;
        }));
        }

          public create_office_bearers(mode:any,email:any,firstname:any,lastname:any,age:any,father_name:any,mother_name:any,educational_qualification:any,date_of_birth:any,additional_qualification:any,contact_no:any,whatsapp_no:any,profession:any,flat_no:any,applied_role:any,party_comments:any,location_id:any,district:any,constituency:any,approval_status:any,street_name:any,town_city:any,taluk:any,pincode:any,applied_posting:any) {
            const httpOptions : Object = {
              headers: new HttpHeaders({
                'Content-Type':'application/x-www-form-urlencoded'
              })
            };
            return this.httpClient.post<any>(this.baseUrl + '/create.php?category=OB', { mode,email,firstname,lastname,age,father_name,mother_name,educational_qualification,date_of_birth,additional_qualification,contact_no,whatsapp_no,profession,flat_no,applied_role,party_comments,location_id,district,constituency,approval_status,street_name,town_city,taluk,pincode,applied_posting},httpOptions)
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
                public updateSA(mode:any,user_id:any,firstname:any,lastname:any,whatsapp_no:any,party_designation:any,email:any,approval_status:any,location_id='1',contact_no:any) {
                  //let firstname='names'
                  const httpOptions : Object = {
                          headers: new HttpHeaders({
                            'Content-Type':'application/x-www-form-urlencoded'
                          })
                        };
                        console.log(user_id);
                    console.log("apidata : "+user_id,firstname,lastname,whatsapp_no,party_designation,approval_status)
                        return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=0', {mode,user_id,firstname,lastname,whatsapp_no,party_designation,email,approval_status,location_id,contact_no},httpOptions)
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

                                public rq_form(name:any,user_id:any,email:any,old_designation:any,new_designation:any,reason:any,district:any,) {
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
                                public updateDA(mode:any,user_id:any,firstname:any,lastname:any,district:any,party_designation:any,email:any,whatsapp_no:any,approval_status:any,location_id='1',contact_no:any) {
                                  //let firstname='names'
                                  const httpOptions : Object = {
                                          headers: new HttpHeaders({
                                            'Content-Type':'application/x-www-form-urlencoded'
                                          })
                                        };
                                        console.log(user_id);
                                    console.log("apidata : "+user_id,firstname,lastname,district,party_designation,approval_status)
                                        return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=1', {mode,user_id,firstname,lastname,district,party_designation,email,whatsapp_no,approval_status,location_id,contact_no},httpOptions)
                                                .pipe(map(Users => {
                                                return Users;
                                                }));
                                          }

                                          public updateOB(mode:any,user_id:any,email:any,firstname:any,lastname:any,age:any,father_name:any,mother_name:any,educational_qualification:any,date_of_birth:any,additional_qualification:any,contact_no:any,whatsapp_no:any,profession:any,flat_no:any,applied_role:any,
                                            party_comments:any,location_id:'1',district:any,constituency:any,approval_status:any,address1:any,town_city:any,taluk:any,pincode:any,applied_posting:any) {
                                            //let firstname='names'
                                            const httpOptions : Object = {
                                                    headers: new HttpHeaders({
                                                      'Content-Type':'application/x-www-form-urlencoded'
                                                    })
                                                  };
                                                  console.log(user_id);
                                              // console.log("apidata : "+user_id,firstname,lastname,father_name,educational_qualification,date_of_birth,additional_qualification,contact_no,whatsapp_no,profession,address,applied_role,party_comments,location_id)
                                                  return this.httpClient.post<any>(this.baseUrl + '/update.php?mode=2', {mode,user_id,email,firstname,lastname,age,father_name,mother_name,educational_qualification,date_of_birth,additional_qualification,contact_no,whatsapp_no,profession,flat_no,applied_role,
                                                    party_comments,location_id,district,constituency,approval_status,address1,town_city,taluk,pincode,applied_posting},httpOptions)
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
