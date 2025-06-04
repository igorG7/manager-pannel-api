export const toggleSideMenu = () => {
  const sideMenu = document.querySelector(".side-menu");
  const itemsMenu = document.querySelectorAll(".item-menu");
  const menuButton = document.querySelector(".btn-menu");

  menuButton.addEventListener("click", () => {
    if (!sideMenu.classList.contains("active")) {
      sideMenu.classList.add("active");
      itemsMenu.forEach((item) => item.classList.add("active"));
      return;
    }

    sideMenu.classList.remove("active");
    itemsMenu.forEach((item) => item.classList.remove("active"));
  });
};
