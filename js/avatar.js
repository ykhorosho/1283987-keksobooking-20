'use strict';
(function () {
  var TYPE_FILES = ['gif', 'jpg', 'jpeg', 'png'];
  var SIZE_FILES = 70;
  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');
  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');
  var previewContainer = document.querySelector('.ad-form__photo-container');
  var previewsArray = [];
  var standartAvatar = preview.src;

  function loadImg(element, onLoad) {
    var file = element.files[0];
    var fileName = file.name.toLowerCase();

    var matches = TYPE_FILES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        onLoad(reader.result);
      });

      reader.readAsDataURL(file);
    }
  }

  function createImg(src, alt, width, height) {
    var photoImg = document.createElement('img');
    photoImg.width = width;
    photoImg.height = height;
    photoImg.src = src;
    photoImg.alt = alt;
    return photoImg;
  }

  function createPreview(src) {
    var photoBlock = document.createElement('div');
    photoBlock.classList.add('ad-form__photo');
    var imgElement = createImg(src, 'Фото жилья', SIZE_FILES, SIZE_FILES);
    photoBlock.appendChild(imgElement);
    previewsArray.push(photoBlock);
    previewContainer.insertBefore(photoBlock, previewPhoto);
  }

  avatarInput.addEventListener('change', function () {
    loadImg(avatarInput, function (image) {
      preview.src = image;
    });
  });

  photoInput.addEventListener('change', function () {
    loadImg(photoInput, createPreview);
  });

  function resetPreview() {
    if (previewsArray.length > 0) {
      previewsArray.forEach(function (element) {
        element.remove();
      });
    }
    preview.src = standartAvatar;
  }

  window.avatar = {
    resetPreview: resetPreview,
  };
})();
