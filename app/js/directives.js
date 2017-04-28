(function(){


	var app = angular.module('angularFirstDirectives', []);

	app.directive('myitem', function(){

		return {

			restrict: "A",
			templateUrl: "product-item.html"

		};

	});

})();