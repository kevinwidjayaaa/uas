import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
users: any;
userId: any;
names: any;
username: any;
userEmail: any;
  constructor(

  ) { }

  ngOnInit() {
  }

}
