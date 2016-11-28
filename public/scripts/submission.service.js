angular.module('BrandImageManagerApp')
.service('SubmissionsService', SubmissionsService);

function SubmissionsService ($http) {
  // do GET resquest to query the submissions table for a single department
  this.getSubmissions = function (deptID) {
    return $http({
      method: 'GET',
      url: '/submissions/' + deptID
    }).then(function successCallback(response) {
        console.log('whats the submissions data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });//end of get
  };

  // do GET resquest to query the submissions table for a single department
  this.getAllSubmissions = function () {
    return $http({
      method: 'GET',
      url: '/submissions/admin'
    }).then(function successCallback(response) {
        console.log('whats all the submissions data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });//end of get
  };

  // do GET resquest to query the submissions table for a single department,
  // Will return only submissions with a status specified in params;
  this.getCertainSubmissions = function (status, department) {
    return $http({
      method: 'GET',
      url: '/submissions/' + status + '/' + department
    }).then(function successCallback(response) {
        console.log('whats the submissions data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });//end of get
  };

  // do POST request to SQL DB
  // submissionObj should contain following data: saved_edit, status, user_id,
  // deptartment_id, image_id, brand_id, admin_comment, user_comment.
  this.createSubmission = function (submissionObj) {
    return $http({
      method: 'POST',
      url: '/submissions',
      data: submissionObj
    }).then(function successCallback(response) {
        console.log('whats the submissions data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });//end of get
  };

  // do PUT request to SQL DB to update an entry
  // submissionObj should contain following data: submission_id, saved_edit,
  // status, brand_id, admin_comment, user_comment.
  this.updateSubmission = function (submissionObj) {
    return $http({
      method: 'PUT',
      url: '/submissions',
      data: submissionObj
    }).then(function successCallback(response) {
        console.log('whats the submissions data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });//end of get
  };

  // do DELETE request to SQL DB to remove only from SQL
  this.deleteSubmission = function (id) {
    return $http({
      method: 'DELETE',
      url: '/submissions/' + id
    }).then(function successCallback(response) {
        console.log('whats the submissions data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });//end of get
  };

}
