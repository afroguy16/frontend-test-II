import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'ngx-bootstrap/modal'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
// import { chatReducer } from './chat/store/chat.reducers';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule
    // StoreModule.forRoot({chat: chatReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }