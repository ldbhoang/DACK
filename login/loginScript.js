'use strict'

var loginApp = angular.module('mainApp.login', ['ngRoute','firebase','ngCookies']);

//Route
loginApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'loginCtrl'
    })
}]);

loginApp.controller('loginCtrl', ['$scope','$location','UserService' ,'$firebaseAuth',function($scope,$location,UserService,$firebaseAuth) {
	$scope.pageClass = 'page-animation1';
	var firebaseObj = new Firebase("https://frontend-tuts.firebaseio.com/");
	var authData = firebaseObj.getAuth();
	var authObj = $firebaseAuth(firebaseObj);
	var loggedOut = false;
	if(authData) {
		firebaseObj.unauth();
		$scope.loggedOut = true;
		UserService.setUser("failed");
	}
	
	
	var login = {};
	$scope.login=login;
	$scope.SignIn = function(e) {
		e.preventDefault();
		login.loading = true;
		var username = $scope.user.logemail;
		var password = $scope.user.logpassword;
		authObj.$authWithPassword({
				email: username,
				password: password
			})
			.then(function(user) {
				//Success callback
				login.loading = false;
				console.log('Authentication successful');
				UserService.setUser(username);
				$location.path('/home');				
			}, function(error) {
				//Failure callback
				login.loading = false;
				console.log('Authentication failure');
				$scope.logError = true;
				$scope.logErrorMessage = error.message;
			});
	};

	var register = {};
	$scope.register = register;
	$scope.signUp = function() {
		register.loading = true;
		if (!$scope.regForm.$invalid) {
			var email = $scope.user.regemail;
			var password = $scope.user.regpassword;
			if (email && password) {
				authObj.$createUser({email : email, password : password})
					.then(function() {
						// do things if success
						console.log('User creation success');
						authObj.$authWithPassword({
							email: email,
							password: password
						})
						.then(function(user) {
							//Success callback
							register.loading = false;
							console.log('Authentication successful');
							UserService.setUser(email);
							$location.path('/home');
						}, function(error) {
							//Failure callback
							register.loading = false;
							console.log('Authentication failure');
							$scope.regError = true;
							$scope.regErrorMessage = error.message;
						});
					}, function(error) {
						// do things if failure
						register.loading = false;
						console.log(error);
						$scope.regError = true;
						$scope.regErrorMessage = error.message;
					});
			}
		}
	};
}]);

loginApp.service('UserService', [ '$cookies', function($cookies) {
    var user = '';
    return {
        getUser: function() {
            user = $cookies.get("user");
			return user;
        },
        setUser: function(value) {
            user = value;
			$cookies.put("user", user);
        }
    };
}]);

loginApp.directive('laddaLoading', [
	function(){
		return {
			link: function(scope, element, attrs){
				var Ladda = window.Ladda;
				var ladda = Ladda.create(element[0]);
				scope.$watch(attrs.laddaLoading, function(newVal, oldVal){
					if(newVal){
						ladda.start();
					} else{
						ladda.stop();
					}
				});
			}
		};
	}
]);