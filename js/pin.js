// модуль, который отвечает за создание метки на карте;
'use strict';
(function () {
  var MainPinCenter = {
    top: '375px',
    left: '570px'
  };

  function createOfferElement(offerObject, pinElement, index) {
    var mapPinElement = pinElement.content.cloneNode(true);
    var mapPinButton = mapPinElement.querySelector('.map__pin');
    mapPinButton.style.cssText = 'left: ' + (offerObject.location.x - window.data.OFFSET_X) + 'px; top: ' + (offerObject.location.y - window.data.OFFSET_Y) + 'px;';
    var mapPinImage = mapPinButton.querySelector('img');
    mapPinImage.src = offerObject.author.avatar;
    mapPinImage.alt = offerObject.offer.title;
    mapPinButton.dataset.id = index;
    return mapPinElement;
  }

  function loadOfferElements(offers) {
    appendOfferElements(createOfferElement, offers, window.elements.mapPinsBlock, window.elements.mapPin);
  }

  function appendOfferElements(createOfferElementFunction, offers, mapPinsElement, mapPinElement) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var currentOffer = createOfferElementFunction(offers[i], mapPinElement, i);
      fragment.appendChild(currentOffer);
    }
    mapPinsElement.appendChild(fragment);
  }

  function removePins() {
    var pins = window.elements.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  function clearMapPinMain() {
    window.elements.mapPinMain.style.top = MainPinCenter.top;
    window.elements.mapPinMain.style.left = MainPinCenter.left;
  }

  window.pin = {
    removePins: removePins,
    clearMapPinMain: clearMapPinMain,
    loadOfferElements: loadOfferElements,
  };
})();
