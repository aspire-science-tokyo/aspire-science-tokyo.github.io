/* The site's only script: open/close the mobile navigation menu. */
(function () {
  var button = document.querySelector('.menu-button');
  var menu = document.querySelector('.mobile-menu');
  if (!button || !menu) return;
  var links = menu.querySelectorAll('a');

  function setOpen(open) {
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.classList.toggle('is-open', open);
    menu.querySelector('nav').setAttribute('aria-hidden', open ? 'false' : 'true');
    links.forEach(function (a) {
      if (open) a.removeAttribute('tabindex');
      else a.setAttribute('tabindex', '-1');
    });
  }

  button.addEventListener('click', function () {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });
  links.forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();
