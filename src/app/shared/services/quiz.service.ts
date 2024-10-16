import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizContent: any[] = [];
  categoryContent: any[] = [];
  playerAnswers: {questionId: number; answer: string}[] = [];
  score = 0;
  isQuizFinished = false;
  playerName: string = '';

  constructor(private http: HttpClient) { }

  checkAnswers() {
    this.score = 0;
    for (let i = 0; i < this.playerAnswers.length; i++) {
      const question = this.quizContent.find((q) => q.id === this.playerAnswers[i].questionId);
      if (!question) continue;
      for (let j = 0; j < question.answers.length; j++) {
        const currentAnswer = question.answers[j];
        if (currentAnswer.isCorrect && this.playerAnswers[i].answer === currentAnswer.answerLabel) {
          this.score += 1;
          break;
        }
      }
    }
    this.isQuizFinished = true;
  }

  addAnswer(answer: string, questionId: number) {
    const isAnswered = this.playerAnswers.find((a) => a.questionId === questionId);
    if (isAnswered) {
      isAnswered.answer = answer;
      return;
    }
    this.playerAnswers.push({questionId, answer});
  }

  getQuizContent(categoryId: string) {
    this.http.get('http://localhost:3000/questions').subscribe((questions: any) => {
      for (const question of questions) {
        if (categoryId !== "0" && question.categoryId !== categoryId) continue;
        console.log(question.categoryId);  
        this.http.get(`http://localhost:3000/answers?questionId=${question.id}`).subscribe((answers: any) => {
          this.quizContent.push({
              id: question.id,
              question: question.questionLabel,
              answers
          });
        });
      }
    });
  }

  getCategoryContent() {
    console.log('getCategoryContent');
    this.http.get('http://localhost:3000/categories').subscribe((categories: any) => {
      for (const category of categories) {
        if ((category.id -1) in this.categoryContent) continue;
        this.http.get(`http://localhost:3000/questions?categoryId=${category.id}`).subscribe((questions: any) => {
          this.categoryContent.push({
              id: category.id,
              category: category.categoryLabel,
          });
        });
      }

    });
  }

  resetQuiz() {
    this.categoryContent = [];
    this.quizContent = [];
    this.playerAnswers = [];
    this.score = 0;
    this.isQuizFinished = false;
  }
}
