'use strict'

var adminApp = angular.module('mainApp.admin', ['ngRoute','firebase']);

//Route
adminApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/admin', {
        templateUrl: 'admin/admin.html',
        controller: 'adminCtrl'
    })
}]);

adminApp.controller('adminCtrl', ['$scope','UserService', '$location', '$firebase', '$route', '$firebaseArray', function($scope, UserService, $location, $firebase, $route, $firebaseArray){
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
				$scope.addAdmin = function() {
					if(!$scope.addForm.$invalid)
					{
						for(i = 0; i < ref.length; i++)
						{
							if($scope.email === ref[i].$value)
							{
								alert("This user already has admin permission!");
								return;
							}
						}
						fb.push($scope.email);
						alert("Added successfully!");
						$scope.email = "";
					}
				}
			}
			else
			{
				$location.path('/home');		
			}
		});
		
	});
}]);