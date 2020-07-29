'use strict';
(function () {
  // 1. Состояния страницы
  var adFormElements = window.elements.adForm.querySelectorAll('.ad-form__element');
  var mapFilters = window.elements.mapFiltersContainer.querySelectorAll('.map__filter');

  // Блокирует форму
  function setDisabled(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', 'disabled');
    }
  }

  function disableForm() {
    setDisabled(mapFilters);
    setDisabled(adFormElements);
    window.elements.mapPinMain.addEventListener('click', mapPinMainClick); // фун-я обратного вызова (коллбэк)
  }

  // Активное состояние страницы
  function setEnabled(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled');
    }
  }

  function mapPinMainClick(evt) {
    if (evt.button === 0 || evt.key === window.data.ENTER_KEY) {
      evt.preventDefault();
      activationPage();
    }
  }

  function activationPage() {
    window.elements.map.classList.remove('map--faded');
    window.elements.adForm.classList.remove('ad-form--disabled');
    window.backend.load(createOffersElements, alert);
    setEnabled(mapFilters);
    setEnabled(adFormElements);
    window.elements.mapPinMain.removeEventListener('click', mapPinMainClick);
    window.utils.setCoordinates(true);
  }

  function disableSite() {
    window.elements.map.classList.add('map--faded');
    window.elements.adForm.classList.add('ad-form--disabled');
    disableForm();
  }

  function createOffersElements(pins) {
    window.pin.loadOfferElements(window.filter.getData(pins));
  }

  disableForm();

  window.main = {
    disableSite: disableSite,
  };
})();
