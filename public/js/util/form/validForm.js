import { FormHandler } from "./formHandler.js";
class ValidForm {
  constructor() {
    this.loadEvents();
  }

  loadEvents() {
    FormHandler.handleSubmit();
    FormHandler.handleCleaning();
    FormHandler.calculateSaleValue();
  }
}

const form = new ValidForm();
