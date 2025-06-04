const menuButton = document.querySelector(".btn-menu");
const sideMenu = document.querySelector(".side-menu");
const itemsMenu = document.querySelectorAll(".item-menu");

menuButton.addEventListener("click", (e) => {
  if (!sideMenu.classList.contains("active")) {
    sideMenu.classList.add("active");
    itemsMenu.forEach((item) => item.classList.add("active"));
    return;
  }

  sideMenu.classList.remove("active");
  itemsMenu.forEach((item) => item.classList.remove("active"));
});

const logout = document.querySelector(".logout");

logout.addEventListener("click", () => {
  const confirmLogout = confirm(
    "Você será desconectado após confirmar, para continuar usando a plataforma será necessário realizar Login novamente."
  );

  if (confirmLogout) window.location.href = "/logout";
});
