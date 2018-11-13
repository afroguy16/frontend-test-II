import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ChatService } from './chat/chat.service';
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
    FormsModule,
    AuthModule,
    HttpClientModule,
    AppRoutingModule
    // StoreModule.forRoot({chat: chatReducer})
  ],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }