/* eslint-disable func-call-spacing */
/* eslint-disable no-undef */
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
var offersPrice = [0, 1000, 5000, 10000]; //10, 300, 1000];
var offersRooms = [1, 2, 3, 4, 5];
var offersGuests = [1, 2, 3, 4, 5];
var offersFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offersDescription = ['Большая комната', 'Маленькая комната'];

var OFFSET_X = 25;
var OFFSET_Y = 70;

var mapPinsBlock = document.querySelector('.map__pins');
var mapPinsWidth = mapPinsBlock.offsetWidth;

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
      'x': getRandomIntInclusive(0 + OFFSET_X, mapPinsWidth - OFFSET_X),
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

// var mapCard = document.querySelector('#card');

// var featuresListElement = function (featuresArray, featuresList) {
//   var elements = featuresList.querySelectorAll('li');
//   for (var i = 0; i < featuresArray.length; i++) {
//     elements[i].textContent = featuresArray[i];

//   }
// };

// var photosCopy = function (photosArray, photosBlock) {
//   var photoElemnet = photosBlock.querySelector('img');
//   if (photosArray.length === 1) {
//     photoElemnet.src = photosArray[0];
//   } else {
//     var photoElementCopy;
//     for (var i = 0; i < photosArray.length - 1; i++) {
//       photoElementCopy = photoElemnet.cloneNode(true);
//       photoElementCopy.src = photosArray[i];
//       photosBlock.appendChild(photoElementCopy);
//     }
//     photoElemnet.src = photosArray[photosArray.length - 1];
//   }
// };

var createCard = function (offerObject) {
  var cardCopy = mapCard.content.cloneNode(true);

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

  title.textContent = offerObject.offer.title;
  address.textContent = offerObject.offer.address;
  price.textContent = offerObject.offer.price + '₽/ночь';
  type.textContent = offerObject.offer.type;
  capacity.textContent = offerObject.offer.rooms + ' комнаты для ' + offerObject.offer.guests + ' гостей';
  time.textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
  description.textContent = offerObject.offer.description;
  avatar.src = offerObject.author.avatar;

  featuresListElement(offerObject.offer.features, featuresList);
  photosCopy(offerObject.offer.photos, photos);

  return cardCopy;
};

var firstElementCard = createCard(createdOffers[0]);
var mapFiltersContainer = map.querySelector('.map__filters-container');
map.insertBefore(firstElementCard, mapFiltersContainer);

// 1. Состояния страницы
var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var mapFilter = mapPinsBlock.querySelector('.map__filters');
var mapPinMain = mapPinsBlock.querySelector('.map__pin--main');
var formReset = adForm.querySelector('.ad-form__reset'); //сбрасывает страницу в исходное неактивное состояние без перезагрузки

// Блокирует форму
// var setDisabled = document.querySelector('fieldset');
// setDisabled.setAttribute('disabled', 'disabled');

var setDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setDisabled = arr[i].setDisabled;
  }
  setDisabled(adFormElements);
};

// Активное состояние страницы
var activationPage = function () {
  removeClass(map, 'map--faded');
  removeClass(adForm, 'ad-form--disabled');
  createOfferElement();
  mapFilter();
  setDisabled(adFormElements);
  // offersAddress(mapPinMain)
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    activationPage();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activationPage();
  }
});

// Удаляем метки
var removePins = function () {
  var mapPins = mapPinsBlock.querySelectorAll('.map__pin');
  for (var i = 0; i < mapPins.length; i++) {
    if (mapPins[i].classList.contains('map__pin--main')) {
      mapPins[i].remove();
    }
  }
};

// неактивное состояние
var deactivationPage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  adForm.reset();
  setDisabled(adFormElements);
  removePins();
  // offersAddress(mapPinMain)
};

formReset.addEventListener('click', function (evt) {
  evt.preventDefault();
  deactivationPage();
});

// 2. Заполнение информации

/* Валидация для заголовка*/

var MIN_NAME_LENGTH = 30;
var MAX_NAME_LENGTH = 100;


var title = cardCopy.querySelector('.popup__title');

title.addEventListener('invalid', function (evt) {
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
});

title.addEventListener('input', function (evt) {
  evt.target.reportValidity();
});

// Меняет минимальную цену в зависимости от типа жилья
// Цена за ночь:
// Обязательное поле;
// Числовое поле;
// Максимальное значение — 1 000 000.

var type = cardCopy.querySelector('.popup__type');
offersTypes offersPrice
var priceOfType = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

//min и max зн-е price

// Валидация для цены
var price = cardCopy.querySelector('.popup__text--price');

price.addEventListener('invalid', function (evt) {
  var priceOfType = evt.target.value.length;
  if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Обязательное поле');
  } else if () {
    price.setCustomValidity('Минимальная цена ' + price.min);
  } else if () {
    price.setCustomValidity('Максимальная цена ' + price.max);
  } else {
    price.setCustomValidity('');
  };


// Отправка формы
var adForm = document.querySelector('.ad-form__submit');
adForm.action = 'https://javascript.pages.academy/code-and-magick';
