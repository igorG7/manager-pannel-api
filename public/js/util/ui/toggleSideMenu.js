export const toggleSideMenu = () => {
  const sideMenu = document.querySelector(".side-menu");
  const itemsMenu = document.querySelectorAll(".item-menu");
  const menuButton = document.querySelector(".btn-menu");
  const user = document.querySelector(".user");

  menuButton.addEventListener("click", () => {
    if (!sideMenu.classList.contains("active")) {
      sideMenu.classList.add("active");
      user.classList.add("active");
      itemsMenu.forEach((item) => item.classList.add("active"));
      return;
    }

    sideMenu.classList.remove("active");
    user.classList.remove("active");
    itemsMenu.forEach((item) => item.classList.remove("active"));
  });
};
