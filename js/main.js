'use strict';
(function () {
  // 1. Состояния страницы
  var adFormElements = window.elements.adForm.querySelectorAll('.ad-form__element');
  var mapFilters = window.elements.mapFiltersContainer.querySelectorAll('.map__filter');

  // Блокирует форму
  var setDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', 'disabled');
    }
  };
  setDisabled(mapFilters);
  setDisabled(adFormElements);

  // Активное состояние страницы
  var setEnabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled');
    }
  };

  function mapPinMainClick(evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      evt.preventDefault();
      activationPage();
    }
  }

  function activationPage() {
    window.elements.map.classList.remove('map--faded');
    window.elements.adForm.classList.remove('ad-form--disabled');
    window.backend.load(window.loadOfferElements, alert);
    setEnabled(mapFilters);
    setEnabled(adFormElements);
    window.elements.mapPinMain.removeEventListener('click', mapPinMainClick);
    window.utils.setCoordinates(true);
  }

  window.elements.mapPinMain.addEventListener('click', mapPinMainClick); // фун-я обратного вызова (коллбэк)
})();
