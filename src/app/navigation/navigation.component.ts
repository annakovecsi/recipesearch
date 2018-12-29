import { SearchParam } from "./../model/searchParam";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  @Input() recentSearches: SearchParam[];
  @Output() searchParamChanged: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  search(searchParam: SearchParam): void {
    this.searchParamChanged.emit(searchParam);
  }
}
