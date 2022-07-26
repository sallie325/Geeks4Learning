import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  // user$ :any = [];
readonly BaseUrI = 'https://localhost:44326/api';
  formModel = this.fb.group({
    Title : [''],
    Initials : [''],
    Name: [''],
    Surname: [''],
    DateOfBirth: [''],
    IdNumber: [''],
    Gender: [''],
    Ethinicity: [''],
    PhysicalAddress: [''],
    PostalAddress: [''],
    Phone: [''],
    Email: [''],
    Career: [''],
    Status: [0],
    Passwords: this.fb.group({
      Password: [''],
      ConfirmPassword: [''],
    })
   
  }); 

  formModelLogin = this.fb.group({
    Email: [''],
    Password: [''],
  });

  formModelQuestionnaire = this.fb.group({
    Question1:[''],
    Question2:[''],
    Question3:[''],
    Question4:[''],
    Question5:[''],
    Question6:[''],
    Question7:[''],
    Question8:[''],
    Question9:[''],
    Question10:[''],
    
  });


  register()
  {
   var body  ={
      Title: this.formModel.value.Title,
      Initials: this.formModel.value.Initials,
      Name: this.formModel.value.Name,
      Surname: this.formModel.value.Surname,
      DateOfBirth: this.formModel.value.DateOfBirth,
      IdNumber: this.formModel.value.IdNumber?.toString(),
      Gender: this.formModel.value.Gender,
      Ethinicity: this.formModel.value.Ethinicity,
      PhysicalAddress: this.formModel.value.PhysicalAddress,
      PostalAddress: this.formModel.value.PostalAddress,
      Phone: this.formModel.value.Phone,
      Email: this.formModel.value.Email,
      Career: 2,
      Password: this.formModel.value.Passwords?.Password,
      

    };
    // return this.addUser(body);
    return body;

  }


  registerQuestionnaire(){
    var questionBody  ={

    Question1: this.formModelQuestionnaire.value.Question1,
    Question2: this.formModelQuestionnaire.value.Question2,
    Question3: this.formModelQuestionnaire.value.Question3,
    Question4: this.formModelQuestionnaire.value.Question4,
    Question5: this.formModelQuestionnaire.value.Question5,
    Question6: this.formModelQuestionnaire.value.Question6,
    Question7: this.formModelQuestionnaire.value.Question7,
    Question8: this.formModelQuestionnaire.value.Question8,
    Question9: this.formModelQuestionnaire.value.Question9,
    Question10: this.formModelQuestionnaire.value.Question10,
    };
  }
//test
  testData(){
    var test  ={
      Title: "Mrs",
      Initials: "P",
      Name: "Palesa",
      Surname: "Nthako",
      DateOfBirth: "2010/10/14",
      IdNumber: "1010145444098",
      Gender: "Female",
      Ethinicity: "White",
      PhysicalAddress: "Waterstone Drive, Benmore Rd, Sandton, 2196",
      PostalAddress: "Waterstone Drive, Benmore Rd, Sandton, 2196",
      Phone: "0751015454",
      Email: "pk@outlook.com",
      Career: "2",
      Password: "pk@outlook",
      

    };
    return test;
  }

addQuestionnaire(data:any)
{
  return this.http.post(this.BaseUrI+'/User', data);
}

  getAllUsers(): Observable<any[]>{
    return this.http.get<any>(this.BaseUrI+'/User');
  }

  addUser(data:any){
    return this.http.post(this.BaseUrI+'/User', data);
  }


}

