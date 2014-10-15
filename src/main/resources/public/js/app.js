'use strict';
angular.module('app', ['ngRoute', 'ngResource', 'angular-hal'])
	.config(function ($routeProvider) {
		$routeProvider
            .when('/', {
			     templateUrl: 'list.html'
		    })
            .when('/detail', {
			     templateUrl: 'detail.html'
		    }).otherwise({
			     redirectTo: '/'
		    });
})


.controller('DetailCtrl', function($scope, $resource, halClient) {
    /*
	var a = halClient.$get('api').then( function( api ) {
        return api.$get('fattura').then(function (fattura) {
        	return fattura.$get('fattura').then(function (fatture) {
    			$scope.testata = fatture[0];
    			console.log($scope.testata);

    			$scope.testata.$get('righe').then(function(righe) {
    				return righe.$get('rigaFattura').then(function(righe) {
	    				console.log(righe);
	    				$scope.righe = righe;
    				});
    			});
        	});

        });
    })
    ;
	*/

})

.controller('ListCtrl', function($scope, $resource, $location, halClient) {
    var a = halClient.$get('api').then( function( api ) {
        return api.$get('fattura').then(function (fattura) {
            return fattura.$get('fattura').then(function (fatture) {
                $scope.fatture = fatture;
            });

        });
    })
    ;
   
    $scope.detail = function(idx) {
        console.log($scope.fatture[idx]);

        var href = $scope.fatture[idx].$href('self');
        $location.path("/detail");

        // halClient.$get($scope.fatture[idx].$href('self')).then(function(f) {
        //     console.log("dettaglio: "); console.log(f);
        // });
    }
});