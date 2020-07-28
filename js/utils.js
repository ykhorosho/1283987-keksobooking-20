// фун-и
'use strict';
(function () {
  var inputAddress = window.elements.adForm.querySelector('#address');
  inputAddress.setAttribute('readonly', 'readonly');

  function setCoordinates(isPageActive) {
    var distanceLeft = window.elements.mapPinMain.offsetLeft;
    var distanseTop = window.elements.mapPinMain.offsetTop;
    var height = window.elements.mapPinMain.clientWidth;
    var width = window.elements.mapPinMain.clientHeight;
    var X = Math.round(distanceLeft + width / 2);
    var Y = isPageActive ? Math.round(distanseTop + height + window.data.MAIN_ARROW_HEIGHT) : Math.round(distanseTop + height / 2);
    inputAddress.value = X + ', ' + Y;
  };

  function getAmountOfPins(pins, MAX_PINS) {
    var sortPins = pins.slice(0, MAX_PINS);
    window.filteredOffers = sortPins;
    return sortPins;
  }

  window.utils = {
    setCoordinates: setCoordinates,
    getAmountOfPins: getAmountOfPins,
  };
})();
