import * as ChatActions from './chat.actions';
import { Message } from '../message.model';

const initialState = {
	messages: [
		new Message('Hello', '', new Date()),
		new Message('How are you?', '', new Date()),
	]
}

export function chatReducer(state = initialState, action: ChatActions.ChatActions) {
	switch(action.type) {
		case ChatActions.ADD_MESSAGE:
			return {
				...state,
				messages: [...state.messages, action.payload]
			}
		default:
			return state;
	}
}