import { toggleVisibilityPass } from "../../util/ui/toggleVisibilityPass.js";

const inputPass = document.querySelector(".input");
const showPass = document.querySelector(".eye");
const hidePass = document.querySelector(".eye-off");

hidePass.addEventListener("click", (e) =>
  toggleVisibilityPass(e, hidePass, showPass, inputPass, "text")
);

showPass.addEventListener("click", (e) =>
  toggleVisibilityPass(e, showPass, hidePass, inputPass, "password")
);
