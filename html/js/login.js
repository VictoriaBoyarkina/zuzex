import getUserName from "./getUserName.js";
import getAvatar from "./getAvatar.js";
import { io } from "socket.io-client";
import uniqid from "uniqid";

// Create socket
let socket = io("http://localhost:3000");

// Current user
const user = localStorage.getItem("userId")
  ? JSON.parse(localStorage.getItem("userId"))
  : null;

// If a user logged in, redirect him to chat
if (user) {
  window.location.href = "/";
}

// Loading state
let loading = false;

// Login button
const button = document.getElementById("login");
button.addEventListener("click", async () => {
  loading = true;
  try {
    const userName = await getUserName();
    const avatar = await getAvatar(userName);
    const user = {
      userName,
      avatar,
      id: uniqid(),
    };
    socket.emit("new user", user);
    localStorage.setItem("userId", JSON.stringify(user));
    window.location.href = "/";
    loading = false;
  } catch (e) {
    // addToast(
    //   "Не нашлось подходящего имени для вас :(",
    //   "bg-danger text-white"
    // );
    console.log(e);
    loading = false;
  }
});
