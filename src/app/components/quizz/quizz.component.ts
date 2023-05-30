import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string ="";
  imgSrcSelected?:string ="";

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.quizz) {
      this.finished = false;
      this.title = this.quizz.title;

      this.questions = this.quizz.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }

  }

  get id() {
    return Number(this.route.snapshot.paramMap.get('id')) || 0;
  }

  get quizz() {
    return quizz_questions.find(quizz => quizz.id === this.id);
  }

  playerChoose(value:string){
    this.answers.push(value);
    this.nextStep();

  }

  async nextStep(){
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = this.quizz?.results[finalAnswer as keyof typeof this.quizz.results] || '';
      this.imgSrcSelected = this.quizz?.imgResult ? this.quizz.imgResult[finalAnswer as keyof typeof this.quizz.imgResult] : '';
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous;
        } else {
          return current;
        }
    })

    return result;
  }

}
