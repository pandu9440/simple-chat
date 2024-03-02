// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAoo6HgrTQ7oHylhtkq2i69wjPv6TF5C7U",
  authDomain: "onlinechat-c21c2.firebaseapp.com",
  projectId: "onlinechat-c21c2",
  storageBucket: "onlinechat-c21c2.appspot.com",
  messagingSenderId: "318388387973",
  appId: "1:318388387973:web:ce9231bdf8cb96570be9ec"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const chatMessages = document.getElementById("chat-messages");

// Function to send a message
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message !== "") {
    // Get a key for a new message
    const newMessageKey = database.ref().child("messages").push().key;

    // Write the new message
    const updates = {};
    updates["/messages/" + newMessageKey] = {
      sender: "User 1", // Change this to the appropriate sender
      message: message
    };
    database.ref().update(updates);

    // Clear the message input field
    messageInput.value = "";
  }
}

// Function to display messages
function displayMessages() {
  database.ref("messages").on("value", function(snapshot) {
    chatMessages.innerHTML = ""; // Clear previous messages
    snapshot.forEach(function(childSnapshot) {
      const message = childSnapshot.val();
      const messageDiv = document.createElement("div");
      messageDiv.textContent = message.sender + ": " + message.message;
      chatMessages.appendChild(messageDiv);
    });
    // Scroll to the bottom of the chat box
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

// Call the displayMessages function when the page loads
displayMessages();
