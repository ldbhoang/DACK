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
	$scope.pageClass = 'page-animation1';
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
							if($scope.addemail === ref[i].$value)
							{
								alert("This user already has admin permission!");
								$route.reload();
								return;
							}
						}
						fb.push($scope.addemail);
						alert("Added successfully!");
						$scope.addemail = "";
						$route.reload();
					}
				}
				
				$scope.delAdmin = function() {
					if(!$scope.delForm.$invalid)
					{
						for(i = 0; i < ref.length; i++)
						{
							if($scope.delemail === ref[i].$value && $scope.delemail !== newVal)
							{
								var temp = new Firebase("https://frontend-tuts.firebaseio.com/adm" + ref[i].$id);
								var onComplete = function(error) {
									if(error){
										console.log(error);
									}
									else{
										console.log("Delete Successfully!");
										alert("Delete successfully!");
										$scope.delemail = "";
										$route.reload();
									}
								};
								temp.remove(onComplete);
								$scope.delemail = "";
								$route.reload();
								return;
							}
						}
						alert($scope.delemail + " dose not exist");
						$scope.delemail = "";
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