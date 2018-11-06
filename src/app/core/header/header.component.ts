import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // This is a temporary function to tell users that authentication will be coming soon, this function won't be needed as soon as authentication is implemented
  authComingSoon() {
  	console.log('Auth button clicked');
  }

}
