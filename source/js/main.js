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

/*================ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА==========================================*/

const body = document.querySelector('.page-body');
const buttonOrder = document.querySelector('.page-header__button');
const overlayPopup = document.querySelector('.modal');
const popupOrderCall = document.querySelector('.modal__inner');
const buttonClose = document.querySelector('.modal__close');

const openPopup = () => {
  popupOrderCall.classList.add('modal__show');
  overlayPopup.classList.add('modal__show');
  body.classList.add('page-body--no-scroll');
};

const closePopup = () => {
  if (overlayPopup.classList.contains('modal__show')) {
    popupOrderCall.classList.remove('modal__show');
    overlayPopup.classList.remove('modal__show');
    body.classList.remove('page-body--no-scroll');
  }
};

const onDocumentEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }
};

const onClickOverlayPopup = (evt) => {
  if (evt.target.matches('section')) {
    closePopup();
  }
};

const onClickButtonClose = () => {
  closePopup();
};

const onClickButtonOrder = (evt) => {
  evt.preventDefault();
  openPopup();
  document.addEventListener('keydown', onDocumentEscKeydown);
};

overlayPopup.addEventListener('click', onClickOverlayPopup);
buttonOrder.addEventListener('click', onClickButtonOrder);
buttonClose.addEventListener('click', onClickButtonClose);
