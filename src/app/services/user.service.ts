import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public user:any;

  public createAccount(userObj:any){
    return new Promise<any>((resolve, reject)=>{
      this.http.post('http://localhost:3000/users', userObj).subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    })
  }

  public getUser(email:string){
    return new Promise<any>((resolve, reject)=>{
      this.http.get('http://localhost:3000/users?email=' + email).subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    });
  }
}
