import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
	signup(email: string, password: string) {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	login(email: string, password: string) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	getToken() {
		return firebase.auth().currentUser.getIdToken();
	}
}