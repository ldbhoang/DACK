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

discussApp.controller('discussCtrl', ['$scope','$location','UserService' ,'$firebase', '$firebaseArray', '$route', function($scope,$location,UserService,$firebase, $firebaseArray, $route){
	$scope.pageClass = 'page-about';
    $scope.service = UserService;
	var loggedIn = false;
    $scope.$watch('service.getUser()', function(newVal) {
        if(!newVal || newVal=='' || newVal == 'failed') {
            loggedIn = false;
        }
		else
		{
			loggedIn = true;
		}
        var firebaseObj = new Firebase("https://frontend-tuts.firebaseio.com/discuss/");

        $scope.Topics = $firebaseArray(firebaseObj);
		$scope.type = "";
        $scope.createTopic = function(){
			console.log(loggedIn);
			if(loggedIn)
			{
				var topic = $scope.newTopic.Topic;
				var content = $scope.newTopic.Content;
				var type = $scope.newTopic.Type;
				var user = UserService.getUser();
				var d = new Date();
				var fb = new Firebase("https://frontend-tuts.firebaseio.com/discuss/");
				
				if(type == null || type === "")
				{
					alert("Please select a category!!!");
				}
				else
				{
					fb.push({
					topic: topic,
					content: content,
					type: type,
					emailOwner: user,
					datePublish: d.toLocaleTimeString() + ' ' +  d.toDateString()
					},function(error) {
						if (error) {
							console.log(error);
						}
						else {
							$('#newTopicModal').modal('hide');
							console.log("Push data success");
							$route.reload();
						}
					});
				}				
			}
            else
			{
				alert("You must sign in to use this feature!");
				$('#newTopicModal').modal('hide');
				$route.reload();
			}
        };

		$scope.applyCategory = function()
		{
			if($scope.topic.type === "ALL")
			{
				$scope.type = "";
			}
			else if($scope.topic.type === "HTML Topic")
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
			console.log($scope.type);

		}
    });

}]);

