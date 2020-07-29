'use strict';
(function () {
  var TYPE_FILES = ['gif', 'jpg', 'jpeg', 'png'];
  var SIZE_FILES = 70;
  var avatarInput = document.querySelectorAll('.ad-form__field input[type=fale]');
  var preview = document.querySelectorAll('.ad-form-header__preview img');
  var photoInput = document.querySelectorAll('.ad-form__upload input[type=fale]');
  var previewPhoto = document.querySelectorAll('.ad-form__photo img');

  function loadImg(evt) {
    var file = element.files[0];
    var fileName = file.name.toLowerCase();

    var matches = TYPE_FILES.some(function (it) {
      return fileName.endsWith(it);
    });
  }

  if (matches) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      if (evt.target.id === 'avatar') {
        previewAvatar.src = reader.result;
      } else {
        var photoImg = document.createElement('img');
        photoImg.width = SIZE_FILES.width;
        photoImg.height = SIZE_FILES.height;
        previewPhoto.appendChild(photoImg);
      }
    });

    reader.readAsDataURL(file);
  }
}

avatarInput.addEventListener('change', function () {
  loadImage(avatarInput, function (image) {
    preview.src = image;
  });
});

photoInput.addEventListener('change', function () {
  loadImage(photoInput, function () {
    createImgElement();
  });
})();
