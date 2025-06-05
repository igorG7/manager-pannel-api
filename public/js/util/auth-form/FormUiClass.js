export class FormUI {
  static error(field, message) {
    const errorText = document.createElement("p");
    const label = field.previousElementSibling.textContent.replace(/[:*]/g, "");

    errorText.classList.add("error-text");
    errorText.textContent = `"${label}" ${message}`;

    field.style.borderColor = "#bd2a2e";

    if (field.classList.contains("input-password")) {
      field.querySelector("input").style.borderColor = "#bd2a2e";
    }

    field.insertAdjacentElement("afterEnd", errorText);
  }

  static clearError() {
    const errors = document.querySelectorAll(".error-text");
    errors.forEach((error) => error.remove());

    const fields = document.querySelectorAll("input");
    fields.forEach((field) => (field.style.borderColor = "#486966"));
  }

  static clearFields() {
    const fields = document.querySelectorAll("input");
    fields.forEach((field) => (field.value = ""));
  }
}
