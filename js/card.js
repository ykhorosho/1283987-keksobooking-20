// модуль, который отвечает за создание карточки объявлений;
'use strict';
(function () {
  var mapCard = document.querySelector('#card');

  var featuresListElement = function (featuresArray, featuresList) {
    var elements = featuresList.querySelectorAll('li');
    for (var k = 0; k < elements.length; k++) {
      elements[k].textContent = '';
    }
    for (var i = 0; i < featuresArray.length; i++) {
      elements[i].textContent = featuresArray[i];

    }
  };

  var photosCopy = function (photosArray, photosBlock) {
    var photoElemnet = photosBlock.querySelector('img');
    var removeChild = true;
    while (removeChild) {
      if (photosBlock.firstElementChild !== photosBlock.lastElementChild) {
        photosBlock.removeChild(photosBlock.lastElementChild);
      } else {
        removeChild = false;
      }
    }
    if (photosArray.length === 1) {
      photoElemnet.src = photosArray[0];
    } else {
      var photoElementCopy;
      for (var i = 0; i < photosArray.length - 1; i++) {
        photoElementCopy = photoElemnet.cloneNode(true);
        photoElementCopy.src = photosArray[i];
        photosBlock.appendChild(photoElementCopy);
      }
      photoElemnet.src = photosArray[photosArray.length - 1];
    }
  };

  var fillCard = function (offerObject, cardCopy) {

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
  };

  var createCard = function (id) {
    var cardCopy = mapCard.content.cloneNode(true);
    fillCard(window.createdOffers[id], cardCopy);
    window.elements.map.insertBefore(cardCopy, window.elements.mapFiltersContainer);
  };

  window.elements.mapPinsBlock.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
      cardCheck(evt.target.dataset.id);
    } else if (evt.target.parentElement.classList.contains('map__pin') && !evt.target.parentElement.classList.contains('map__pin--main')) {
      cardCheck(evt.target.parentElement.dataset.id);
    }
  });

  window.elements.mapPinsBlock.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
        cardCheck(evt.target.dataset.id);
      } else if (evt.target.parentElement.classList.contains('map__pin') && !evt.target.parentElement.classList.contains('map__pin--main')) {
        cardCheck(evt.target.parentElement.dataset.id);
      }
    }
  });


  function cardCheck(id) {
    var cardElement = window.elements.map.querySelector('.map__card');
    if (cardElement) {
      fillCard(window.createdOffers[id], cardElement);
    } else {
      createCard(id);
    }
    cardListners();
  }

  // Закрытие карточки
  var cardListners = function () {
    var cardElement = window.elements.map.querySelector('.map__card');
    var cardIcon = cardElement.querySelector('.popup__close');
    cardElement.tabIndex = 0;
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        cardRemove();
      }
    });
    cardIcon.addEventListener('click', function () {
      cardRemove();
    });
  };

  //
  function cardRemove(){
    var cardElement = window.elements.map.querySelector('.map__card');
    if (cardElement) {
      cardElement.remove();
    }
  };

  window.card = {
    remove: cardRemove,
  };
})();
