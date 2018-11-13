import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ChatService implements OnInit{
	storedMessages: Message[] = [];

	constructor(private httpClient: HttpClient, private authService: AuthService) {
	}

	ngOnInit() {
		// this.httpClient.get<Message[]>('https://giphy-chat-ng.firebaseio.com/messages.json')
		// 	.subscribe((messages) => this.storedMessages = messages);
	}

	getMessages() {
		return this.storedMessages;
	}

	saveMessage(message) {
		this.storedMessages.push(message);
		return this.httpClient.put('https://giphy-chat-ng.firebaseio.com/messages.json', this.getMessages());
	}

	saveMessages(messages) {
	}
}