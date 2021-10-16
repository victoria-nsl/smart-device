/*================ПЛАВНЫЙ СКРОЛЛ=============================*/

const anchorLink = document.querySelector('.promo__link');

anchorLink.addEventListener('click', (evt) => {
  evt.preventDefault();

  const blockId = anchorLink.getAttribute('href').substring(1);

  document.getElementById(blockId).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

/*================АККОРДЕОН==========================================*/
const triggers = document.querySelectorAll('.accordion__item h2');
const itemsAccordion = document.querySelectorAll('.accordion__item');

itemsAccordion.forEach ((itemAccordion) => {
  itemAccordion.classList.remove('accordion__item--nojs');
});


triggers.forEach((trigger, index) => {
  trigger.addEventListener('click', () => {
    const itemAccordionCurrent = itemsAccordion[index];

    if (itemAccordionCurrent.classList.contains('accordion__item--active')) {
      itemAccordionCurrent.classList.remove('accordion__item--active');
      itemAccordionCurrent.classList.add('accordion__item--closed');
      return;
    }
    itemsAccordion.forEach ((itemAccordion) => {
      itemAccordion.classList.remove('accordion__item--active');
      itemAccordion.classList.add('accordion__item--closed');
      itemAccordionCurrent.classList.add('accordion__item--active');
    });
  });
});
