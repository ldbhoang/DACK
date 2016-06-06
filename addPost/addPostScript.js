'use strict'

var addPostApp = angular.module('mainApp.addPost', ['ngRoute','firebase']);

//Route
addPostApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'addPostCtrl'
    })
}]);

addPostApp.controller('addPostCtrl', ['$scope','UserService', '$location', '$firebase', function($scope, UserService, $location, $firebase){
	$scope.service = UserService;
	$scope.$watch('service.getUser()', function(newVal) {
		console.log(newVal);
		if(newVal === "ldbhoang@gmail.com")
		{
			$scope.AddPost = function(){
				var title = $scope.article.title;
				var post = $scope.article.post;
				
				var fb = new Firebase("https://frontend-tuts.firebaseio.com/htmlTuts");
				//var fb = $firebase(firebaseObj);

				fb.push({ 
					title: title, 
					post: post 
				}, function(error) {
					if(error){
						console.log(error);
					}
					else{
						console.log("Push data success");
						$location.path('/addPost');
					}
				});
			}			
		}
		else
		{
			$location.path('/home');		
		}
	});
}]);