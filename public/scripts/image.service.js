angular.module('BrandImageManagerApp', ['ngRoute'])
       .service('ImageService', ImageService);

function ImageService($http) {
  // function to return all image URL's from SQL DB for admin, should
  // also get status to display on landing page.
  this.getAllUrls = function() {
    return $http.get('/sql/admin');
  };

  // function to return all image URL's from SQL DB for user's department, should
  // also get status to display on landing page.
  this.getDeptUrls = function(deptID) {
    return $http.get('/sql/' + deptID);
  };

  // function to return all pending images for Admin

  // function to return all approved images for Admin

  // function to delete a specific image from S3 and SQL DB.
  this.deleteImage = function(url, imageID) {
    // Img URL will be in the following format:
    // http://BUCKET_REGION.amazonaws.com/BUCKET_NAME/IMAGE_NAME.jpg
    var imageName = url.replace('http://BUCKET_REGION.amazonaws.com/BUCKET_NAME/', '');
    var name = imageName.replace('.jpg', '');
    return $http.delete('/s3/' + name).then(function() {
      return $http.delete('/sql/' + imageID);
    })
  };

}
