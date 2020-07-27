'use strict';
(function () {
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  var renderError = function (errorText) {
    var errorElement = errorMessage.cloneNode(true);
    var errorMessageText = errorCopy.querySelector('.error__message');
    var errorButton = errorCopy.querySelector('.error__button');

    errorMessageText.textContent = errorText;

    errorButton.addEventListener('click', onErrorClick);
    errorElement.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);

    main.appendChild(errorElement);
  };

  var renderSuccess = function () {
    var successElement = successMessage.cloneNode(true);

    successElement.addEventListener('click', onSuccesClick);
    document.addEventListener('keydown', onSuccesEscPress);

    main.appendChild(successElement);
  };

  var onSuccesClick = function (evt) {
    var mainSuccessMessage = main.querySelector('.success');
    evt.preventDefault();
    mainSuccessMessage.remove();
  };

  var onSuccesEscPress = function (evt) {
    if (evt.key === 'Escape' && document.querySelector('.success')) {
      onSuccesClick(evt);
    } else if (evt.key === 'Escape' && document.querySelector('.error')) {
      onErrorClick();
    }
  };

  window.message = {
    success: renderSuccess,
    error: renderError
  };
})();
