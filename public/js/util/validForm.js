class ValidForm {
  constructor() {
    this.form = document.querySelector(".form-container");

    this.productName = this.form.querySelector(".productName");
    this.makerName = this.form.querySelector(".makerName");
    this.providerName = this.form.querySelector(".providerName");
    this.quantityStock = this.form.querySelector(".quantityStock");
    this.units = this.form.querySelector(".units");
    this.purchaseValue = this.form.querySelector(".purchaseValue");
    this.percentage = this.form.querySelector(".percentage");
    this.saleValue = this.form.querySelector(".sale");

    this.loadEvents();
  }

  loadEvents() {
    this.handleSubmit();
    this.handleCleaning();
    this.calculateSaleValue();
  }

  handleSubmit() {
    const registerButton = this.form.querySelector(".register-btn");

    registerButton.addEventListener("click", () => {
      if (this.checkEmptyFields() && this.validateFields()) {
        const body = this.createObject();
        this.post(body);
      }
    });
  }

  async post(body) {
    try {
      await axios.post("/products", body);
      this.clearFields();
    } catch (error) {
      console.log(error);
    }
  }

  handleCleaning() {
    const clearButton = this.form.querySelector(".clean-btn");

    clearButton.addEventListener("click", () => {
      this.clearFields();
    });
  }

  clearFields() {
    for (let field of this.form.querySelectorAll("input")) {
      field.value = null;
    }
  }

  createObject() {
    return {
      productName: String(this.productName.value),
      makerName: String(this.makerName.value),
      providerName: String(this.providerName.value),
      quantityStock: Number(this.quantityStock.value),
      purchaseValue: Number(this.purchaseValue.value),
      units: Number(this.units.value),
      percentage: Number(this.percentage.value),
      saleValue: Number(this.saleValue.value),
    };
  }

  validateFields() {
    let valid = true;

    const fields = [
      this.units,
      this.purchaseValue,
      this.percentage,
      this.saleValue,
    ];

    for (let field of fields) {
      if (field.value === "") continue;

      if (field.value <= 0) {
        this.error(field, `precisa ser maior que zero.`);
      }
    }

    if (!this.integer()) valid = false;

    return valid;
  }

  integer() {
    let valid = true;

    const fields = [this.quantityStock, this.units, this.percentage];

    for (let field of fields) {
      const valueConverted = Number(field.value);

      if (field.value === "" || field.value == 0) continue;

      if (!Number.isInteger(valueConverted)) {
        this.error(field, `"precisa ser um número inteiro.`);
        valid = false;
      }
    }

    return valid;
  }

  checkEmptyFields() {
    let valid = true;

    for (let error of this.form.querySelectorAll(".error-text")) {
      error.remove();
    }

    for (let field of this.form.querySelectorAll("input")) {
      field.style.borderColor = "#486966";

      if (!field.value) {
        this.error(field, `não pode estar vazio.`);
        valid = false;
      }
    }

    return valid;
  }

  calculateSaleValue() {
    const percentage = this.form.querySelector(".percentage");
    const purchase = this.form.querySelector(".purchaseValue");

    const calcResult = () => {
      const result =
        Number((percentage.value / 100) * purchase.value) +
        Number(purchase.value);

      this.saleValue.value = result.toFixed(2);
    };

    this.percentage.addEventListener("input", calcResult);
    this.purchaseValue.addEventListener("input", calcResult);
  }

  error(field, message) {
    const span = document.createElement("span");
    const label = field.previousElementSibling.textContent.replace(/:/, "");

    field.style.borderColor = "#bd2a2e";
    span.textContent = `"${label}" ${message}`;
    span.classList.add("error-text");
    field.insertAdjacentElement("afterend", span);
  }
}

const form = new ValidForm();
