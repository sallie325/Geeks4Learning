import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }

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


  register()
  {
    var body  ={
      Title: this.formModel.value.Title,
      Initials: this.formModel.value.Initials,
      Name: this.formModel.value.Name,
      Surname: this.formModel.value.Surname,
      DateOfBirth: this.formModel.value.DateOfBirth,
      IdNumber: this.formModel.value.IdNumber,
      Gender: this.formModel.value.Gender,
      Ethinicity: this.formModel.value.Ethinicity,
      PhysicalAddress: this.formModel.value.PhysicalAddress,
      PostalAddress: this.formModel.value.PostalAddress,
      Phone: this.formModel.value.Phone,
      Email: this.formModel.value.Email,
      Career: 2,
      Password: this.formModel.value.Passwords?.Password,
      

    };
    return this.addUser(body);
    // return body;

  }

  getAllUsers(): Observable<any[]>{
    return this.http.get<any>(this.BaseUrI+'/User');
  }

  addUser(data:any){
    return this.http.post(this.BaseUrI+'/User', data);
  }


}

