import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { StorageService } from "../../services/storage/storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public userInfo$!: Observable<any>;

  constructor(
    public router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.userInfo$ = this.authService.getUserInfo();

    this.userInfo$.subscribe((res) => {
      this.authService
        .currentUserInfo(res._id)
        .subscribe((res) => console.log(res));
    });
  }

  ngOnInit() {}

  public logout() {
    this.storageService.deleteAll();
    window.location.reload();
  }
}
