import {Injectable, NgZone} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {User} from './user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    sortedArray: Array<{ username: string }>;
    currentUserPosition: number;
    private dbPath = '/users';
    userRef: AngularFireList<User> = null;

    constructor(
        public ngFireAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        private db: AngularFirestore) {


    }

    getAllUsers(): AngularFireList<User> {
        return this.userRef;
    }




}
