import { io } from "socket.io-client";
import previewImage from "./previewImage";
import compressAndConvertToBase64 from "./toBase64";
import addUser from "./addUser"
import uniqid from "uniqid";

//Create pareser
const parser = new DOMParser();

// Initialize ockets
let socket = io("http://localhost:3000");

// Request users
socket.emit("get users");

// Our users container
const usersBox = document.getElementById("users-box");

// Current user
const user = localStorage.getItem("userId")
  ? JSON.parse(localStorage.getItem("userId"))
  : null;

//Set name
const userName = document.getElementById("userName");
userName.textContent = user.userName;

//Set avatar
const svgDoc = parser.parseFromString(user.avatar, "text/xml");
const svgElement = svgDoc.documentElement;
svgElement.classList.add("navigation__user-icon");
const avatarContainer = document.getElementById("avatar");
avatarContainer.prepend(svgElement);

socket.on("all users", (users) => {
  usersBox.innerHTML = "";
  // localStorage.setItem("users", JSON.stringify(users));
  const filtredUsers = users.filter((u) => u.id !== user.id);
  filtredUsers.forEach((user) => addUser(user, usersBox));
});

socket.on("all messages", (messages) => {
  messagesBox.innerHTML = '';
  messages.forEach((m) => {
    addMessage(m, user, messagesBox)
  })
});

const messagesBox = document.getElementById('messages-box');
socket.on("chat message", (message) => {
  addMessage(message, user, messagesBox);
});

socket.on("new user", (user) => {
  console.log("new user");
  addUser(user, usersBox);
});

//Logout button
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    console.log("hi");
    localStorage.clear();
    window.location.href = "/login";
  });
}

const loadImage = (base64) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64}`;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });
};

//Messages input
const messageInput = document.getElementById("messages-input");

// Form submit
const form = document.getElementById("messages-form");
form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const message = messageInput.value;
  const file = fileInput.files[0];
  if (!message && !file) {
    return;
  } else if (file) {
    compressAndConvertToBase64(file)
      .then(([fullBase64, base64String]) => {
        const msg = {
          text: message,
          img: base64String,
          id: uniqid(),
          userAvatar: user.avatar,
          userName: user.userName,
          userId: user.id,
          date: Date.now(),
        };
        socket.emit("chat message", msg);
        form.reset();
        const preview = document.querySelector(".preview-outer");
        preview.remove();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    const msg = {
      text: message,
      img: "",
      id: uniqid(),
      userAvatar: user.avatar,
      userName: user.userName,
      userId: user.id,
      date: Date.now(),
    };
    socket.emit("chat message", msg);
    form.reset();
  }
}

// Container for previewing image
const previewContainer = document.querySelector(".chat__messages-container");

// Choosing image
const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    compressAndConvertToBase64(file)
      .then(([fullBase64, base64String]) => {
        previewImage(previewContainer, fullBase64);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
