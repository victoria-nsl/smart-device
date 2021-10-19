(function () {
  const REGULAR_EXPRESSION_NAME =/^[A-Za-zА-Яа-яЁё\s]+$/;
  const MESSAGE_NAME ='Укажите ваше имя. Ввести данные можно на русском языке  и латиницей';
  const MASKED = '+7 (___) ___-__-__';

  const anchorLink = document.querySelector('.promo__link');

  const itemsAccordion = document.querySelectorAll('.accordion__item');
  const triggers = document.querySelectorAll('.accordion__item h2');

  const body = document.querySelector('.page-body');
  const buttonOrder = document.querySelector('.page-header__button');
  const overlayPopup = document.querySelector('.modal');
  const popupOrderCall = overlayPopup.querySelector('.modal__inner');
  const buttonClose = overlayPopup.querySelector('.modal__close');
  const inputNameModal = overlayPopup.querySelector('#customer-name');

  const forms =document.querySelectorAll('.form');
  const userInputsName =document.querySelectorAll('.form__item--name input');
  const userInputsTel =document.querySelectorAll('.form__item--tel input');
  const userInputsMessage =document.querySelectorAll('.form__item--text textarea');
  const userInputsCheckbox =document.querySelectorAll('.form__item--checkbox input');
  const buttonsForm =document.querySelectorAll('.form__button');


  /*================ПЛАВНЫЙ СКРОЛЛ=============================*/
  if (anchorLink) {
    anchorLink.addEventListener('click', (evt) => {
      evt.preventDefault();

      const blockId = anchorLink.getAttribute('href').substring(1);

      document.getElementById(blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  /*================АККОРДЕОН==========================================*/
  if (itemsAccordion) {
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
  }

  /*=======ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА==========================*/
  if (overlayPopup) {
    const openPopup = () => {
      popupOrderCall.classList.add('modal__show');
      overlayPopup.classList.add('modal__show');
      body.classList.add('page-body--no-scroll');
      inputNameModal.focus();
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
  }

  /*======================МАСКА ДЛЯ ТЕЛЕФОНА=======================*/
  if (userInputsTel) {
    const checkMask = (evt) => {

      const keyCode = evt.key;
      const template = MASKED;
      const templateNumbersValue = template.replace(/\D/g, '');
      const inputNumbersValue = evt.target.value.replace(/\D/g, '');

      let i = 0;
      let  newValue = template
        .replace(/[_\d]/g, (a) => i < inputNumbersValue.length ? inputNumbersValue.charAt(i++) ||  templateNumbersValue.charAt(i) : a);

      i = newValue.indexOf('_');

      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }

      let reg = template.substring(0, evt.target.value.length)
        .replace(/_+/g, (a) => `\\d{1,${ a.length}}`)
        .replace(/[+()]/g, '\\$&'); reg = new RegExp(`^${reg}$`);

      if (!reg.test(evt.target.value) || evt.target.value.length < 5 || keyCode > 47 && keyCode < 58) {
        evt.target.value = newValue;
      }

      if (evt.type === 'blur' && evt.target.value.length < 5) {
        evt.target.value = '';
      }
    };

    userInputsTel.forEach((userInputTel) => {
      userInputTel.addEventListener('input', checkMask);
      userInputTel.addEventListener('focus', checkMask);
      userInputTel.addEventListener('blur', checkMask);
    });
  }

  if (forms) {
    /*======ПРОВЕРКА LocalStorage============*/
    let isStorageSupport = true;
    let storageTel = '';
    let storageName = '';
    let storageMessage = '';

    try {
      storageTel = localStorage.getItem('tel');
      storageName = localStorage.getItem('name');
      storageMessage = localStorage.getItem('message');
    } catch (err) {
      isStorageSupport = false;
    }

    userInputsName.forEach((userInputName) => {
      if (storageName) {
        userInputName.value = storageName || '' ;
      }
    });

    userInputsTel.forEach((userInputTel) => {
      if (storageTel) {
        userInputTel.value = storageTel || '';
      }
    });

    userInputsMessage.forEach((userInputMessage) => {
      if (storageMessage) {
        userInputMessage.value = storageMessage || '' ;
      }
    });

    /*================ВАЛИДАЦИЯ==========================================*/
    const checkInput= (inputText, message, regularExpression) => {
      if(!regularExpression.test(inputText.value)) {
        inputText.setCustomValidity(message);
      } else {
        inputText.setCustomValidity('');
      }
      inputText.reportValidity();
    };

    const showError = (inputName, inputTel, inputCheckbox) => {
      if (!inputName.validity.valid) {
        inputName.classList.add('form__error');
      } else {
        inputName.classList.remove('form__error');
        if(isStorageSupport) {
          localStorage.setItem('name', inputName.value);
        }
      }

      if (inputTel.validity.tooShort) {
        inputTel.setCustomValidity('Телефон должен состоять из 10 цифр');
        inputTel.classList.add('form__error');
      } else if (inputTel.validity.valueMissing) {
        inputTel.setCustomValidity('Обязательное поле');
        inputTel.classList.add('form__error');
      } else {
        inputTel.setCustomValidity('');
        inputTel.classList.remove('form__error');
        if(isStorageSupport) {
          localStorage.setItem('tel',  inputTel.value);
        }
      }

      if (!inputCheckbox.checked) {
        inputCheckbox.classList.add('form__error');
        inputCheckbox.setCustomValidity('Обязательное поле. Требуется согласие на обработку персональных данных');
      } else {
        inputCheckbox.classList.remove('form__error');
        inputCheckbox.setCustomValidity('');
      }
    };

    userInputsName.forEach(( userInputName) => {
      userInputName.addEventListener('input',(evt) => {
        checkInput(evt.target, MESSAGE_NAME, REGULAR_EXPRESSION_NAME);
      });
    });

    buttonsForm.forEach((buttonForm, index) => {
      buttonForm.addEventListener('click', ()  => {
        showError(userInputsName[index], userInputsTel[index], userInputsCheckbox[index]);
        if (userInputsMessage[index].value) {
          if(isStorageSupport) {
            localStorage.setItem('message', userInputsMessage[index].value);
          }
        }
      });
    });
  }
})();
