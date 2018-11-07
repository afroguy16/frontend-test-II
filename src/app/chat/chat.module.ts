import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
// import { chatReducer } from './store/chat.reducers';

@NgModule({
	declarations: [
		ChatComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ChatRoutingModule,
		// StoreModule.forFeature({chat: chatReducer})
	]
})

export class ChatModule { }