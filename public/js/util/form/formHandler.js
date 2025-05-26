import { FormValidator } from "./formValidator.js";
import { FlashCard } from "../ui/flashCard.js";

import {
  createProduct,
  updateProduct,
  getById,
} from "../../services/productServices.js";

const flashcard = new FlashCard();
export class FormHandler {
  static form = document.querySelector(".form-container");
  static notifyContainer = document.querySelector(".notification-container");
  static checkbox = document.querySelector("#saleOfUnits");
  static unitValue = document.querySelector(".unitValue");

  static async populateFields(id) {
    const fields = FormHandler.form.querySelectorAll(".input-field");
    const data = await getById(id);

    fields.forEach((field) => {
      const nameField = field.getAttribute("name");

      if (data.unitValue) {
        FormHandler.checkbox.checked = true;
        FormHandler.unitValue.classList.remove("disabled");
      }

      field.value = data?.[nameField] ?? "";
    });
  }

  static handleSubmit(id) {
    const submitButton = FormHandler.form.querySelector(".submit-btn");

    submitButton.addEventListener("click", async () => {
      const emptyFields = FormValidator.checkEmptyFields();
      const validateFields = FormValidator.validateFields();
      const body = FormHandler.createObject();
      let data;

      if (emptyFields && validateFields) {
        if (submitButton.classList.contains("update")) {
          data = await updateProduct(id, body);
        } else {
          data = await createProduct(body);
          FormHandler.clearFields();
        }
      }

      const flashResponse = flashcard.createFlash(data.status, data.message);

      FormHandler.notifyContainer.appendChild(flashResponse);
      flashcard.time(flashResponse);
    });
  }

  static handleCleaning() {
    const clearButton = document.querySelector(".clean-btn");

    clearButton.addEventListener("click", FormHandler.clearFields);
  }

  static clearFields() {
    for (let field of FormHandler.form.querySelectorAll(".input-field")) {
      field.value = null;
    }
  }

  static createObject() {
    const fields = FormHandler.form.querySelectorAll(".input-field");
    const body = {};

    for (let field of fields) {
      const name = field.getAttribute("name");
      const typeField = field.getAttribute("type");

      if (field.classList.contains("disabled")) continue;

      if (field.getAttribute("id") === "typePackaging") {
        body[name] = String(field.value);
      }

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
