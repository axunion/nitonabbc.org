const nav = document.getElementById('nav');
const menuButton = document.querySelector('#nav + .menu-button');
const closeButton = document.querySelector('#nav .close-button');

menuButton?.addEventListener('click', () => {
  nav?.classList.add('active');
  document.body.classList.add('nav-active');
});

closeButton?.addEventListener('click', function () {
  nav?.classList.remove('active');
  document.body.classList.remove('nav-active');
});
