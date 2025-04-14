const menuButton = document.querySelector(".btn-menu");
const sideMenu = document.querySelector(".side-menu");
const itemsMenu = document.querySelectorAll(".item-menu");
const editButton = document.querySelector(".edit-button");
const popUpUpdate = document.querySelector(".update-container");

menuButton.addEventListener("click", (e) => {
  if (!sideMenu.classList.contains("active")) {
    sideMenu.classList.add("active");
    itemsMenu.forEach((item) => item.classList.add("active"));
    return;
  }

  sideMenu.classList.remove("active");
  itemsMenu.forEach((item) => item.classList.remove("active"));
});

editButton.addEventListener("click", () => {
  if (!popUpUpdate.classList.contains("active"))
    popUpUpdate.classList.add("active");
});

popUpUpdate.addEventListener("click", (e) => showPopup(e, popUpUpdate));

const showPopup = (e, popup) => {
  console.log(e.target);

  const classToClose = ["update-container", "close", "cancel-button"];

  console.log(classToClose.includes(e.target.classList[0]));

  if (classToClose.includes(e.target.classList[0])) {
    popup.classList.remove("active");
  }
};
