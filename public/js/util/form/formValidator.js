export class FormValidator {
  static quantityStock = document.querySelector(".quantityStock");
  static units = document.querySelector(".units");
  static percentage = document.querySelector(".percentage");
  static purchaseValue = document.querySelector(".purchaseValue");
  static saleValue = document.querySelector(".sale");

  static checkEmptyFields() {
    let valid = true;

    const form = document.querySelector(".form-container");

    for (let error of form.querySelectorAll(".error-text")) {
      error.remove();
    }

    for (let field of form.querySelectorAll("input")) {
      field.style.borderColor = "#486966";

      if (!field.value) {
        FormValidator.error(field, `não pode estar vazio.`);
        valid = false;
      }
    }

    return valid;
  }

  static integer() {
    let valid = true;

    const fields = [
      FormValidator.quantityStock,
      FormValidator.units,
      FormValidator.percentage,
    ];

    for (let field of fields) {
      const valueConverted = Number(field.value);

      if (field.value === "" || field.value == 0) continue;

      if (!Number.isInteger(valueConverted)) {
        FormValidator.error(field, `"precisa ser um número inteiro.`);
        valid = false;
      }
    }

    return valid;
  }

  static validateFields() {
    let valid = true;

    const fields = [
      FormValidator.units,
      FormValidator.purchaseValue,
      FormValidator.percentage,
      FormValidator.saleValue,
    ];

    for (let field of fields) {
      if (field.value === "") continue;

      if (field.value <= 0) {
        FormValidator.error(field, `precisa ser maior que zero.`);
      }
    }

    if (!FormValidator.integer()) valid = false;

    return valid;
  }

  static error(field, message) {
    const span = document.createElement("span");
    const label = field.previousElementSibling.textContent.replace(/:/, "");

    field.style.borderColor = "#bd2a2e";
    span.textContent = `"${label}" ${message}`;
    span.classList.add("error-text");
    field.insertAdjacentElement("afterend", span);
  }
}
