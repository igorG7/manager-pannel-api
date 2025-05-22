import { ValidForm } from "../../util/form/validForm.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("_id");
const body = document.querySelector("body");
const popUpDelete = document.querySelector(".delete-container");

const form = new ValidForm(id);

const deleteButton = document.querySelector(".delete-button1");

deleteButton.addEventListener("click", () => {
  if (!popUpDelete.classList.contains("active"))
    popUpDelete.classList.add("active");
  body.classList.add("lock");
});

popUpDelete.addEventListener("click", (e) => showPopup(e, popUpDelete));

const showPopup = (e, popup) => {
  const classToClose = ["close", "cancel-btn", "delete-container"];

  if (classToClose.includes(e.target.classList[0])) {
    popup.classList.remove("active");
    body.classList.remove("lock");
  }
};
