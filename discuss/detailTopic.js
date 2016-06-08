/**
 * Created by HienNguyen on 8/6/2016.
 */
'use strict'

var detailTopicApp = angular.module('mainApp.detailTopic', ['ngRoute', 'firebase']);

//Route
detailTopicApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/detailTopic', {
        templateUrl: 'discuss/detailTopic.html',
        controller: 'detailTopicCtrl'
    })
}]);

detailTopicApp.controller('detailTopicCtrl', ['$scope', '$firebaseArray', 'DiscussService', function($scope, $firebaseArray, DiscussService){


    var idTopic = DiscussService.getIdTopic();
    var firebaseObj = new Firebase("https://frontend-tuts.firebaseio.com/discuss/"+ idTopic);

    $scope.detailTopic = $firebaseArray(firebaseObj);
    console.log($scope.detailTopic.topic);

}]);