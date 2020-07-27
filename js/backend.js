//
'use strict';
(function () {
  var TIMEOUT_IN_MS = 10000;
  var RESPONSE_TYPE = 'json';

  var Url = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    SEND: 'https://javascript.pages.academy/keksobooking',
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

  var xhrCreate = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

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

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  function send (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.open('POST', Url.SEND);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    send: send,
  };
})();
