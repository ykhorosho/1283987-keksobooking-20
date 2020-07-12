// модуль, который отвечает за создание метки на карте;
'use strict';
(function () {
  var mapPinsWidth = window.elements.mapPinsBlock.offsetWidth;

  var getRandomInt = window.utils.getRandomInt;
  var getRandomIntInclusive = window.utils.getRandomIntInclusive;


  var createOffer = function (objectCount) {
    var featuresArrayLength = getRandomIntInclusive(1, window.data.offersFeatures.length);
    var featuresArray = [];
    for (var i = 0; i < featuresArrayLength; i++) {
      featuresArray.push(window.data.offersFeatures[i]);
    }
    var photosArrayLength = getRandomIntInclusive(1, window.data.offersPhotos.length);
    var photosArray = [];
    for (var k = 0; k < photosArrayLength; k++) {
      photosArray.push(window.data.offersPhotos[k]);
    }
    return {
      'author': {
        'avatar': 'img/avatars/user0' + ++objectCount + '.png',
      },
      'offer': {
        'title': window.data.offersTitles[getRandomInt(window.data.offersTitles.length)],
        'address': window.data.offersAddress[getRandomInt(window.data.offersAddress.length)],
        'price': window.data.offersPrice[getRandomInt(window.data.offersPrice.length)],
        'type': window.data.offersTypes[getRandomInt(window.data.offersTypes.length)],
        'rooms': window.data.offersRooms[getRandomInt(window.data.offersRooms.length)],
        'guests': window.data.offersGuests[getRandomInt(window.data.offersGuests.length)],
        'checkin': window.data.offersChekins[getRandomInt(window.data.offersChekins.length)],
        'checkout': window.data.offersCheckout[getRandomInt(window.data.offersCheckout.length)],
        'features': featuresArray,
        'description': window.data.offersDescription[getRandomInt(window.data.offersDescription.length)],
        'photos': photosArray
      },
      'location': {
        'x': getRandomIntInclusive(0 + window.data.OFFSET_X, mapPinsWidth - window.data.OFFSET_X),
        'y': getRandomIntInclusive(130, 630)
      }
    };
  };


  var createOffers = function () {
    var offers = [];
    for (var i = 0; i < window.data.OFFERS_COUNT; i++) {
      offers.push(createOffer(i));
    }
    return offers;
  };

  window.createdOffers = createOffers();

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


  window.appendOfferElements = function (createOfferElementFunction, offers, mapPinsElement, mapPinElement) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var currentOffer = createOfferElementFunction(offers[i], mapPinElement, i);
      fragment.appendChild(currentOffer);
    }
    mapPinsElement.appendChild(fragment);
  };
})();
