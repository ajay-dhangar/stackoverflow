import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsComponent implements OnInit {

  constructor(public questionService:QuestionService, private route:ActivatedRoute, public userService:UserService) { }

  ngOnInit(): void {
    this.questionid = this.route.snapshot.paramMap.get('questionid');
    this.questionService.fetchQuestionWithID(this.questionid).then((res)=>{
      console.log(res);
      this.questionObj = res;
    }).catch((err)=>{
      console.log(err);
    });
  }

  solutionText:string = "";
  questionid:any;
  questionObj:any;

  postSolution(){
    let solutionObj = {
      username: this.userService.user.username,
      solution: this.solutionText,
      upvotes:[],
      downvotes:[]
    };
    this.questionObj.solutions.push(solutionObj);
    this.questionService.updateQuestionData(this.questionObj).then((res)=>{
      console.log(res);
      this.solutionText = "";
    }).catch((err)=>{
      console.log(err);
    });
  }

  vote(index:number,param:number){
    if(param == 1){
      //upvote
      if(!(this.questionObj.solutions[index].upvotes.indexOf(this.userService.user.id) >= 0)){
        this.questionObj.solutions[index].upvotes.push(this.userService.user.id);
      }
      for(let i = 0; i < this.questionObj.solutions[index].downvotes.length; i++){
        if(this.questionObj.solutions[index].downvotes[i] == this.userService.user.id){
          this.questionObj.solutions[index].downvotes.splice(i, 1);
        }
      }
    }
    else{
      //downvote
      if(!(this.questionObj.solutions[index].downvotes.indexOf(this.userService.user.id) >= 0)){
        this.questionObj.solutions[index].downvotes.push(this.userService.user.id);
      }

      for(let i = 0; i < this.questionObj.solutions[index].upvotes.length; i++){
        if(this.questionObj.solutions[index].upvotes[i] == this.userService.user.id){
          this.questionObj.solutions[index].upvotes.splice(i, 1);
        }
      }
    }

    this.questionService.updateQuestionData(this.questionObj).then((res)=>{
      console.log(res);
      this.solutionText = "";
    }).catch((err)=>{
      console.log(err);
    });
  }

}

let solution = {
  username:'',
  solution:'',
  upvotes:["userids"],
  downvotes:["userids"]
}
