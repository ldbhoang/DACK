'use strict'

var addPostApp = angular.module('mainApp.addPost', ['ngRoute','firebase']);

//Route
addPostApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'addPostCtrl'
    })
}]);

addPostApp.controller('addPostCtrl', ['$scope','UserService', '$location', '$firebase', '$route', '$firebaseArray', function($scope, UserService, $location, $firebase, $route, $firebaseArray){
	$scope.service = UserService;
	var fb = new Firebase("https://frontend-tuts.firebaseio.com/adm");
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
				$scope.AddPost = function(){
					var title = $scope.article.title;
					var post = $scope.article.post;
					var type = $scope.article.type;
					console.log(type);
					var id = "";
					
					if(type === "HTML Tuts")
					{
						var fb = new Firebase("https://frontend-tuts.firebaseio.com/htmlTuts");
					}
					else if(type === "Javascript Tuts")
					{
						var fb = new Firebase("https://frontend-tuts.firebaseio.com/jsTuts");
					}
					else if(type === "CSS Tuts")
					{
						var fb = new Firebase("https://frontend-tuts.firebaseio.com/cssTuts");
					}
					else
					{
						window.alert("Please select one category for post!!!");
						return;
					}
					
					var onComplete = function(error) {
						if(error){
							console.log(error);
						}
						else{
							console.log("Push data success");
							$route.reload();
						}
					};

					var ref = fb.push();
					id = ref.key();
					ref.set({
						title : title,
						post : post,
						id : id
					}, onComplete);
				}			
			}
			else
			{
				$location.path('/home');		
			}
		});
		
	});
}]);