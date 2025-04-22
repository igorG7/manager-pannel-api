import { toggleVisibilityPass } from "./util/toggleVisibilityPass.js";

const inputPasswordConfirm = document.querySelector(".input-pass");
const showPasswordButton = document.querySelector(".eye");
const hidePasswordButton = document.querySelector(".eye-off");
const inputConfirmPassword = document.querySelector(".input-confirm");
const showPasswordConfirmButton = document.querySelector(".eye-confirm");
const hidePasswordConfirmButton = document.querySelector(".eye-off-confirm");

hidePasswordButton.addEventListener("click", (e) =>
  toggleVisibilityPass(
    e,
    hidePasswordButton,
    showPasswordButton,
    inputPasswordConfirm,
    "text"
  )
);

showPasswordButton.addEventListener("click", (e) =>
  toggleVisibilityPass(
    e,
    showPasswordButton,
    hidePasswordButton,
    inputPasswordConfirm,
    "password"
  )
);

hidePasswordConfirmButton.addEventListener("click", (e) =>
  toggleVisibilityPass(
    e,
    hidePasswordConfirmButton,
    showPasswordConfirmButton,
    inputConfirmPassword,
    "text"
  )
);

showPasswordConfirmButton.addEventListener("click", (e) =>
  toggleVisibilityPass(
    e,
    showPasswordConfirmButton,
    hidePasswordConfirmButton,
    inputConfirmPassword,
    "password"
  )
);
