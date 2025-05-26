export class FormCalculate {
  static purchaseValue = document.querySelector(".purchaseValue");
  static percentage = document.querySelector(".percentage");
  static saleValue = document.querySelector(".sale");
  static checkbox = document.querySelector("#saleOfUnits");
  static units = document.querySelector(".units");
  static unitValue = document.querySelector(".unitValue");

  static calculateSaleValue() {
    FormCalculate.percentage.addEventListener("input", FormCalculate.calculate);
    FormCalculate.purchaseValue.addEventListener(
      "input",
      FormCalculate.calculate
    );
    FormCalculate.units.addEventListener("input", FormCalculate.calculate);
    FormCalculate.saleValue.addEventListener(
      "input",
      FormCalculate.calculateUnitValue
    );
  }

  static calculateUnitValue() {
    const units = document.querySelector(".units");
    const result = document.querySelector(".sale");

    if (Number(units.value) === 0) return;
    if (FormCalculate.unitValue.classList.contains("disabled")) return;

    const unitValue = Number(result.value) / Number(units.value);
    FormCalculate.unitValue.value = unitValue.toFixed(2);
  }

  static calculate() {
    const percentage = document.querySelector(".percentage");
    const purchase = document.querySelector(".purchaseValue");

    if (percentage.value === "" || purchase.value === "") return;

    const result =
      Number((percentage.value / 100) * purchase.value) +
      Number(purchase.value);

    FormCalculate.saleValue.value = result.toFixed(2);

    if (!FormCalculate.unitValue.classList.contains("disabled")) {
      FormCalculate.calculateUnitValue();
    }
  }

  static enableSaleOfUnits() {
    FormCalculate.checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        FormCalculate.unitValue.removeAttribute("disabled");
        FormCalculate.unitValue.classList.remove("disabled");
        FormCalculate.calculateUnitValue();

        return;
      }

      FormCalculate.unitValue.setAttribute("disabled", "disabled");
      FormCalculate.unitValue.classList.add("disabled");
      FormCalculate.unitValue.value = null;
    });
  }
}
