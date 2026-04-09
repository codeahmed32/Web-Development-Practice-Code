function chatApp(){
    //targetting the id's
    const chatAreaRef = document.querySelector("#chatDisplay");
    const userInputRef = document.querySelector("#messageInput");
    // taking the value from the input tag
    const userMessages = userInputRef.value;
    // creating an element to store the messages in it 
    const newMessage = document.createElement('p');
    // storing the text messages of user in newMessages
    newMessage.textContent =  userMessages;
    chatAreaRef.appendChild(newMessage);
}