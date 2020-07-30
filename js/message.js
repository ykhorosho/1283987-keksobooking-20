'use strict';
(function () {
  var main = document.querySelector('main');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  function renderError() {
    var errorElement = errorMessage.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onDocumentEscPress);

    main.appendChild(errorElement);
  }

  function onErrorButtonClick() {
    var mainSuccessMessage = main.querySelector('.error');
    mainSuccessMessage.remove();
    document.removeEventListener('keydown', onDocumentEscPress);
  }

  function renderSuccess() {
    var successElement = successMessage.cloneNode(true);
    successElement.addEventListener('click', onSuccesElementClick);
    document.addEventListener('keydown', onDocumentEscPress);
    main.appendChild(successElement);
  }

  function onSuccesElementClick() {
    var mainSuccessMessage = main.querySelector('.success');
    mainSuccessMessage.remove();
    document.removeEventListener('keydown', onDocumentEscPress);
  }

  function onDocumentEscPress(evt) {
    if (evt.key === window.data.ESC_KEY && document.querySelector('.success')) {
      onSuccesElementClick();
    } else if (evt.key === window.data.ESC_KEY && document.querySelector('.error')) {
      onErrorButtonClick();
    }
  }

  window.message = {
    success: renderSuccess,
    error: renderError
  };
})();
