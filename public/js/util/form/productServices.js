import { FormHandler } from "./formHandler.js";
import { FlashCard } from "../ui/flashCard.js";

const flash = new FlashCard();

export class ProductServices {
  static notifyContainer = document.querySelector(".notification-container");
  static form = document.querySelector(".form-container");

  static async post() {
    try {
      const res = await axios.post("/products", ProductServices.createObject());
      const data = res.data;

      const flashSuccess = flash.createFlash(data.status, data.message);

      ProductServices.notifyContainer.appendChild(flashSuccess);

      ProductServices.time(flashSuccess);
      FormHandler.clearFields();
    } catch (error) {
      const data = error.response.data;
      const flashErro = flash.createFlash(data.status, data.message);

      ProductServices.notifyContainer.appendChild(flashErro);
      ProductServices.time(flashErro);
    }
  }

  static time(flashcard) {
    setTimeout(() => {
      flashcard.remove();
    }, 6000);
  }

  static createObject() {
    const fields = ProductServices.form.querySelectorAll("input");
    const body = {};

    for (let field of fields) {
      const name = field.getAttribute("name");
      const typeField = field.getAttribute("type");

      if (field.classList.contains("disabled")) continue;

      if (typeField === "text") {
        body[name] = String(field.value);
      }

      if (typeField === "number") {
        body[name] = Number(field.value);
      }
    }

    return body;
  }
}
