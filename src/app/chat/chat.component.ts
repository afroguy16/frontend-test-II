import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as Giphy from 'giphy-js-sdk-core';

import { Message } from './message.model';
import { GiphyImage } from './giphy-image.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  giphySearchFormOn = false;
  textFormOn = true;
  giphySearchButton = true;
  GphApiClient = Giphy;
  gyClient = this.GphApiClient('YwPcaq668yJqjvRHSlslfHaIuA6K3uRK');
  gyImages: GiphyImage[] = [];

  messages: Message[] = []; 

  constructor() { }

  ngOnInit() {
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
    this.messages.push(messageToAdd);
  }

  // A function that takes a message from the text message form and adds it to the message array
  onSubmitText(formData: NgForm) {
    // Creates a variable to store chat input
    const chatFormValue = formData.value;
    // Adds a time stamp to the message and a default empty image
    const currentTime = new Date();
    const imagePath = '';
    // Creates a new message from the form data
    const newMessage = new Message(chatFormValue.messageTextInput, imagePath, currentTime);
    // Adds message to the current messages
    this.addMessage(newMessage);

    console.log(this.messages);
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

    })
    searchData.reset();
  }

  // A function that clears that clears the preview images stored in a temporary variable so the variable can used to store new preview images without having the old search preview present in the list
  clearGiphyImages() {
    this.gyImages = [];
  }

  // A function that takes the user selected image from the preview and creates a new message from it
  onSubMitGiphy(selectData: NgForm) {
    // Stores giphy image in a variable
    const selectedImage = selectData.value;

    // Adds a time stamp to the message and a default empty image
    const currentTime = new Date();
    const messageInput = '';

    // Creates a new message from the form data
    const newMessage = new Message(messageInput, selectedImage, currentTime);
    // console.log(newMessage);
    console.log(selectedImage);

    this.addMessage(newMessage);
    this.clearGiphyImages();
  }

}