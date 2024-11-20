import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public questionService:QuestionService, public userService:UserService) { }

  ngOnInit(): void {
    this.questionService.fetchQuestions().then((res:any)=>{
      console.log(res);
      this.questionsList = res;
    }).catch((err)=>{
      console.log(err);
    });
  }

  question:string = "";
  questionsList:Array<any> = [];

  post(){
    this.questionService.postQuestion({
      username:this.userService.user.username,
      question:this.question,
      solutions:[]
    }).then((res)=>{
      console.log(res);
      this.question = "";
      this.questionsList.push(res);
    }).catch((err)=>{
      console.log(err);
    });
  }
}

let question  = {
  username:"",
  question:"",
  solutions:[
    {
      username:"",
      upvotes:0,
      downvotes:0,
      answer:""
    },
  ]
}
