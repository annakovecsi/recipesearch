import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.component.html",
  styleUrls: ["./ingredients.component.css"]
})
export class IngredientsComponent implements OnInit {
  @Input() ingredients: string[];
  @Output() ingredientsChanged: EventEmitter<any> = new EventEmitter();

  ingredient: string;

  constructor() {}

  ngOnInit() {
    this.ingredients = [];
  }

  addIngredient(): void {
    if (!this.ingredients.includes(this.ingredient) && this.ingredient) {
      this.ingredients.push(this.ingredient);
    }

    this.ingredient = "";

    this.ingredientsChanged.emit(this.ingredients);
  }

  removeIngredient(ingredient: string): void {
    this.ingredients = this.ingredients.filter(e => e !== ingredient);
    this.ingredientsChanged.emit(this.ingredients);
  }

  onKey(event: any): void {
    if (event.key === "Enter") {
      this.addIngredient();
    }
  }
}
