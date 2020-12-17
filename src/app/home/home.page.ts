import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
      public authService: AuthenticationService,
      public router: Router,
      private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
        .then((res) => {
          // if (this.authService.isEmailVerified) {
            this.router.navigate(['tabs']);
          // } else {
           // window.alert('Email is not verified');
            // return false;
          // }
        // }).catch((error) => {
     //  window.alert(error.message);
    });
  }


  async presentLoading(email, password) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      spinner: 'dots',
      duration: 4000
    });
    await loading.present();

    await loading.onDidDismiss().then( () => {
      this.logIn(email, password);
    });
  }

}
