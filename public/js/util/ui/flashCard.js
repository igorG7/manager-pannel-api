export class FlashCard {
  createFlash(status, message) {
    const notification = this.divNotification();
    const messageDiv = this.divMessage();
    const close = this.close();
    const icon = document.createElement("img");
    const span = document.createElement("span");

    this.closeFlash(notification);

    if (status === "success") {
      notification.classList.add("success");
      icon.setAttribute("src", "/img/success-circle.svg");
      icon.setAttribute("alt", "Icone de sucesso");
      span.textContent = message;
      close.setAttribute("src", "/img/close-white.svg");
    }

    if (status === "error") {
      notification.classList.add("error");
      icon.setAttribute("src", "/img/warning-circle.svg");
      icon.setAttribute("alt", "Icone de aviso");
      span.textContent = message;
      close.setAttribute("src", "/img/close-red.svg");
    }

    messageDiv.appendChild(icon);
    messageDiv.appendChild(span);

    notification.appendChild(messageDiv);
    notification.appendChild(close);

    return notification;
  }

  divNotification() {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    return notification;
  }

  divMessage() {
    const divmessage = document.createElement("div");
    divmessage.classList.add("message");
    return divmessage;
  }

  close() {
    const close = document.createElement("img");
    close.classList.add("close");
    close.setAttribute("alt", "Icone para fechar");

    return close;
  }

  closeFlash(element) {
    element.addEventListener("click", (e) => {
      if (e.target.classList.contains("close")) element.remove();
    });
  }

  time(flashcard) {
    setTimeout(() => {
      flashcard.remove();
    }, 6000);
  }
}
