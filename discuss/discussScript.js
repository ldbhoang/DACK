/**
 * Created by HienNguyen on 7/6/2016.
 */
'use strict'

var discussApp = angular.module('mainApp.discuss', ['ngRoute', 'firebase']);

//Route
discussApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/discuss', {
        templateUrl: 'discuss/discuss.html',
        controller: 'discussCtrl'
    })
}]);

discussApp.controller('discussCtrl', ['$scope','$location','UserService' ,'$firebase', '$firebaseArray', 'DiscussService',function($scope,$location,UserService,$firebase, $firebaseArray, DiscussService){
    $scope.service = UserService;
    $scope.$watch('service.getUser()', function(newVal) {
        if(!newVal || newVal=='' || newVal == 'failed') {
            $location.path('/login');
        }
        var firebaseObj = new Firebase("https://frontend-tuts.firebaseio.com/discuss/");

        $scope.Topics = $firebaseArray(firebaseObj);

        $scope.createTopic = function(){
            var topic = $scope.newTopic.Topic;
            var content = $scope.newTopic.Content;
            var type = $scope.newTopic.Type;
            var user = UserService.getUser();
            var d = new Date();
            var fb = new Firebase("https://frontend-tuts.firebaseio.com/discuss/");

            fb.push({
                topic: topic,
                content: content,
                type: type,
                emailOwner: user,
                datePublish: d.toLocaleTimeString() + ' ' +  d.toDateString(),
                answer: ""
            },function(error) {
                if (error) {
                    console.log(error);
                }
                else {
                    $('#newTopicModal').modal('hide');
                    console.log("Push data success");

                }
            });
        };

        $scope.openDetail = function(id){
            console.log(id);
            DiscussService.setIdTopic(id);
            $location.path('/detailTopic');
        }
    });

}]);

discussApp.service('DiscussService', function() {
    var idTopic = '';
    return{
        getIdTopic: function(){
            return idTopic;
        },

        setIdTopic: function(value) {
            idTopic = value;
        }
    };
});