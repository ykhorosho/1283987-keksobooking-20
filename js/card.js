// модуль, который отвечает за создание карточки объявлений;
'use strict';
(function () {
  var mapCard = document.querySelector('#card');

  function featuresListElement(featuresArray, featuresList) {
    if (featuresArray.length === 0) {
      featuresList.remove();
      return;
    }
    for (var i = 0; i < featuresList.children.length; i++) {
      var hasFeature = false;
      for (var k = 0; k < featuresArray.length; k++) {
        if (featuresList.children[i].classList.contains('popup__feature--' + featuresArray[k])) {
          hasFeature = true;
          break;
        }
      }
      if (!hasFeature) {
        featuresList.children[i].remove();
        i--;
      }
    }
  }

  function photosCopy(photosArray, photosBlock) {
    if (photosArray.length === 0) {
      photosBlock.remove();
      return;
    }
    var photoElemnet = photosBlock.querySelector('img');
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
  }

  function fillCard(offerObject, cardCopy) {

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

    window.utils.checkContent(title, offerObject.offer.title, offerObject.offer.title);
    window.utils.checkContent(address, offerObject.offer.address, offerObject.offer.address);
    window.utils.checkContent(price, offerObject.offer.price, offerObject.offer.price + '₽/ночь');
    window.utils.checkContent(type, offerObject.offer.type, offerObject.offer.type);
    window.utils.checkMultiContent(capacity, [offerObject.offer.rooms, offerObject.offer.guests], offerObject.offer.rooms + ' комнаты для ' + offerObject.offer.guests + ' гостей');
    window.utils.checkMultiContent(time, [offerObject.offer.checkin, offerObject.offer.checkout], 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout);
    window.utils.checkContent(description, offerObject.offer.description, offerObject.offer.description);

    featuresListElement(offerObject.offer.features, featuresList);
    photosCopy(offerObject.offer.photos, photos);
    if (offerObject.author.avatar) {
      avatar.src = offerObject.author.avatar;
    } else {
      avatar.remove();
    }
  }

  function createCard(id) {
    var cardCopy = mapCard.content.cloneNode(true);
    fillCard(window.filteredOffers[id], cardCopy);
    window.elements.map.insertBefore(cardCopy, window.elements.mapFiltersContainer);
  }

  window.elements.mapPinsBlock.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
      cardCheck(evt.target.dataset.id, evt.target);
    } else if (evt.target.parentElement.classList.contains('map__pin') && !evt.target.parentElement.classList.contains('map__pin--main')) {
      cardCheck(evt.target.parentElement.dataset.id, evt.target.parentElement);
    }
  });

  window.elements.mapPinsBlock.addEventListener('keydown', function (evt) {
    if (evt.key === window.data.ENTER_KEY) {
      if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
        cardCheck(evt.target.dataset.id, evt.target);
      } else if (evt.target.parentElement.classList.contains('map__pin') && !evt.target.parentElement.classList.contains('map__pin--main')) {
        cardCheck(evt.target.parentElement.dataset.id, evt.target.parentElement);
      }
    }
  });


  function cardCheck(id, element) {
    var cardElement = window.elements.map.querySelector('.map__card');
    var activePin = window.elements.map.querySelector('.map__pin--active');
    if (cardElement) {
      cardElement.remove();
    }
    createCard(id);
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    element.classList.add('map__pin--active');
    cardListners();
  }

  // Закрытие карточки
  function cardListners() {
    var cardElement = window.elements.map.querySelector('.map__card');
    var cardIcon = cardElement.querySelector('.popup__close');
    cardElement.tabIndex = 0;
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.data.ESC_KEY) {
        cardRemove();
      }
    });
    cardIcon.addEventListener('click', function () {
      cardRemove();
    });
  }

  function cardRemove() {
    var cardElement = window.elements.map.querySelector('.map__card');
    var activePin = window.elements.map.querySelector('.map__pin--active');
    if (cardElement) {
      cardElement.remove();
    }
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  }

  window.card = {
    remove: cardRemove,
  };
})();
