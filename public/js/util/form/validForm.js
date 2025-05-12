import { FormHandler } from "./formHandler.js";
class ValidForm {
  constructor() {
    this.loadEvents();
  }

  loadEvents() {
    FormHandler.handleSubmit();
    FormHandler.handleCleaning();
    FormHandler.calculateSaleValue();
    FormHandler.enableSaleOfUnits();
  }
}

const form = new ValidForm();
