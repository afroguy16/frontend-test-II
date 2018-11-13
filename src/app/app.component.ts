import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import * as API from './api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit() {
  	firebase.initializeApp({
  		apiKey: API.firebaseKey,
    	authDomain: "giphy-chat-ng.firebaseapp.com"
  	});
  }
}
