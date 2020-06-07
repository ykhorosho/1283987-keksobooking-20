'use strict';

var OBJECTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var FEATUERES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


var getRandomArray = function (FEATUERES) {
  for (var i = 0; i < FEATUERES.length; i++){

  }


  for (var i = 0; i < OBJECTS; i++) {
}

{
  'author': {
    'avatar': 'img/avatars/user0' + i + '.png',
  },
  'offer': {
      'title': 'строка, заголовок предложения',
      'address': 'строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      'price': число, стоимость
      'type': строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      'rooms': число, количество комнат
      'guests': число, количество гостей, которое можно разместить
      'checkin': getRandom,
      'checkout': getRandom,
      'features': getRandomArray(FEATUERES.length),
      'description': строка с описанием,
      'photos': массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  },
  'location': {
      'x': getRandomArray(0, 630)случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      'y': getRandomArray(130, 630)
  }
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPinsBlock = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
