import { toggleVisibilityPass } from "../../util/ui/toggleVisibilityPass.js";
import { Register } from "../../util/auth-form/RegisterClass.js";

const inputPassword = document.querySelector(".input-pass");
const showPass = document.querySelector(".eye");
const hidePass = document.querySelector(".eye-off");
const inputConfirm = document.querySelector(".input-confirm");
const showConfirm = document.querySelector(".eye-confirm");
const hideConfirm = document.querySelector(".eye-off-confirm");

const registerButton = document.querySelector(".register-btn");

const formRegister = new Register();

hidePass.addEventListener("click", (e) =>
  toggleVisibilityPass(e, hidePass, showPass, inputPassword, "text")
);

showPass.addEventListener("click", (e) =>
  toggleVisibilityPass(e, showPass, hidePass, inputPassword, "password")
);

hideConfirm.addEventListener("click", (e) =>
  toggleVisibilityPass(e, hideConfirm, showConfirm, inputConfirm, "text")
);

showConfirm.addEventListener("click", (e) =>
  toggleVisibilityPass(e, showConfirm, hideConfirm, inputConfirm, "password")
);

registerButton.addEventListener("click", () => {
  formRegister.handleSubmit();
});
