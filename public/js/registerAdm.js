import { toggleVisibilityPass } from "./util/toggleVisibilityPass.js";

const pass = document.querySelector(".input-pass");
const showPasswordButton1 = document.querySelector(".eye");
const hidePasswordButton1 = document.querySelector(".eye-off");
const inputConfirmPassword = document.querySelector(".input-confirm");
const showPasswordConfirmButton = document.querySelector(".eye-confirm");
const hidePasswordConfirmButton = document.querySelector(".eye-off-confirm");

hidePasswordButton1.addEventListener("click", (e) =>
  toggleVisibilityPass(
    e,
    hidePasswordButton1,
    showPasswordButton1,
    pass,
    "text"
  )
);

showPasswordButton1.addEventListener("click", (e) =>
  toggleVisibilityPass(
    e,
    showPasswordButton1,
    hidePasswordButton1,
    pass,
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
