document.addEventListener('DOMContentLoaded', () => {
  const emptyAnchors = Array.from(document.querySelectorAll('a[href="#"]'));
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const contactForm = document.querySelector('form#contactFormReservation');

  const getPathname = (location) => {
    const { pathname, protocol } = location;
    let paths, pageName, path, len, route, isHTTP;
    isHTTP = protocol === 'http:' || protocol === 'https:';
    paths = pathname.split('/');
    len = paths.length;
    pageName = paths[len - 1];
    path = pageName.split('.')[0];
    if (isHTTP) {
      if (pathname === '/') {
        route = 'index';
      } else {
        route = path.startsWith('/') ? path.slice(1) : path;
      }
    } else {
      route = path;
    }
    return route;
  };

  const linkMap = {
    index: 'index',
    aboutus: 'aboutus',
    process: 'process',
    menu: 'menu',
    gallery: 'gallery',
    contact: 'contact',
  };

  const path = getPathname(window.location);
  const linkActive = linkMap[path];

  if (emptyAnchors.length > 0) {
    emptyAnchors.forEach((anchor) => {
      anchor.addEventListener('click', (e) => e.preventDefault());
    });
  }

  navLinks.forEach((link) => {
    const { id } = link;
    if (id === linkActive) {
      link.classList.add('link-active');
    } else {
      link.classList.remove('link-active');
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const btn = document.querySelector('#btnReservation');
      e.preventDefault();
      btn.innerText = 'reservando...';
      setTimeout(() => {
        btn.innerText = 'reservado';
        btn.setAttribute('disabled', 'true');
        contactForm.reset();
      }, 2000);
    });
  }
});
