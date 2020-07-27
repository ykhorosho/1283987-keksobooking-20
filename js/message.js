'use strict';
(function () {
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  var renderError = function () {
    var errorElement = errorMessage.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');

    errorButton.addEventListener('click', onErrorRemove);
    document.addEventListener('keydown', onEscPress);

    main.appendChild(errorElement);
  };

  var onErrorRemove = function () {
    var mainSuccessMessage = main.querySelector('.error');
    mainSuccessMessage.remove();
    document.removeEventListener('keydown', onEscPress);
  };

  var renderSuccess = function () {
    var successElement = successMessage.cloneNode(true);
    successElement.addEventListener('click', onSuccesRemove);
    document.addEventListener('keydown', onEscPress);
    main.appendChild(successElement);
  };

  var onSuccesRemove = function () {
    var mainSuccessMessage = main.querySelector('.success');
    mainSuccessMessage.remove();
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    if (evt.key === 'Escape' && document.querySelector('.success')) {
      onSuccesRemove();
    } else if (evt.key === 'Escape' && document.querySelector('.error')) {
      onErrorRemove();
    }
  };

  window.message = {
    success: renderSuccess,
    error: renderError
  };
})();
