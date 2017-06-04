'use strict';

/**
 * @ngdoc function
 * @name resdokApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resdokApp
 */
angular.module('resdokApp')
    .controller('MainCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$firebaseAuth', '$firebaseStorage', function ($scope, $firebaseObject, $firebaseArray, $firebaseAuth, $firebaseStorage) {
        this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
        var ref = firebase.database().ref().child("items");
        // download the data into a local object
        $scope.data = $firebaseArray(ref);
        // putting a console.log here won't work, see below
        console.log($scope.data);


        $scope.itemname = "";

        $scope.senditem = function () {
            var obj = $firebaseArray(ref);

            var foo = {
                "name": $scope.itemname
            };
            obj.$add(foo).then(function (ref) {
                $scope.itemname = "";
            }, function (error) {
                console.log("Error:", error);
            });
        }

        $scope.authObj = $firebaseAuth();


        /**
        $scope.authObj.$signInAnonymously().then(function (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });
        */
        /**
        $scope.authObj.$signInWithPopup("google").then(function (result) {
            console.log("Signed in as:", result.user.uid);

        }).catch(function (error) {
            console.error("Authentication failed:", error);
        });
*/

        $scope.authObj.$onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser) {
                console.log(firebaseUser);
                $scope.user = firebaseUser.displayName;
            } else {
                console.log('Not logged!');
            }
        });

        var storageRef = firebase.storage().ref('userProfiles/physicsmarie');
        var storage = $firebaseStorage(storageRef);
  }]);
