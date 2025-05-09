export class FormValidator {
  static quantityStock = document.querySelector(".quantityStock");
  static units = document.querySelector(".units");
  static percentage = document.querySelector(".percentage");
  static purchaseValue = document.querySelector(".purchaseValue");
  static saleValue = document.querySelector(".sale");
  static unitValue = document.querySelector(".unitValue");
  static unitQuantity = document.querySelector(".unitQuantity");

  static checkEmptyFields() {
    let valid = true;

    const form = document.querySelector(".form-container");

    for (let error of form.querySelectorAll(".error-text")) {
      error.remove();
    }

    for (let field of form.querySelectorAll(".input-field")) {
      field.style.borderColor = "#486966";

      if (field.getAttribute("id") === "typePackaging") {
        const options = Array.from(field.querySelectorAll("option")).map(
          (item) => item.value
        );
        options.shift();

        if (!options.includes(field.value)) {
          FormValidator.error(field, `Deve ter uma opção selecionada.`);
          valid = false;
          continue;
        }
      }

      if (!field.value) {
        if (field.classList.contains("disabled")) continue;
        if (field.classList.contains("unitQuantity")) continue;

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
      FormValidator.unitQuantity,
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
      FormValidator.unitValue,
    ];

    for (let field of fields) {
      if (field.classList.contains("disabled")) continue;
      if (field.value === "") continue;

      if (field.value <= 0) {
        FormValidator.error(field, `precisa ser maior que zero.`);
        valid = false;
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
