(() => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const callButton = document.querySelector('[data-call-button]');

  if (!header || !menuToggle || !nav || !callButton) {
    return;
  }

  let previousScroll = window.scrollY;

  const closeMenu = () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  callButton.addEventListener('click', () => {
    window.location.href = 'tel:+15035550184';
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const scrollingDown = currentScroll > previousScroll;

    if (currentScroll > 80 && scrollingDown) {
      header.classList.add('is-hidden');
      closeMenu();
    } else if (!scrollingDown) {
      header.classList.remove('is-hidden');
    }

    previousScroll = currentScroll;
  }, { passive: true });
})();
