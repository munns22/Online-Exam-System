import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../appmodel/question';
import { Report } from '../appmodel/report';
import { UserResponse } from '../appmodel/user-response';
import { ExamService } from '../service/exam.service';

@Component({
  selector: 'app-exam-ui',
  templateUrl: './exam-ui.component.html',
  styleUrls: ['./exam-ui.component.css']
})
export class ExamUIComponent implements OnInit {
  length:number;
  courseid:number;
  userid:number;
  levelid:number;
  questions:Question[];
  questionIndex:number;
  marks:number=0;
  report:Report;
  userResponse : UserResponse[]=[new UserResponse()];
  isSubmitted : boolean = false;


  //Timer
  sec:any = 600;
  countDiv:any;
  min:any;
  remSec:any;

  constructor(private exam : ExamService,private router:Router) {
    this.questionIndex=0; 
    this.levelid=parseInt(sessionStorage.getItem("levelid"));
    this.courseid=parseInt(sessionStorage.getItem("courseid"));
    this.userid=parseInt(sessionStorage.getItem("userId"));
    this.exam.getQuestions(this.courseid,this.levelid).subscribe(data=>{
      this.questions=data;
      
    })
  }
  ngOnInit() {
  }

  ngAfterViewInit(){
    this.length=this.questions.length;
    this.createUserRespObj();
  }

  public createUserRespObj(){
    let i:number;
    for(i=0;i<this.questions.length;i++){
      this.userResponse.push(new UserResponse());
    }
  }

  public nextQues(){
    this.userResponse[this.questionIndex].questionId=this.questions[this.questionIndex].question_id;
    this.questionIndex++;
  }

  public prevQues(){
    this.userResponse[this.questionIndex].questionId=this.questions[this.questionIndex].question_id;
    this.questionIndex--;
  }

  public submit(){
    this.isSubmitted=true;
    this.userResponse[this.questionIndex].questionId=this.questions[this.questionIndex].question_id;
    let i:number;
    for(i=0;i<this.length;i++){
      if(this.userResponse[i].userAnswer==this.questions[i].correct_option){
        this.marks+=10;
      }
    }
    console.log(this.marks);
    this.report=new Report(this.marks,this.userid,this.courseid,this.levelid);
    console.log(this.report);
    this.exam.sendReport(this.report).subscribe(response=>{
      let status:String=response;
      if(status=="Pass"){
        this.router.navigate(['report_success']);
      }
      else{
        alert("You failed to clear this level! \n You can view your result in Report section");
        this.router.navigate(['userDashboard']);
      }
    })
    
  }

  //Timer
  countDown   = setInterval(() =>      
  this.secpass(), 1000);


public secpass():any {
    'use strict';    
     this.min  = Math.floor(this.sec / 60);
        this.remSec  = this.sec % 60;    
    if (this.remSec < 10) {        
        this.remSec = '0' + this.remSec;    
}
if (this.min < 10) {        
    this.min = '0' + this.min;    
}
if(this.min==0 && this.sec==0 && this.isSubmitted==false){

  this.submit();
}
this.countDiv = this.min + ":" + this.remSec;

if (this.sec > 0) {        
    this.sec = this.sec - 1;        
} 
else {        
    clearInterval(this.countDown);               
}
}

}
