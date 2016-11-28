angular.module('BrandImageManagerApp', ['ngRoute'])
       .service('ImageService', ImageService);

function ImageService($http) {
  // function to return all image URL's from SQL DB for user's department, should
  // also get status to display on landing page.

  // function to return all pending images for Admin

  // function to return all approved images for Admin

  // function to delete a specific image from S3 and SQL DB.


}
