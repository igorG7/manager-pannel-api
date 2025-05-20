import { FormHandler } from "./formHandler.js";
export class ValidForm {
  constructor(id) {
    this.loadEvents();
    this.id = id ?? "";
  }

  loadEvents() {
    FormHandler.handleSubmit(this.id);
    FormHandler.handleCleaning();
    FormHandler.calculateSaleValue();
    FormHandler.enableSaleOfUnits();
  }
}
