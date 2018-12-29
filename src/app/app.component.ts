import { element } from "protractor/built";
import { SearchParam } from "./model/searchParam";
import { Recipe } from "./model/recipe";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "recipe-search";
 ingredients: string[];
 recipeList: Recipe[];
 recentSearches: SearchParam[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.recentSearches = [];
  }

  searchForRecipe(searchItem: string): void {
    const searchParam = {
      searchItem: searchItem,
      ingredients: this.ingredients
    } as SearchParam;

    this.recentSearches.splice(0, 0, searchParam);
    // if (this.recentSearches.length === 0) {
    //   this.recentSearches.splice(0, 0, searchParam);
    // } else {
    //   this.recentSearches.forEach(function(recentSearch) {
    //     if (
    //       recentSearch.searchItem !== searchParam.searchItem ||
    //       recentSearch.ingredients !== searchParam.ingredients
    //     ) {
    //       this.recentSearches.splice(0, 0, searchParam);
    //     }
    //   });
    // }

    this.getResults(searchItem, this.joinIngredients(this.ingredients));
  }

  searchRecentRecipe(searchItem: SearchParam): void {
    this.ingredients = [];
    this.getResults(
      searchItem.searchItem,
      this.joinIngredients(searchItem.ingredients)
    );
  }

  getResults(searchTitle: string, searchIngredients: string): void {
    const baseUrl = "http://www.recipepuppy.com/api/?";
    const ingredients = searchIngredients ? "&i=" + searchIngredients : "";
    const searchParam = searchTitle ? "q=" + searchTitle : "";
    console.log(baseUrl + searchParam + ingredients);

    this.http.get(baseUrl + searchParam + ingredients).subscribe(data => {
      console.log(data["results"]);
      this.recipeList = data["results"];
      console.log(this.recipeList);
    });
  }

  private joinIngredients(ingredients: string[]): string {
    return ingredients ? ingredients.join(",") : "";
  }
}
