import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  subscription: Subscription;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  // This is a temporary function to tell users that authentication will be coming soon, this function won't be needed as soon as authentication is implemented
  authComingSoon() {
  	console.log('Auth button clicked');
  }

  openModal(template: TemplateRef<any>) {

    this.subscription = this.modalService.onHidden
      .subscribe(
        () => {
          console.log('Hidden');
          this.subscription.unsubscribe();
        }
      )

    this.modalRef = this.modalService.show(template);
  }

}
