'use strict';
angular.module('app', ['ngRoute', 'ngResource', 'angular-hal'])
	.config(function ($routeProvider) {
		$routeProvider
            .when('/', {
			     templateUrl: 'list.html'
		    }).when('/detail/:num*', {
			     templateUrl: 'detail.html'
		    })
		    .otherwise({
			     redirectTo: '/'
		    });
})

.controller('ListCtrl', function($scope, $resource, $location, halClient, $window) {
	$scope.pagination = $location.search();
	if (!$scope.pagination.page)
		$scope.pagination.page = 0 ;
	
	if (!$scope.pagination.size)
		$scope.pagination.size = 10 ;
	
	$scope.next = parseInt($scope.pagination.page) +1;
	$scope.prev = parseInt($scope.pagination.page) -1;
	
	console.log($scope.prev);
	console.log($scope.next);
	
    halClient.$get('api').then( function( api ) {
        return api.$get('fatture', $scope.pagination).then(function (fattura) {
            
        	// Potrei usare questo
        	$scope.nextUrl = fattura.$href('next');
            
            return fattura.$get('fatture').then(function (fatture) {
                $scope.fatture = fatture;
                
            });

        });
    })
    ;
   
//    $scope.avanti = function() {
//    	if ($scope.nextUrl)
//            return halClient.$get($scope.nextUrl).then(function (fattura) {
//                
//            	// Potrei usare questo
//            	$scope.nextUrl = fattura.$href('next');
//                
//                return fattura.$get('fatture').then(function (fatture) {
//                    $scope.fatture = fatture;
//                    
//                });
//
//            });
//    };
    

})

.controller('DetailCtrl', function($scope, $resource, halClient, $routeParams, $location) {
	var load = function() {
	
		halClient.$get("api/fatture/search/findByNumero?numero=" + $routeParams.num).then(function(testata) {
			return testata.$get("fatture").then(function(fatture) {
				$scope.testata = fatture[0];
				$scope.testataCopy = angular.copy( $scope.testata );
				
				return $scope.testata.$get('righe').then(function(righe) {
					return righe.$get('righe').then(function(righe) {
						$scope.righe = righe;
					});
				});
			});
		});
	};
		
		
	$scope.aggiungiRiga = function() {
		var n = $scope.righe.length;
		var riga = {
		      "riga" : n,
		      "descrizione" : "Riga " + n,
		      "quantita" : 10 * n,
		      "prezzoUnitario" : 2.00 * n,
		      "iva" : 22.00,
		      "testata": $scope.testata.$href('self')
		      };
		
		$scope.righe.push(riga);
		
		halClient.$get("api").then( function( api ) {
			api.$post("righe", null, riga);
		});
		
	};

	$scope.salva = function() {
		$scope.testata.$patch('self', null, $scope.testataCopy);
	}
	
	$scope.elimina = function() {
		$scope.testata.$del('self').then(function (fattura) {$scope.elenco();});
	}
	
	$scope.elenco = function() {
		$location.path("/");
	}
	
	load();
})
;