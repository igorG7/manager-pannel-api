import { ValidateField } from "./ValidateClass.js";
import { FormUI } from "./FormUiClass.js";
import { registerUser } from "../../services/authServices.js";

export class Register {
  async handleSubmit() {
    FormUI.clearError();

    const email = document.querySelector(".email");
    const name = document.querySelector(".user-name");
    const password = document.querySelector(".input-pass");
    const confirm = document.querySelector(".input-confirm");

    const validation = Register.validation(email, name, password, confirm);

    if (validation) {
      const body = {
        userName: name.value.trim(),
        email: email.value.trim().toLowerCase(),
        password: password.value,
        role: "administrator",
      };

      console.log(body);
      await registerUser(body);
    }
  }

  static validation(email, name, password, confirm) {
    let valid = true;

    if (!ValidateField.validName(name.value)) {
      FormUI.error(
        name,
        "deve conter pelo menos 3 letras e apenas caracteres válidos."
      );
      valid = false;
    }

    if (!ValidateField.isEmail(email.value)) {
      FormUI.error(email, "não é válido.");
      valid = false;
    }

    if (!ValidateField.strongPassword(password.value)) {
      const parent = password.parentNode;
      FormUI.error(parent, "não atende aos requisitos.");
      valid = false;
    }

    if (!ValidateField.comparePassword(password.value, confirm.value)) {
      const parentPass = password.parentNode;
      FormUI.error(parentPass, `não corresponde ao campo "Confirmar senha".`);

      const parentConfirm = confirm.parentNode;
      FormUI.error(parentConfirm, `não corresponde ao campo "Senha".`);
      valid = false;
    }

    return valid;
  }
}
