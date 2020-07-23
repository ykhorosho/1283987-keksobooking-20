// модуль, который отвечает за создание метки на карте;
'use strict';
(function () {
  window.createOfferElement = function (offerObject, pinElement, index) {
    var mapPinElement = pinElement.content.cloneNode(true);
    var mapPinButton = mapPinElement.querySelector('.map__pin');
    mapPinButton.style.cssText = 'left: ' + (offerObject.location.x - window.data.OFFSET_X) + 'px; top: ' + (offerObject.location.y - window.data.OFFSET_Y) + 'px;';
    var mapPinImage = mapPinButton.querySelector('img');
    mapPinImage.src = offerObject.author.avatar;
    mapPinImage.alt = offerObject.offer.title;
    mapPinButton.dataset.id = index;
    return mapPinElement;
  };

  window.loadOfferElements = function (offers) {
    window.appendOfferElements(window.createOfferElement, offers, window.elements.mapPinsBlock, window.elements.mapPin);
  };

  window.appendOfferElements = function (createOfferElementFunction, offers, mapPinsElement, mapPinElement) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var currentOffer = createOfferElementFunction(offers[i], mapPinElement, i);
      fragment.appendChild(currentOffer);
    }
    mapPinsElement.appendChild(fragment);
  };
})();
