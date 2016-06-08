/**
 * Created by HienNguyen on 8/6/2016.
 */
'use strict'

var detailTopicApp = angular.module('mainApp.detailTopic', ['ngRoute', 'firebase','ngCookies']);

//Route
detailTopicApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/detailTopic/:id', {
        templateUrl: 'discuss/detailTopic.html',
        controller: 'detailTopicCtrl'
    })
}]);

detailTopicApp.controller('detailTopicCtrl', ['$scope', '$firebase', '$firebaseArray', '$location', '$route', 'UserService', function($scope, $firebase, $firebaseArray, $location, $route, UserService) {
    var fb = new Firebase("https://frontend-tuts.firebaseio.com/discuss");
    $scope.Topics = $firebaseArray(fb);
    var idTopic = $route.current.params.id;
    $scope.Topics.$loaded().then(function () {
        console.log(idTopic);
        var i;
            for (i = 0; i < $scope.Topics.length; i++) {
                if (idTopic === $scope.Topics[i].$id) {
                    $scope.detailTopic = $scope.Topics[i];
                    break;
                }
            }
		if($scope.detailTopic == null)
		{
			$location.path('/discuss');
		}
    });

    $scope.Reply = function(){
        var content = $scope.reply.Content;
        var user = UserService.getUser();
        console.log(content);
        var fb = new Firebase("https://frontend-tuts.firebaseio.com/discuss/" + idTopic);
        var ans = fb.child('answers');
        var d = new Date();
        ans.push({
            content: content,
            emailreply: user,
            datePublish: d.toLocaleTimeString() + ' ' +  d.toDateString()
        },function(error) {
            if (error) {
                console.log(error);
            }
            else {
                $('#replyModal').modal('hide');
                console.log("Push data success");

            }
        });

    }
}]);