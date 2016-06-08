'use strict'

var editPostApp = angular.module('mainApp.editPost', ['ngRoute','firebase']);

//Route
editPostApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/editPost', {
        templateUrl: 'editPost/editPost.html',
        controller: 'editPostCtrl'
    })
}]);

editPostApp.controller('editPostCtrl', ['$scope','UserService', '$location', '$firebase', '$firebaseObject', '$firebaseArray', function($scope, UserService, $location, $firebase, $firebaseObject, $firebaseArray){
	$scope.pageClass = 'page-animation1';
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
					if($scope.post.type == null)
					{
						alert("Please select one category for post!!!");
						return;
					}
					
					if($scope.post.type === "HTML Tuts")
					{
						fb1 = new Firebase("https://frontend-tuts.firebaseio.com/htmlTuts");
					}
					else if($scope.post.type === "Javascript Tuts")
					{
						fb1 = new Firebase("https://frontend-tuts.firebaseio.com/jsTuts");
					}
					else if($scope.post.type === "CSS Tuts")
					{
						fb1 = new Firebase("https://frontend-tuts.firebaseio.com/cssTuts");
					}
					
					var ref1 = $firebaseArray(fb1)
					$scope.posts = ref1;
				}
				
				
				
				$scope.editPost = function(id) {
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