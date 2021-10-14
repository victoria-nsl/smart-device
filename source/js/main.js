//Плавный скролл

const anchorLink = document.querySelector('.promo__link');

anchorLink.addEventListener('click', (evt) => {
  evt.preventDefault();

  const blockId = anchorLink.getAttribute('href').substring(1);

  document.getElementById(blockId).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});
