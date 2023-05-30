import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz-list',
  templateUrl: './quizz-list.component.html',
  styleUrls: ['./quizz-list.component.css']
})
export class QuizzListComponent implements OnInit {
  questionList:Array<any> = [];

  constructor() { }

  ngOnInit() {
    if(quizz_questions){
      this.questionList = quizz_questions;
    }
  }

}
