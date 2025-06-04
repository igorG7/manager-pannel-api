import { FormUI } from "./FormUiClass.js";
import { ValidateField } from "./ValidateClass.js";
import { loginAdm } from "../../services/authServices.js";
import { FlashCard } from "../ui/flashCard.js";

const flashCard = new FlashCard();

export class Login {
  async handleLogin() {
    FormUI.clearError();

    const email = document.querySelector(".email");
    const password = document.querySelector(".password");

    const validation = Login.validation(email, password);

    if (validation) {
      const body = {
        email: email.value.trim().toLowerCase(),
        password: password.value,
      };

      const response = await loginAdm(body);

      if (response.status === "success") {
        window.location.href = response.redirect;
        return;
      }

      Login.feedback(response);
    }
  }

  static validation(email, password) {
    let valid = true;

    if (!ValidateField.isEmail(email.value)) {
      FormUI.error(email, "não é válido.");
      valid = false;
    }

    if (password.value.length <= 0) {
      const parent = password.parentNode;
      FormUI.error(parent, "não é válida.");
      valid = false;
    }

    return valid;
  }

  static feedback(data) {
    const notifyContainer = document.querySelector(".notification-container");
    const flashResponse = flashCard.createFlash(data.status, data.message);

    notifyContainer.appendChild(flashResponse);
    flashCard.time(flashResponse);
  }
}
