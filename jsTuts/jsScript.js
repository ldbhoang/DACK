'use strict'

var jsApp = angular.module('mainApp.js', ['ngRoute','firebase','ngCookies']);

//Route
jsApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/jsTuts/:id', {
        templateUrl: 'jsTuts/jsTuts.html',
        controller: 'jsCtrl'
    })
}]);

jsApp.controller('jsCtrl', ['$scope', '$firebase', '$firebaseArray', '$location', '$route', '$sce', function($scope, $firebase, $firebaseArray, $location, $route, $sce){
	var fb = new Firebase("https://frontend-tuts.firebaseio.com/jsTuts");
	$scope.tuts = $firebaseArray(fb);
	var id = $route.current.params.id;
	$scope.tuts.$loaded().then(function(){
		console.log(id);
		var i;
		if(id === "default")
		{
			$scope.curTut = $scope.tuts[0];
			$scope.nextTut = $scope.tuts[1].id;
			$scope.preTut = $scope.tuts[0].id;
		}
		else
		{
			for(i = 0; i < $scope.tuts.length; i++)
			{
				if(id === $scope.tuts[i].id)
				{
					$scope.curTut = $scope.tuts[i];
					if(i === $scope.tuts.length - 1)
					{
						$scope.nextTut = $scope.tuts[i].id;
						$scope.preTut = $scope.tuts[i-1].id;
					}
					else if (i === 0)
					{
						$scope.nextTut = $scope.tuts[i+1].id;
						$scope.preTut = $scope.tuts[i].id;
					}
					else
					{
						$scope.nextTut = $scope.tuts[i+1].id;
						$scope.preTut = $scope.tuts[i-1].id;
					}
					break;
				}			
			}
		}

		//id does not exist
		if($scope.curTut == null)
		{
			$location.path('/jsTuts/default');
		}
		
	});	
	
	$scope.renderHtml = function(html_code)
	{
		return $sce.trustAsHtml(html_code);
	};
}]);
