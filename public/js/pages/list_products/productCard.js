export class Card {
  constructor(data) {
    this.data = data;

    this.appendCard();
  }

  static productList = document.querySelector(".products");

  static fields = [
    { label: "Fabricante:", nameField: "makerName" },
    { label: "Fornecedor:", nameField: "providerName" },
    { label: "Estoque:", nameField: "quantityStock" },
    { label: "Tipo de embalagem:", nameField: "typePackaging" },
    { label: "Unidades por embalagem:", nameField: "units" },
    { label: "Quantidade por unidade:", nameField: "unitQuantity" },
    { label: "Valor de compra:", nameField: "purchaseValue" },
    { label: "Percentual de lucro:", nameField: "percentage" },
    { label: "Valor de venda:", nameField: "saleValue" },
    { label: "Valor da unidade:", nameField: "unitValue" },
  ];

  appendCard() {
    if (this.data) {
      const card = Card.createElement(this.data);
      Card.productList.appendChild(card);
      this.accessProduct(card);
      return;
    }

    Card.productList.appendChild(Card.emptyResults());
  }

  accessProduct(card) {
    card.addEventListener("click", () => {
      window.location.href = `/control-product?_id=${this.data._id}`;
    });
  }

  static divElement() {
    const div = document.createElement("div");
    div.classList.add(...arguments);
    return div;
  }

  static pElement(value, label = "") {
    const p = document.createElement("p");
    p.textContent = `${label}  ${value ?? "N/D"}`;
    return p;
  }

  static emptyResults() {
    const div = Card.divElement("empty");
    const p = Card.pElement("Nenhum produto foi encontrado.");
    const img = document.createElement("img");
    img.setAttribute("src", "/img/face-confused.svg");

    div.appendChild(p);
    div.appendChild(img);
    return div;
  }

  static createElement(data) {
    const cardProduct = Card.divElement("card-product");

    const nameContainer = Card.divElement("card-container-1");
    const nameProduct = Card.pElement(data.productName);
    nameContainer.appendChild(nameProduct);

    const infosContainer = Card.divElement("card-container-2");
    Card.appendPelement(infosContainer, data);

    const modifiedContainer = Card.divElement("card-container-3");
    const date = new Date(data.modified);
    const userDate = `${data.userModified} - ${date.toLocaleString()}`;
    const lastModified = Card.pElement(userDate, "Modificado por:");
    lastModified.classList.add("last-modified");
    modifiedContainer.appendChild(lastModified);

    cardProduct.appendChild(nameContainer);
    cardProduct.appendChild(infosContainer);
    cardProduct.appendChild(modifiedContainer);

    return cardProduct;
  }

  static appendPelement(element, data) {
    for (let field of Card.fields) {
      const nameField = field.nameField;
      const fixedNumbers = ["purchaseValue", "saleValue", "unitValue"];
      const possibleFalse = ["unitQuantity", "unitValue"];

      if (possibleFalse.includes(nameField) && !data[nameField]) {
        element.appendChild(Card.pElement(null, field.label));
        continue;
      }

      if (fixedNumbers.includes(nameField)) {
        element.appendChild(
          Card.pElement(data[nameField].toFixed(2), field.label)
        );
        continue;
      }

      if (nameField === "percentage") {
        const percent = `${data[nameField]}%`;
        element.appendChild(Card.pElement(percent, field.label));
        continue;
      }

      element.appendChild(Card.pElement(data[nameField], field.label));
    }
  }
}
