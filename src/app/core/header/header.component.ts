import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  subscription: Subscription;
  loginForm = false;
  signupForm = false;
  signupSuccess = false;

  constructor(private modalService: BsModalService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  turnonSignupForm() {
    this.loginForm = false;
    this.signupForm = true;
  }

  turnonLoginForm() {
    this.signupForm = false;
    this.loginForm = true;
  }

  openModal(template: TemplateRef<any>) {

    this.subscription = this.modalService.onHidden
      .subscribe(
        () => {
          console.log('Hidden');
          this.resetModal();
          this.subscription.unsubscribe();
        }
      )

    this.modalRef = this.modalService.show(template);
  }

  resetModal() {
    this.loginForm = false;
    this.signupForm = false;
    this.signupSuccess = false;
  }

  onLogin(formData: NgForm) {
    const email = formData.value.email;
    const password = formData.value.password;
    this.authService.login(email, password)
      .then(
          response => {
            this.modalRef.hide(); 
            this.router.navigate(['/chat']);
            window.localStorage.setItem('refreshToken', response.user.refreshToken);
            console.log(response);
          }
        )
        .catch(
          error => console.log(error.message)
        )
  }

  onSignup(formData: NgForm) {
    const email = formData.value.email;
    const password = formData.value.password;
    this.authService.signup(email, password)
      .then(
        response => {
          this.signupSuccessful();
          }
      )
      .catch(
        error => console.log(error.message)
      )
  }

  signupSuccessful() {
    this.signupSuccess = true;
    this.signupForm = false;
  }

}
