import { FormValidator } from "./formValidator.js";
import { ProductServices } from "./productServices.js";

export class FormHandler {
  static purchaseValue = document.querySelector(".purchaseValue");
  static percentage = document.querySelector(".percentage");
  static saleValue = document.querySelector(".sale");

  static form = document.querySelector(".form-container");

  static calculateSaleValue() {
    const percentage = document.querySelector(".percentage");
    const purchase = document.querySelector(".purchaseValue");

    const calcResult = () => {
      const result =
        Number((percentage.value / 100) * purchase.value) +
        Number(purchase.value);

      FormHandler.saleValue.value = result.toFixed(2);
    };

    FormHandler.percentage.addEventListener("input", calcResult);
    FormHandler.purchaseValue.addEventListener("input", calcResult);
  }

  static handleSubmit() {
    const registerButton = FormHandler.form.querySelector(".register-btn");

    registerButton.addEventListener("click", () => {
      if (FormValidator.checkEmptyFields() && FormValidator.validateFields()) {
        ProductServices.post();
      }
    });
  }

  static handleCleaning() {
    const clearButton = document.querySelector(".clean-btn");

    clearButton.addEventListener("click", FormHandler.clearFields);
  }

  static clearFields() {
    for (let field of FormHandler.form.querySelectorAll("input")) {
      field.value = null;
    }
  }
}
