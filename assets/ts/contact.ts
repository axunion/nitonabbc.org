const contactPage = document.getElementById("contact");

if (contactPage) {
  const boxInput = contactPage.querySelector(".input");
  const boxWait = contactPage.querySelector(".wait");
  const boxDone = contactPage.querySelector(".done");
  const boxFail = contactPage.querySelector(".fail");
  const contactForm = contactPage.querySelector("form");

  contactForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    if (confirm("送信してよろしいですか？")) {
      const className = "hidden";
      const postData = new FormData(contactForm);

      window.scrollTo(0, 0);
      boxInput.classList.add(className);
      boxWait.classList.remove(className);

      fetch("../api.php", {
        method: "POST",
        body: postData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          return response.text();
        })
        .then((result) => {
          boxWait.classList.add(className);

          if ("1" === result) {
            boxDone.classList.remove(className);
          } else {
            boxFail.classList.remove(className);
          }
        })
        .catch((error) => {
          boxWait.classList.add(className);
          boxFail.classList.remove(className);
          console.error(error);
        });
    }
  });
}
