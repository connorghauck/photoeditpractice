angular.module('BrandImageManagerApp')
    .controller('AdminController', AdminController);

function AdminController($location, AccessService, SubmissionsService) {
    var admin = this;

    //arrays to count number of statuses
    admin.aprroved = [];
    admin.pending = [];
    admin.revision = [];

    //ng-show variables onload
    admin.accessControlsDisplay = false;
    admin.pendingGalleryDisplay = true;
    admin.approvedGalleryDisplay = false;
    admin.revisionGalleryDisplay = false;

    //function to display access
    admin.showAccess = function () {
      admin.getUsersAccesses();
      admin.accessControlsDisplay = true;
      admin.pendingGalleryDisplay = false;
      admin.approvedGalleryDisplay = false;
      admin.revisionGalleryDisplay = false;
    }
    //functions to display gallery
    //display pending gallery
    admin.showPendingGallery = function () {
      admin.accessControlsDisplay = false;
      admin.pendingGalleryDisplay = true;
      admin.approvedGalleryDisplay = false;
      admin.revisionGalleryDisplay = false;
    }
    //display approved gallery
    admin.showApprovedGallery = function () {
      admin.accessControlsDisplay = false;
      admin.pendingGalleryDisplay = false;
      admin.approvedGalleryDisplay = true;
      admin.revisionGalleryDisplay = false;
    }
    //display revision gallery
    admin.showRevisionGallery = function () {
      admin.accessControlsDisplay = false;
      admin.pendingGalleryDisplay = false;
      admin.approvedGalleryDisplay = false;
      admin.revisionGalleryDisplay = true;
    }
    //function for truthy value for access accordion
    admin.truthiness = function (index) {
      //for loop that takes current index of button clicked turns proberty of index true and
      //all other properties in the admin.showUserAccess array false
      for (var i = 0; i < admin.allUserAccess.length; i++) {
        if (i == index) {
          admin.showUserAccess[i] = !admin.showUserAccess[i];
           //console.log('whats the truth ',admin.showUserAccess);
        }else{
          admin.showUserAccess[i] = false;
           //console.log('whats the truth ',admin.showUserAccess);
        }
      }
    }

    //make the key pretty function
    admin.pretty = function (key) {
      var prettyKey = key.replace(/_/g, " ").toLocaleUpperCase();
      return prettyKey;
    }
    //call to service to get all data from submissions table
    admin.getSubmissions = function () {
      SubmissionsService.getAllSubmissions().then(function(response){
        admin.allUsersSubmissions = response;
        console.log('whats the access response', admin.allUsersSubmissions);
        // for loop to push statuses into specific arrays
        //to count number of statuses based on array
        for (var i = 0; i < admin.allUsersSubmissions.length; i++) {
          if (admin.allUsersSubmissions[i].status == 'approved') {
              admin.aprroved.push(angular.copy(response[i]));
          }
        }
      });
    }


    //function to get all user data from the user table for access controls
    admin.getUsersAccesses = function () {
      AccessService.accesses().then(function(response){
        admin.allUserAccess = response;
        //console.log('whats the access response', admin.allUserAccess);
      });
    }

    //update user access
    admin.updateUsersAccesses = function (user, site, val) {
      var accessObj = {email:user, department:site, accessBoolean:val };
      AccessService.updateAccess(accessObj).then(function(response){
          console.log('whats the update access response', response);
          if (site == 'admin') {

          }
          //admin.getUsersAccesses();
        });
    }



    //modal controlls
    // Get the modal
    var modal = document.getElementById('adminModal');

    // When the user clicks the button, open the modal
    admin.viewButton = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    admin.closeModal = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
        }
      }
}//end of AdminController function
