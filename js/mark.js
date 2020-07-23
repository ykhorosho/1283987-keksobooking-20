// Перемещение метки;
'use strict';
(function () {
  var MAP_PIN_MAIN_ARROW = 16;

  var CoordinatesPin = {
    x: {
      min: 0,
      max: window.elements.mapPinsBlock.offsetWidth
      // 1200 - map__pins
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

    var onMouseMove = function (event) {
      event.preventDefault();
      var shift = {
        x: startCoords.x - event.clientX,
        y: startCoords.y - event.clientY
      };

      startCoords = {
        x: event.clientX,
        y: event.clientY
      };


      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      mapPinMain.style.top =  (mapPinMain.offsetTop - shift.y) + 'px';

      window.utils.setCoordinates(true);

      if (mapPinMain.offsetLeft < CoordinatesPin.x.min - mapPinMain.offsetWidth / 2) {
        mapPinMain.style.left = (CoordinatesPin.x.min - mapPinMain.offsetWidth / 2) + 'px';
      } else if (mapPinMain.offsetLeft > CoordinatesPin.x.max - mapPinMain.offsetWidth / 2) {
        mapPinMain.style.left = (CoordinatesPin.x.max - mapPinMain.offsetWidth / 2) + 'px';
      }

      if (mapPinMain.offsetTop < CoordinatesPin.y.min - mapPinMain.offsetHeight - MAP_PIN_MAIN_ARROW) {
        mapPinMain.style.top = CoordinatesPin.y.min - mapPinMain.offsetHeight - MAP_PIN_MAIN_ARROW + 'px';
      } else if (mapPinMain.offsetTop > CoordinatesPin.y.max - mapPinMain.offsetHeight - MAP_PIN_MAIN_ARROW) {
        mapPinMain.style.top = CoordinatesPin.y.max - mapPinMain.offsetHeight - MAP_PIN_MAIN_ARROW+ 'px';
      }
    };

    var onMouseUp = function (event) {
      event.preventDefault();

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
