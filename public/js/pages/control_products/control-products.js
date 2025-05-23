import { ValidForm } from "../../util/form/validForm.js";
import { deleteProduct } from "../../services/productServices.js";
import { FlashCard } from "../../util/ui/flashCard.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("_id");
const body = document.querySelector("body");
const popUpDelete = document.querySelector(".popup-delete-container");
const confirmButton = document.querySelector(".confirm-delete");
const notifyContainer = document.querySelector(".notification-container");

const form = new ValidForm(id);
const flashCard = new FlashCard();

const deleteButton = document.querySelector(".delete-button");

deleteButton.addEventListener("click", () => {
  if (!popUpDelete.classList.contains("active"))
    popUpDelete.classList.add("active");
  body.classList.add("lock");
});

popUpDelete.addEventListener("click", (e) => showPopup(e, popUpDelete));

const showPopup = (e, popup) => {
  const classToClose = ["close", "cancel-btn", "popup-delete-container"];

  if (classToClose.includes(e.target.classList[0])) {
    popup.classList.remove("active");
    body.classList.remove("lock");
  }
};

confirmButton.addEventListener("click", async () => {
  const res = await deleteProduct(id);

  popUpDelete.classList.remove("active");
  body.classList.remove("lock");

  const flashResponse = flashCard.createFlash(res.status, res.message);
  notifyContainer.appendChild(flashResponse);

  flashCard.time(flashResponse);
  setTimeout(() => {
    window.location.href = "/index";
  }, 2500);
});
