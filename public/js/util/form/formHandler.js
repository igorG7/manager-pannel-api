import { FormValidator } from "./formValidator.js";
import { ProductServices } from "./productServices.js";

export class FormHandler {
  static purchaseValue = document.querySelector(".purchaseValue");
  static percentage = document.querySelector(".percentage");
  static saleValue = document.querySelector(".sale");
  static checkbox = document.querySelector("#saleOfUnits");
  static units = document.querySelector(".units");
  static unitValue = document.querySelector(".unitValue");

  static form = document.querySelector(".form-container");

  static calculateSaleValue() {
    FormHandler.percentage.addEventListener("input", FormHandler.calculate);
    FormHandler.purchaseValue.addEventListener("input", FormHandler.calculate);
    FormHandler.units.addEventListener("input", FormHandler.calculate);
    FormHandler.saleValue.addEventListener(
      "input",
      FormHandler.calculateUnitValue
    );
  }

  static calculate() {
    const percentage = document.querySelector(".percentage");
    const purchase = document.querySelector(".purchaseValue");

    if (percentage.value === "" || purchase.value === "") return;

    const result =
      Number((percentage.value / 100) * purchase.value) +
      Number(purchase.value);

    FormHandler.saleValue.value = result.toFixed(2);

    if (!FormHandler.unitValue.classList.contains("disabled")) {
      FormHandler.calculateUnitValue();
    }
  }

  static calculateUnitValue() {
    const units = document.querySelector(".units");
    const result = document.querySelector(".sale");

    if (Number(units.value) === 0) return;
    if (FormHandler.unitValue.classList.contains("disabled")) return;

    const unitValue = Number(result.value) / Number(units.value);
    FormHandler.unitValue.value = unitValue.toFixed(2);
  }

  static handleSubmit() {
    const submitButton = FormHandler.form.querySelector(".submit-btn");

    submitButton.addEventListener("click", () => {
      const emptyFields = FormValidator.checkEmptyFields();
      const validateFields = FormValidator.validateFields();

      if (emptyFields && validateFields) {
        submitButton.classList.contains("update")
          ? ProductServices.put()
          : ProductServices.post();
      }
    });
  }

  static enableSaleOfUnits() {
    FormHandler.checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        FormHandler.unitValue.removeAttribute("disabled");
        FormHandler.unitValue.classList.remove("disabled");
        FormHandler.calculateUnitValue();

        return;
      }

      FormHandler.unitValue.setAttribute("disabled", "disabled");
      FormHandler.unitValue.classList.add("disabled");
      FormHandler.unitValue.value = null;
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
}
