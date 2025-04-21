import { toggleVisibilityPass } from "./util/toggleVisibilityPass.js";

const inputPassword = document.querySelector(".input");
const showPasswordButton = document.querySelector(".eye");
const hidePasswordButton = document.querySelector(".eye-off");

hidePasswordButton.addEventListener("click", (e) =>
  toggleVisibilityPass(
    e,
    hidePasswordButton,
    showPasswordButton,
    inputPassword,
    "text"
  )
);

showPasswordButton.addEventListener("click", (e) =>
  toggleVisibilityPass(
    e,
    showPasswordButton,
    hidePasswordButton,
    inputPassword,
    "password"
  )
);
