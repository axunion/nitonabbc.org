const contact = document.getElementById('contact');
const boxInput = contact.querySelector('.input');
const boxWait = contact.querySelector('.wait');
const boxDone = contact.querySelector('.done');
const boxFail = contact.querySelector('.fail');
const contactForm = contact.querySelector('form');

contactForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  if (confirm('送信してよろしいですか？')) {
    const className = 'hidden';
    const postData = new FormData(contactForm);

    window.scrollTo(0, 0);
    boxInput.classList.add(className);
    boxWait.classList.remove(className);

    fetch('../api.php', {
      method: 'POST',
      body: postData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.text();
      })
      .then((result) => {
        boxWait.classList.add(className);

        if ('1' === result) {
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
