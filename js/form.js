// модуль, который работает с формой объявления.
'use strict';
(function () {
  // // 2. Заполнение информации
  // /* Валидация для заголовка*/
  window.utils.setCoordinates(false);


  var MIN_NAME_LENGTH = 30;
  var MAX_NAME_LENGTH = 100;

  var adFormTitle = window.elements.adForm.querySelector('#title');
  adFormTitle.setAttribute('required', 'required');

  adFormTitle.addEventListener('input', function (evt) {
    var valueLength = evt.target.value.length;
    if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Обязательное поле');
    } else if (valueLength < MIN_NAME_LENGTH) {
      evt.target.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      evt.target.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      evt.target.setCustomValidity('');
    }
    evt.target.reportValidity();
  });

  var typeOfHouse = 'flat';

  var priceOfType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  // Валидация для цены
  var adFormPrice = window.elements.adForm.querySelector('#price');
  adFormPrice.setAttribute('required', 'required');
  adFormPrice.placeholder = priceOfType[typeOfHouse];
  function priceValidation(target) {
    var value = target.value;
    if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное поле');
    } else if (value < priceOfType[typeOfHouse]) {
      target.setCustomValidity('Минимальная цена ' + priceOfType[typeOfHouse]);
    } else if (value > 1000000) {
      target.setCustomValidity('Максимальная цена  1 000 000');
    } else {
      target.setCustomValidity('');
    }
    target.reportValidity();
  }

  adFormPrice.addEventListener('input', function (evt) {
    priceValidation(evt.target);
  });

  var adFormHouse = window.elements.adForm.querySelector('#type');
  adFormHouse.addEventListener('change', function (evt) {
    typeOfHouse = evt.target.value;
    adFormPrice.placeholder = priceOfType[evt.target.value];
    priceValidation(adFormPrice);
  });

  //  Выбор кол-ва комнат и гостей
  var guestCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var typeOfRoom = '1';

  var guestValidation = {
    '1': 'Только на одного гостя',
    '2': 'Только на одного или двух гостей',
    '3': 'Только на одного, двух или трех гостей',
    '100': 'Только не для гостей'
  };

  function typeOfCapacity(target) {
    var value = target.value;
    var isValid = guestCapacity[typeOfRoom].some(function (element) {
      return element === value;
    });
    if (!isValid) {
      target.setCustomValidity(guestValidation[typeOfRoom]);
    } else {
      target.setCustomValidity('');
    }
    target.reportValidity();
  }

  var adFormRoom = window.elements.adForm.querySelector('#room_number');
  var adFormCapacity = window.elements.adForm.querySelector('#capacity');
  adFormRoom.addEventListener('change', function (evt) {
    typeOfRoom = evt.target.value;
    typeOfCapacity(adFormCapacity);
  });

  adFormCapacity.addEventListener('change', function (evt) {
    typeOfCapacity(evt.target);
  });

  //  Время заезда и выезда
  var adFormTime = window.elements.adForm.querySelector('#timein');
  var adFormTimeOut = window.elements.adForm.querySelector('#timeout');
  adFormTime.addEventListener('change', function (evt) {
    adFormTimeOut.value = evt.target.value;
  });

  adFormTimeOut.addEventListener('change', function (evt) {
    adFormTime.value = evt.target.value;
  });

  // Фотография пользователя и Фотография жилья
  var adFormAvatar = window.elements.adForm.querySelector('#avatar');
  var adFormPhoto = window.elements.adForm.querySelector('#images');
  adFormAvatar.setAttribute('accept', 'image/*');
  adFormPhoto.setAttribute('accept', 'image/*');

  // Удаляет данные
  function deleteData() {
    window.main.disableSite();
    window.pin.removePins();
    window.pin.clearMapPinMain();
    window.utils.setCoordinates(false);
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();
    window.elements.adForm.reset();
    deleteData();
    window.card.remove();
  }

  function onFormSubmit(evt) {
    window.backend.send(new FormData(window.elements.adForm), window.message.success, window.message.error);
    evt.preventDefault();
    window.elements.adForm.reset();
    deleteData();
    window.card.remove();
  }

  window.elements.adForm.addEventListener('submit', onFormSubmit);
  window.elements.adFormReset.addEventListener('click', onResetButtonClick);
})();
