import { Component, OnInit } from "@angular/core";
import { Authenticate, Logout } from "@cpangular/app/auth";
import { Store } from "@ngxs/store";

@Component({
  selector: "app-examples",
  templateUrl: "./examples.component.html",
  styleUrls: ["./examples.component.scss"],
})
export class ExamplesComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  login() {
    this.store.dispatch(new Authenticate());
  }
  logout() {
    this.store.dispatch(new Logout());
  }
}
