import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-search-recipe",
  templateUrl: "./search-recipe.component.html",
  styleUrls: ["./search-recipe.component.css"]
})
export class SearchRecipeComponent implements OnInit {
  searchItem: string;
  @Output() searchRecipe: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  search() {
    if(this.searchItem)
    {
      this.searchRecipe.emit(this.searchItem);
      this.searchItem = "";
    }
  }

  keyUp(event: any) {
    if (event.key === "Enter") {
      this.search();
    }
  }
}
