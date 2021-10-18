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

const hideContent = (item) => {
  item.classList.remove('accordion__item--active');
  item.classList.add('accordion__item--closed');
};

const showContent = (item) => {
  item.classList.add('accordion__item--active');
  item.classList.remove('accordion__item--closed');
};

triggers.forEach((trigger, index) => {
  trigger.addEventListener('click', () => {
    const itemAccordionCurrent = itemsAccordion[index];

    if (itemAccordionCurrent.classList.contains('accordion__item--active')) {
      hideContent(itemAccordionCurrent);
      return;
    }
    itemsAccordion.forEach ((itemAccordion) => {
      if (itemAccordion.classList.contains('accordion__item--active')) {
        hideContent(itemAccordion);
      }
    });
    showContent(itemAccordionCurrent);
  });
});
