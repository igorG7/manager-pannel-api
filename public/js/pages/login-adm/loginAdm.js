import { toggleVisibilityPass } from "../../util/ui/toggleVisibilityPass.js";
import { Login } from "../../util/auth-form/LoginClass.js";

const inputPass = document.querySelector(".input");
const showPass = document.querySelector(".eye");
const hidePass = document.querySelector(".eye-off");
const form = document.querySelector(".form-login-container");

const formLogin = new Login();

hidePass.addEventListener("click", (e) =>
  toggleVisibilityPass(e, hidePass, showPass, inputPass, "text")
);

showPass.addEventListener("click", (e) =>
  toggleVisibilityPass(e, showPass, hidePass, inputPass, "password")
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formLogin.handleLogin();
});
