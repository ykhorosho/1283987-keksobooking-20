// Перемещение метки;
'use strict';
(function () {
  // 'location': {
  //   'x': getRandomIntInclusive(0 + window.data.OFFSET_X, mapPinsWidth - window.data.OFFSET_X),
  //   'y': getRandomIntInclusive(130, 630)
  // }

  var CoordinatesPin = {
    x: {
      min: 0 + window.data.OFFSET_X,
      max: mapPinsWidth - window.data.OFFSET_X
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evt) {
      evt.preventDefault();
      window.map.defaultAddress(mapPinMain, false);
      var shift = {
        x: startCoords.x - evt.clientX,
        y: startCoords.y - evt.clientY
      };

      if (mapPinMain.offsetLeft - shift.x < CoordinatesPin.x.min) {
        mapPinMain.style.left = CoordinatesPin.x.min + 'px';
      } else if (mapPinMain.offsetLeft - shift.x > CoordinatesPin.x.max) {
        mapPinMain.style.left = CoordinatesPin.x.max + 'px';
      } else {
        mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';
      }

      if (mapPinMain.offsetTop - CoordinatesPin.y.min < MIN_Y) {
        mapPinMain.style.top = CoordinatesPin.y.min + 'px';
      } else if (mapPinMain.offsetTop - shift.y > CoordinatesPin.y.max) {
        mapPinMain.style.top = CoordinatesPin.y.max + 'px';
      } else {
        mapPinMain.style.top = mapPinMain.offsetTop - shift.y + 'px';
      }
    };

    var onMouseUp = function (evt) {
      evt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
  // mousedown - нажатие кнопки мыши на элементе

  // mousemove - срабатывает, когда указатель мыши перемещается внутри элемента
  // mouseup - срабатывает, когда указатель мыши находится над элементом и кнопка мыши отпущена
