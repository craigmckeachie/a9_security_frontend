import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { User } from "./users/shared/user.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.find(1).subscribe(data => {
      this.user = data;
    });
  }
}
