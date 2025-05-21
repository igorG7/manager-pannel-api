import { FormHandler } from "./formHandler.js";
export class ValidForm {
  constructor(id) {
    this.id = id ?? "";
    this.loadEvents();
  }

  loadEvents() {
    FormHandler.handleSubmit(this.id);
    FormHandler.handleCleaning();
    FormHandler.calculateSaleValue();
    FormHandler.enableSaleOfUnits();
    FormHandler.populateFields(this.id);
  }
}
