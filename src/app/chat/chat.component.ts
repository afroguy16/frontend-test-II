import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as Giphy from 'giphy-js-sdk-core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from "rxjs/operators";

import { Message } from './message.model';
import { GiphyImage } from './giphy-image.model';
import * as API from '../api';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit, OnInit {
  chatContainer: HTMLElement;
  giphySearchFormOn = false;
  textFormOn = true;
  giphySearchButton = true;
  GphApiClient = Giphy;
  gyClient = this.GphApiClient(API.gyKey);
  gyError = '';
  gyImages: GiphyImage[] = [];

  messages: Message[] = []; 

  constructor(private chatService: ChatService, private httpClient: HttpClient) { }

  ngOnInit() {
    // this.httpClient.get<Message[]>('https://giphy-chat-ng.firebaseio.com/messages.json')
    //   .subscribe(messages => {
    //     // for (var i=0; i<messages.length; i++)  
    //     //   this.messages.push(<Message>messages[i]);
    //     this.messages = messages;
    //       console.log(this.messages);     
    //   });
  }

  // An auto scroll 
  ngAfterViewInit() {
    this.chatContainer = document.getElementById('chatWrapper'); 
    this.scrollMessage();
         
  }

  scrollMessage() {
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  // A switch that sets the giphy search form on and off
  giphySearchFormSwitch() {
    this.giphySearchFormOn = !this.giphySearchFormOn;
    this.textFormOn = !this.textFormOn;
  }

  // A button that sets the kind of button to be shown once the giphy search box is active
  giphySearchButtonToggle() {
    this.giphySearchButton = !this.giphySearchButton;
  }

  // A switch that sets the text message form on and off
  textFormSwitch() {
    this.textFormOn = !this.textFormOn;
    this.giphySearchFormOn = !this.giphySearchFormOn;
  }

  // A switch that set the giphy picture area on top of the giphy search box on or off
  toggleGiphyPicturesActive(id) {
    document.getElementById(id).classList.toggle('hideGyPictures');
  }

  // A function that adds a new message to the messages array
  addMessage(messageToAdd) {
    // this.messages.push(messageToAdd);
    this.chatService.saveMessage(messageToAdd)
      .subscribe(
        (response) => console.log(response)
      );
    this.scrollMessage();
  }

  // A function that takes a message from the text message form and adds it to the message array
  onSubmitText(formData: NgForm) {
    // Creates a variable to store chat input
    const chatFormValue = formData.value;
    // Adds a time stamp to the message and a default empty image
    const currentTime = new Date();
    const image = {};
    // Creates a new message from the form data
    const newMessage = new Message(chatFormValue.messageTextInput, image, currentTime);
    // Adds message to the current messages
    this.addMessage(newMessage);

    // console.log(this.messages);
    formData.reset();
  }

  // A function that takes in a user search input, calls the Giphy API to search for pictures according to the user input and stores the received images in a temporary variable to be displayed in the template as preview images
  onGiphySearchSubmit(searchData: NgForm) {
    const searchItem = searchData.value.giphyImageSearch;
    this.toggleGiphyPicturesActive('gyPicturesId');

    this.gyClient.search('gifs', {"q": searchItem, 'limit': 5})
    .then((response) => {
      response.data.forEach((gifObject) => {
       this.gyImages.push(new GiphyImage(gifObject.title, gifObject.slug, gifObject.images.preview_gif.url));
      })
      this.giphySearchButtonToggle();

      // this.onSubMitGiphy();
    })
    .catch((err) => {
      // console.log('Please check your internet connection!');
      this.gyError = err;
    })
    searchData.reset();
  }

  // A function that clears that clears the preview images stored in a temporary variable so the variable can used to store new preview images without having the old search preview present in the list
  clearGiphyImages() {
    this.gyImages = [];
  }

 // Searches giphy images preview and assign the one with a particular url (which is the selected image) as selected image
 searchGyImagesPreview(url, giphyImagesArray){
    for (var i=0; i < giphyImagesArray.length; i++) {
        if (giphyImagesArray[i].url === url) {
          // console.log(giphyImagesArray[i]);
            return giphyImagesArray[i];
        }
    }
 }

  // A function that takes the user selected image from the preview and creates a new message from it
  onSubMitGiphy(selectData: NgForm) {
    // Stores selected giphy image in a variable
    const selectedImage = selectData.value;

    // Loop through temporary stored giphy (preview images), and obtain the selected image from it    
    const imageToStore = this.searchGyImagesPreview(selectedImage.url, this.gyImages);
    console.log(imageToStore);

    // Adds a time stamp to the message and a default empty image
    const currentTime = new Date();
    const messageInput = '';

    // Creates a new message from the form data
    const newMessage = new Message(messageInput, imageToStore, currentTime);

    this.addMessage(newMessage);
    this.clearGiphyImages();
  }

}