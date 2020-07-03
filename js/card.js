// модуль, который отвечает за создание карточки объявлений;
'use strict';
(function () {
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

// var createCard = function (offerObject) {
//   var cardCopy = mapCard.content.cloneNode(true);

//   var title = cardCopy.querySelector('.popup__title');
//   var address = cardCopy.querySelector('.popup__text--address');
//   var price = cardCopy.querySelector('.popup__text--price');
//   var type = cardCopy.querySelector('.popup__type');
//   var capacity = cardCopy.querySelector('.popup__text--capacity');
//   var time = cardCopy.querySelector('.popup__text--time');
//   var featuresList = cardCopy.querySelector('.popup__features');
//   var description = cardCopy.querySelector('.popup__description');
//   var photos = cardCopy.querySelector('.popup__photos');
//   var avatar = cardCopy.querySelector('.popup__avatar');

//   title.textContent = offerObject.offer.title;
//   address.textContent = offerObject.offer.address;
//   price.textContent = offerObject.offer.price + '₽/ночь';
//   type.textContent = offerObject.offer.type;
//   capacity.textContent = offerObject.offer.rooms + ' комнаты для ' + offerObject.offer.guests + ' гостей';
//   time.textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
//   description.textContent = offerObject.offer.description;
//   avatar.src = offerObject.author.avatar;

//   featuresListElement(offerObject.offer.features, featuresList);
//   photosCopy(offerObject.offer.photos, photos);

//   return cardCopy;
// };

// var firstElementCard = createCard(createdOffers[0]);
var mapFiltersContainer = map.querySelector('.map__filters-container');
// map.insertBefore(firstElementCard, mapFiltersContainer);
})();
