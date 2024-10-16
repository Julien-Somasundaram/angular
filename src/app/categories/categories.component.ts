import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';
  constructor(private router: Router) { }
  playerName = '';


  goToQuiz(categoryId: number) {
    this.router.navigate(['/quiz', categoryId]);
  }

  filterCategories() {
    if (this.searchTerm.trim()) {
      
      this.filteredCategories = this.categories.filter(category =>
        category.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
      console.log(this.filteredCategories)
    } else {
      this.filteredCategories = this.categories;
    }
  }

  resetFilter() {
    this.searchTerm = '';
    this.filteredCategories = this.categories;
  }

}
