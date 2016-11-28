angular.module('BrandImageManagerApp')
       .controller('PhotoController', PhotoController);

function PhotoController(Upload, AccessService) {

  console.log('PhotoController loaded');
  var photo = this;

  photo.uploadPicture = function(form) {
    if (form.$invalid) {
      return;
    }
    console.log('photo.controller', photo.upload);
    Upload.upload({
      url: '/image',
      method: 'POST',
      data: photo.upload,
    });
  };

  photo.findUser = function() {
    photo.userDepts = AccessService.userDepts;
    console.log('PhotoController', photo.userDepts);
  }

}
