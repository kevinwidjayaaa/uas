import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {User} from './user';
import firebase from 'firebase';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    userData: any;
    userRef: AngularFireList<User> = null;
    userId;
    email;
    username;

    name;
    id;
    private afAuth: any;

    constructor(
        public afStore: AngularFirestore,
        public ngFireAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        private db: AngularFirestore
    ) {

    }

    // Login in with email/password
    SignIn(email, password) {
        return this.ngFireAuth.signInWithEmailAndPassword(email, password);
    }



    RegisterUser(email, password, name, username) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            if (user) {
                console.log(user);
                const userDaftar = {
                    userId : user.user.uid,
                    emails : email,
                    names : name,
                    usernames : username
                };
                this.db.collection('userId').doc(user.user.uid).set(userDaftar);

            }
            return user;
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            return errorMessage;
            // ...
        });
    }


    // Email verification when new user register
    SendVerificationMail() {
        return firebase.auth().currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['home/verify-email']);
            });
    }

    // Recover password
    PasswordRecover(passwordResetEmail) {
        return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email has been sent, please check your inbox.');
            }).catch((error) => {
                window.alert(error);
            });
    }

    // Returns true when user is looged in
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }
    getCurrentUser(){
        if (firebase.auth().currentUser){
            return firebase.auth().currentUser;
        } else{
            return null;
        }
    }


    // Returns true when user's email is verified
    get isEmailVerified(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user.emailVerified !== false) ? true : false;
    }



    // Sign-out navigate to home landing page
    SignOut() {
        return this.ngFireAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['/']);
        });
    }


    getUserData(): AngularFireList<User> {
        return this.userRef;
    }



}
