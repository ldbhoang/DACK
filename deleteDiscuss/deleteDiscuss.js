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
    $scope.pageClass = 'page-home';
    $scope.service = UserService;
    $scope.showlist = false;
    var fb = new Firebase("https://frontend-tuts.firebaseio.com/adm");
    var fbdiscuss =  new Firebase("https://frontend-tuts.firebaseio.com/discuss");
    var fbanswer = "";
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
                    $scope.topics = $firebaseArray(fbdiscuss);
                    console.log($scope.topics)
                    if($scope.topic.type == null)
                    {
                        alert("Please select one category for post!!!");
                        return;
                    }

                    if($scope.topic.type === "HTML Topic")
                    {
                        $scope.type = "HTML";
                    }
                    else if($scope.topic.type === "Javascript Topic")
                    {
                        $scope.type = "JAVASCRIPT";
                    }
                    else if($scope.topic.type === "CSS Topic")
                    {
                        $scope.type = "CSS";
                    }

                }

                $scope.confirmDelete = function(id) {
                    console.log(id);
                    var firebaseObj = fbdiscuss.child(id);

                    $scope.topicToDelete = $firebaseObject(firebaseObj);

                    $('#deleteModal').modal();
                }

                $scope.deleteTopic = function() {

                    console.log($scope.topicToDelete.$id);
                    var postDelete = fbdiscuss.child($scope.topicToDelete.$id);

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

                $scope.showReply = function(id){
                    console.log(id);
                    fbanswer = fbdiscuss.child(id).child('answers');
                    $scope.answers = $firebaseArray(fbanswer);
                    console.log($scope.answers);
                        $scope.showlist = true;
                        $('#deletereplyModal').modal('show');
                }

                $scope.confirmDeleteReply = function(id) {
                    console.log(id);
                    var firebaseObj = fbanswer.child(id);
                    $scope.replyToDelete = $firebaseObject(firebaseObj);
                    $('#confirmdeleteReplyModal').modal('show');
                }

                $scope.deleteReply = function() {

                    console.log($scope.replyToDelete.$id);
                    var replyDelete = fbanswer.child($scope.replyToDelete.$id);

                    var onComplete = function(error) {
                        if(error){
                            console.log(error);
                        }
                        else{
                            console.log("Delete Successfully!");
                            $('#confirmdeleteReplyModal').modal('hide');
                        }
                    };

                    replyDelete.remove(onComplete);
                }


            }
            else
            {
                $location.path('/home');
            }
        });

    });
}]);