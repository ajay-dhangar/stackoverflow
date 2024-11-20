import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  currentQuestionObject:any; 

  public postQuestion(questionObj:any){
    return new Promise((resolve, reject)=>{
      this.http.post('http://localhost:3000/questions', questionObj).subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    });
  }

  public fetchQuestions(){
    return new Promise((resolve, reject)=>{
      this.http.get('http://localhost:3000/questions').subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    });
  }

  public fetchQuestionWithID(id:string){
    return new Promise((resolve, reject)=>{
      this.http.get('http://localhost:3000/questions/' + id).subscribe(
        (res)=>{
          resolve(res);
        },
        (err)=>{
          reject(err);
        }
      );
    });
  }

  public updateQuestionData(newObj:any){
    return new Promise((resolve, reject)=>{
      this.http.put('http://localhost:3000/questions/' + newObj.id, newObj).subscribe(
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
