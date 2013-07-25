//setter
var app = angular.module("app", []).config(function($routeProvider) {
		$routeProvider.when('/landing', {
		templateUrl: 'app/landing.html',
		controller: 'LandingController'
	});
	$routeProvider.when('/login', {
		templateUrl: 'app/login.html',
		controller: 'LoginController'
	});
	$routeProvider.when('/home', {
		templateUrl: 'app/home.html',
		controller: 'HomeController'
	});
	$routeProvider.when('/signup', {
		templateUrl: 'app/signup.html',
		controller: 'SignupController'
	});
	$routeProvider.otherwise ({ redirectTo : '/landing'});
});



app.factory("AuthenticationService", function($location)	{
	return {
		login: function(credentials) {
			if (credentials.username === "bob") {
				$location.path('/home');
			}	
		},
		logout: function() {
			$location.path('/login');
		}
	};
});

// Sign-up Page/function Controller
app.controller('SignupController', function($scope, AuthenticationService) {
	$scope.credentials = { username:"", password:"" };

	$scope.login = function() {
		AuthenticationService.login($scope.credentials);
	};
});



// Login Page/function Controller
app.controller('LoginController', function($scope, AuthenticationService) {
	$scope.credentials = { username:"", password:"" };

	$scope.login = function() {
		AuthenticationService.login($scope.credentials);
	};
});


// Home Page Controller
app.controller('HomeController', function($scope, AuthenticationService) {
	$scope.title = "Welcome Home";
	$scope.message = "Please hover over these images to see their directive";

	$scope.logout = function() {
		AuthenticationService.logout();
	};
});



// Image name handler
app.directive('showsMessageWhenHovered', function() {
	return {
		restrict: "A", // A = attribute, C = Class Name, E = element. M = HTML
		link: function(scope, element, attributes) {
			var originalMessage = scope.message;
			element.bind("mouseover", function() {
				scope.message = attributes.message;
				scope.$apply();
			});
			element.bind("mouseout", function() {
				scope.message = originalMessage;
				scope.$apply();
			});
		}
	}

});