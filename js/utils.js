// фун-и
'use strict';
(function () {
  window.utils = {};
  window.utils.getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  window.utils.getRandomIntInclusive = function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var inputAddress = window.elements.adForm.querySelector('#address');

  window.utils.setCoordinates = function setCoordinates(isPageActive) {
    var distanceLeft = window.elements.mapPinMain.offsetLeft;
    var distanseTop = window.elements.mapPinMain.offsetTop;
    var height = window.elements.mapPinMain.clientWidth;
    var width = window.elements.mapPinMain.clientHeight;
    var X = Math.round(distanceLeft + width / 2);
    var Y = isPageActive ? Math.round(distanseTop + height + window.data.MAIN_ARROW_HEIGHT) : Math.round(distanseTop + height / 2);
    inputAddress.value = X + ', ' + Y;
  };
})();
