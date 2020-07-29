'use strict';
(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var MAX_PINS = 5;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  var debounce = window.debounce(window.pin.loadOfferElements);

  function checkType(pin) {
    return housingType.value === 'any' ? true : pin.offer.type === housingType.value;
  }

  function checkRooms(pin) {
    return housingRooms.value === 'any' ? true : pin.offer.rooms === Number(housingRooms.value);
  }

  function checkGuests(pin) {
    return housingGuests.value === 'any' ? true : pin.offer.guests === Number(housingGuests.value);
  }

  function checkPrice(pin) {
    var price = pin.offer.price;
    switch (housingPrice.value) {
      case 'low':
        return price < MIN_PRICE;
      case 'middle':
        return price >= MIN_PRICE && price <= MAX_PRICE;
      case 'high':
        return price > MAX_PRICE;
      default:
        return true;
    }
  }

  function checkFeatures(pin) {
    var allCheckbox = mapFilters.querySelectorAll('.map__checkbox:checked');
    return Array.from(allCheckbox).every(function (feature) {
      return ~pin.offer.features.indexOf(feature.value);
    });
  }

  function getFilterData(pins) {
    var filterPins = pins.filter(function (pin) {
      return checkType(pin) && checkRooms(pin) && checkGuests(pin) && checkPrice(pin) && checkFeatures(pin);
    });
    return window.utils.getAmountOfPins(filterPins, MAX_PINS);
  }

  function onFilterChange() {
    window.pin.removePins();
    window.card.remove();
    var pins = window.createdOffers;
    debounce(getFilterData(pins));
  }

  mapFilters.addEventListener('change', onFilterChange);

  window.filter = {
    getData: getFilterData
  };
})();
