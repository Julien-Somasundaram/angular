import { Component, OnInit } from '@angular/core';
import { QuizService } from "../shared/services/quiz.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CatComponent implements OnInit {
  categories: any[] = this.quizService.categoryContent;
 

  constructor(private quizService: QuizService,private router: Router) { }

  ngOnInit(): void {
    this.quizService.getCategoryContent();
    console.log('Categories:', this.categories);
  }

  selectCategory(categoryId: string): void {
    console.log('Selected Category ID:', categoryId);
    console.log(this.quizService.playerName);
    this.router.navigate(['/quiz', this.quizService.playerName, categoryId]);  }
}
