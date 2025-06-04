export const logoutEvent = () => {
  const logout = document.querySelector(".logout");

  logout.addEventListener("click", () => {
    const confirmLogout = confirm(
      "Você será desconectado após confirmar, para continuar usando a plataforma será necessário realizar Login novamente."
    );

    if (confirmLogout) window.location.href = "/logout";
  });
};
