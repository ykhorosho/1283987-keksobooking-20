// модуль, который создаёт данные
'use strict';
(function () {
  window.data = {
    OFFERS_COUNT: 8,
    offersTypes: ['palace', 'flat', 'house', 'bungalo'],
    offersChekins: ['12:00', '13:00', '14:00'],
    offersCheckout: ['12:00', '13:00', '14:00'],
    offersPhotos: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ],
    offersTitles: ['Предложение отличное', 'Плохое предложение'],
    offersAddress: ['600, 350', '500, 250', '400, 150'],
    offersPrice: [10, 300, 1000],
    offersRooms: [1, 2, 3, 4, 5],
    offersGuests: [1, 2, 3, 4, 5],
    offersFeatures: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    offersDescription: ['Большая комната', 'Маленькая комната'],

    OFFSET_X: 25,
    OFFSET_Y: 70,

    MAIN_ARROW_HEIGHT: 16,
  };
})();
