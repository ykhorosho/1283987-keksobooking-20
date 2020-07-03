'use strict';
(function () {})();

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

// 1. Состояния страницы
var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var mapFilters = mapFiltersContainer.querySelectorAll('.map__filter');
var mapPinMain = mapPinsBlock.querySelector('.map__pin--main');

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
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  appendOfferElements(createOfferElement, createdOffers, mapPinsBlock, mapPin);
  setEnabled(mapFilters);
  setEnabled(adFormElements);
  mapPinMain.removeEventListener('click', mapPinMainClick);
  setCoordinates(true);
}

mapPinMain.addEventListener('click', mapPinMainClick); // фун-я обратного вызова (коллбэк)

// // 2. Заполнение информации

// /* Валидация для заголовка*/
var MAIN_ARROW_HEIGHT = 16;

var inputAddress = adForm.querySelector('#address');

function setCoordinates(isPageActive) {
  var distanceLeft = mapPinMain.offsetLeft;
  var distanseTop = mapPinMain.offsetTop;
  var height = mapPinMain.clientWidth;
  var width = mapPinMain.clientHeight;
  var X = Math.round(distanceLeft + width / 2);
  var Y = isPageActive ? Math.round(distanseTop + height + MAIN_ARROW_HEIGHT) : Math.round(distanseTop + height / 2);
  inputAddress.value = X + ', ' + Y;
}
setCoordinates(false);


var MIN_NAME_LENGTH = 30;
var MAX_NAME_LENGTH = 100;

var adFormTitle = adForm.querySelector('#title');
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
var adFormPrice = adForm.querySelector('#price');
adFormPrice.setAttribute('required', 'required');
adFormPrice.placeholder = priceOfType[typeOfHouse];
var priceValidation = function (target) {
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
};
adFormPrice.addEventListener('input', function (evt) {
  priceValidation(evt.target);
});

var adFormHouse = adForm.querySelector('#type');
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

var typeOfCapacity = function (target) {
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
};

var adFormRoom = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
adFormRoom.addEventListener('change', function (evt) {
  typeOfRoom = evt.target.value;
  typeOfCapacity(adFormCapacity);
});

adFormCapacity.addEventListener('change', function (evt) {
  typeOfCapacity(evt.target);

});
