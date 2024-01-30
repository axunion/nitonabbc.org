declare const grecaptcha: {
  ready(callback: () => void): Promise<void>;
  execute(siteKey: string, options: { action: string }): Promise<string>;
};

interface PostResponse {
  result: "done" | "error";
  error: string;
}

export const setupContactPage = () => {
  const contact = document.getElementById("contact");

  if (contact) {
    const boxInput = contact.querySelector(".input");
    const boxWait = contact.querySelector(".wait");
    const boxDone = contact.querySelector(".done");
    const boxFail = contact.querySelector(".fail");
    const contactForm = contact.querySelector("form");

    contactForm.addEventListener("submit", (event: Event) => {
      event.preventDefault();

      const siteKey = "6LemGUgpAAAAAHNy3XuUPkWhP2KZXkp1EfmC5lDh";
      const postUrl = "https://script.google.com/macros/s/AKfycbwVrcTOx7j6Joi6ia4Hpe7IDoq_zPIcl-MM-Sd8QFfVGwuTiMtQfD7AmEQ046UYhGxD/exec";
      const className = "hidden";
      const formData = new FormData(contactForm);

      boxInput.classList.add(className);
      boxWait.classList.remove(className);
      window.scrollTo(0, 0);

      grecaptcha.ready(function () {
        grecaptcha.execute(siteKey, { action: "submit" }).then(function (token) {
          formData.append("type", "000000");
          formData.append("recaptcha", token);

          const postData = Object.fromEntries(formData.entries());

          fetch(postUrl, {
            method: "POST",
            body: JSON.stringify(postData),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              return response.json();
            })
            .then((responseData: PostResponse) => {
              boxWait.classList.add(className);

              if (responseData.result === "done") {
                boxDone.classList.remove(className);
              } else {
                boxFail.classList.remove(className);
              }
            })
            .catch((error) => {
              boxWait.classList.add(className);
              boxFail.classList.remove(className);
            });
        });
      });
    });
  }
};
