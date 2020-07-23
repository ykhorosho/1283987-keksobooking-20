//
'use strict';
(function () {
  var URL = {
    GET: 'https://javascript.pages.academy/keksobooking/data'
  };

	var StatusCode = {
    OK: 200
  };

	var messageOfError = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизирован',
    403: 'Доступ запрещен',
    404: 'Ничего не найдено',
    500: 'Внутренняя ошибка сервера'
  };

	var TIMEOUT_IN_MS = 10000;

	var xhrCreate = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
	  xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
    if (xhr.status === StatusCode.OK) {
      window.createdOffers = xhr.response;
      onLoad(xhr.response);
    } else {
      onError('Статус ответа: ' + messageOfError[xhr.status]);
    }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

	var load = function (onload, error) {
	  var xhr = xhrCreate(onload, error);

    xhr.open('GET', URL.GET);
    xhr.send();
  };

  window.backend = {
    load: load,
  };
})();
