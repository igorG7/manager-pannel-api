import { FormHandler } from "./formHandler.js";
import { FormCalculate } from "./formCalculate.js";
export class ValidForm {
  constructor(id) {
    this.id = id ?? "";
    this.loadEvents();
  }

  loadEvents() {
    FormHandler.handleSubmit(this.id);
    FormHandler.handleCleaning();
    FormCalculate.calculateSaleValue();
    FormCalculate.enableSaleOfUnits();
  }

  handlePopulateFields() {
    FormHandler.populateFields(this.id);
  }
}
