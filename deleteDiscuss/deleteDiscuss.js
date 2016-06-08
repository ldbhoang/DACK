/**
 * Created by HienNguyen on 8/6/2016.
 */
'use strict'

var deleteDiscussApp = angular.module('mainApp.deleteDiscuss', ['ngRoute','firebase']);

//Route
deleteDiscussApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/deleteDiscuss', {
        templateUrl: 'deleteDiscuss/deleteDiscuss.html',
        controller: 'deleteDiscussCtrl'
    })
}]);

deleteDiscussApp.controller('deleteDiscussCtrl', ['$scope','UserService', '$location', '$firebase', '$firebaseObject', '$firebaseArray', function($scope, UserService, $location, $firebase, $firebaseObject, $firebaseArray){
    $scope.service = UserService;
    var fb = new Firebase("https://frontend-tuts.firebaseio.com/adm");
    var fb1;
    var ref = $firebaseArray(fb);

    $scope.$watch('service.getUser()', function(newVal) {
        console.log(newVal);
        ref.$loaded().then(function(){
            var i;
            for(i = 0; i < ref.length; i++)
            {
                if(newVal === ref[i].$value)
                {
                    $scope.flag = true;
                    break;
                }
            }

            if($scope.flag)
            {
                $scope.applyCategory = function() {
                    if($scope.topic.type == null)
                    {
                        alert("Please select one category for post!!!");
                        return;
                    }

                    if($scope.post.type === "HTML Topic")
                    {

                    }
                    else if($scope.post.type === "Javascript Topic")
                    {

                    }
                    else if($scope.post.type === "CSS Topic")
                    {

                    }

                    var ref1 = $firebaseArray(fb1)
                    $scope.posts = ref1;
                }



                $scope.deleteDiscuss = function(id) {
                    console.log(id);
                    var firebaseObj = fb1.child(id);

                    $scope.postToUpdate = $firebaseObject(firebaseObj);

                    $('#editModal').modal();
                }

                $scope.update = function() {
                    console.log($scope.postToUpdate.$id);
                    var postUpdate = fb1.child($scope.postToUpdate.$id);

                    var onComplete = function(error) {
                        if(error){
                            console.log(error);
                        }
                        else{
                            console.log("Update Successfully!");
                            $('#editModal').modal('hide')
                        }
                    };

                    postUpdate.update({
                        title: $scope.postToUpdate.title,
                        post: $scope.postToUpdate.post

                    }, onComplete);

                }


                $scope.confirmDelete = function(id) {
                    console.log(id);
                    var firebaseObj = fb1.child(id);

                    $scope.postToDelete = $firebaseObject(firebaseObj);

                    $('#deleteModal').modal();
                }

                $scope.deletePost = function() {

                    console.log($scope.postToDelete.$id);
                    var postDelete = fb1.child($scope.postToDelete.$id);

                    var onComplete = function(error) {
                        if(error){
                            console.log(error);
                        }
                        else{
                            console.log("Delete Successfully!");
                            $('#deleteModal').modal('hide');
                        }
                    };

                    postDelete.remove(onComplete);
                }
            }
            else
            {
                $location.path('/home');
            }
        });

    });
}]);