'use strict';
(function () {
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  function renderError() {
    var errorElement = errorMessage.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');

    errorButton.addEventListener('click', onErrorRemove);
    document.addEventListener('keydown', onEscPress);

    main.appendChild(errorElement);
  }

  function onErrorRemove() {
    var mainSuccessMessage = main.querySelector('.error');
    mainSuccessMessage.remove();
    document.removeEventListener('keydown', onEscPress);
  }

  function renderSuccess() {
    var successElement = successMessage.cloneNode(true);
    successElement.addEventListener('click', onSuccesRemove);
    document.addEventListener('keydown', onEscPress);
    main.appendChild(successElement);
  }

  function onSuccesRemove() {
    var mainSuccessMessage = main.querySelector('.success');
    mainSuccessMessage.remove();
    document.removeEventListener('keydown', onEscPress);
  }

  function onEscPress(evt) {
    if (evt.key === window.data.ESC_KEY && document.querySelector('.success')) {
      onSuccesRemove();
    } else if (evt.key === window.data.ESC_KEY && document.querySelector('.error')) {
      onErrorRemove();
    }
  }

  window.message = {
    success: renderSuccess,
    error: renderError
  };
})();
