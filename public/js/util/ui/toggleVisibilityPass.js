export const toggleVisibilityPass = (e, visible, hidden, input, attribute) => {
  if (e.target.classList.contains("on")) {
    visible.classList.remove("on");
    hidden.classList.add("on");
  }

  input.setAttribute("type", attribute);
};
