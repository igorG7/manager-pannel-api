const inputPassword = document.querySelector(".input");
const showPasswordButton = document.querySelector(".eye");
const hidePasswordButton = document.querySelector(".eye-off");

hidePasswordButton.addEventListener("click", (e) =>
  toggleVisibilityPass(e, hidePasswordButton, showPasswordButton, "text")
);

showPasswordButton.addEventListener("click", (e) =>
  toggleVisibilityPass(e, showPasswordButton, hidePasswordButton, "password")
);

export const toggleVisibilityPass = (e, visible, hidden, attribute) => {
  if (e.target.classList.contains("on")) {
    visible.classList.remove("on");
    hidden.classList.add("on");
  }

  inputPassword.setAttribute("type", attribute);
};
