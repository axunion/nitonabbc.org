const nav = document.getElementById("nav");

if (nav) {
  const menuButton = nav.nextElementSibling;
  const closeButton = nav.querySelector(".close-button");

  menuButton.addEventListener("click", () => {
    nav.classList.add("active");
    document.body.classList.add("nav-active");
  });

  closeButton.addEventListener("click", () => {
    nav.classList.remove("active");
    document.body.classList.remove("nav-active");
  });
}
