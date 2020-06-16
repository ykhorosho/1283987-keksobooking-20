'use strict';

var OFFERS_COUNT = 8;
var offersTypes = ['palace', 'flat', 'house', 'bungalo'];
var offersChekins = ['12:00', '13:00', '14:00'];
var offersCheckout = ['12:00', '13:00', '14:00'];
var offersPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var offersTitles = ['Предложение отличное', 'Плохое предложение'];
var offersAddress = ['600, 350', '500, 250', '400, 150'];
var offersPrice = [10, 300, 1000];
var offersRooms = [1, 2, 3, 4, 5];
var offersGuests = [1, 2, 3, 4, 5];
var offersFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offersDescription = ['Большая комната', 'Маленькая комната'];

var OFFSET_X = 25;
var OFFSET_Y = 70;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var createOffer = function (objectCount) {
  var featuresArrayLength = getRandomIntInclusive(1, offersFeatures.length);
  var featuresArray = [];
  for (var i = 0; i < featuresArrayLength; i++) {
    featuresArray.push(offersFeatures[i]);
  }
  var photosArrayLength = getRandomIntInclusive(1, offersPhotos.length);
  var photosArray = [];
  for (var k = 0; k < photosArrayLength; k++) {
    photosArray.push(offersPhotos[k]);
  }
  return {
    'author': {
      'avatar': 'img/avatars/user0' + ++objectCount + '.png',
    },
    'offer': {
      'title': offersTitles[getRandomInt(offersTitles.length)],
      'address': offersAddress[getRandomInt(offersAddress.length)],
      'price': offersPrice[getRandomInt(offersPrice.length)],
      'type': offersTypes[getRandomInt(offersTypes.length)],
      'rooms': offersRooms[getRandomInt(offersRooms.length)],
      'guests': offersGuests[getRandomInt(offersGuests.length)],
      'checkin': offersChekins[getRandomInt(offersChekins.length)],
      'checkout': offersCheckout[getRandomInt(offersCheckout.length)],
      'features': featuresArray,
      'description': offersDescription[getRandomInt(offersDescription.length)],
      'photos': photosArray
    },
    'location': {
      'x': getRandomIntInclusive(50, 930),
      'y': getRandomIntInclusive(130, 630)
    }
  };
};

var createOffers = function () {
  var offers = [];
  for (var i = 0; i < OFFERS_COUNT; i++) {
    offers.push(createOffer(i));
  }
  return offers;
};

var createdOffers = createOffers();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinsBlock = document.querySelector('.map__pins');

var mapPin = document.querySelector('#pin');

var createOfferElement = function (offerObject, pinElement) {
  var mapPinElement = pinElement.content.cloneNode(true);
  var mapPinButton = mapPinElement.querySelector('.map__pin');
  mapPinButton.style.cssText = 'left: ' + (offerObject.location.x - OFFSET_X) + 'px; top: ' + (offerObject.location.y - OFFSET_Y) + 'px;';
  var mapPinImage = mapPinButton.querySelector('img');
  mapPinImage.src = offerObject.author.avatar;
  mapPinImage.alt = offerObject.offer.title;
  return mapPinElement;
};


var appendOfferElements = function (createOfferElementFunction, offers, mapPinsElement, mapPinElement) {

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    var currentOffer = createOfferElementFunction(offers[i], mapPinElement);
    fragment.appendChild(currentOffer);
  }
  mapPinsElement.appendChild(fragment);
};

appendOfferElements(createOfferElement, createdOffers, mapPinsBlock, mapPin);

// card
var card = document.querySelector('#card');
var mapCard = document.querySelector('.map__card');

var typeToHouse = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

/* Возвращает список фото жилья*/
var getFillPhoto = function (photoObject, block) {
  var photoFragment = document.createDocumentFragment();

  for (var i = 0; i < photoObject.length; i++) {
    var photoImg = document.createElement('img');
    photoImg.src = photoObject[i];
    photoImg.width = 45;
    photoImg.alt = 'Фотография жилья';
    photoImg.classList.add('popup__photo');

    photoFragment.appendChild(photoImg);
  }

  block.appendChild(fragment);
};

var getFillCard = function (objectCount) {
  var cardCopy = mapCard.cloneNode(true);

  var title = cardCopy.querySelector('.popup__title');
  var address = cardCopy.querySelector('.popup__text--address');
  var price = cardCopy.querySelector('.popup__text--price');
  var type = cardCopy.querySelector('.popup__type');
  var capacity = cardCopy.querySelector('.popup__text--capacity');
  var time = cardCopy.querySelector('.popup__text--time');
  var featuresList = cardCopy.querySelector('.popup__features');
  var description = cardCopy.querySelector('.popup__description');
  var photos = cardCopy.querySelector('.popup__photos');
  var avatar = cardCopy.querySelector('.popup__avatar');

  title.textContent = objectCount.offer.title;
  address.textContent = objectCount.offer.address;
  price.textContent = objectCount.offer.price + '₽/ночь';
  type.textContent = typeToHouse[objectCount.offer.type];
  capacity.textContent = objectCount.offer.rooms + ' комнаты для ' + objectCount.offer.guests + ' гостей';
  time.textContent = 'Заезд после ' + objectCount.offer.checkin + ', выезд до ' + objectCount.offer.checkout;
  featuresList.src = objectCount.offer.features;
  description.textContent = objectCount.offer.description;
  getFillPhoto.src = objectCount.offer.photos;
  avatar.src = objectCount.author.avatar;

  return cardCopy;
};
