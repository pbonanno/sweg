'use strict';
angular.module('app', ['ngRoute', 'ngResource', 'angular-hal'])
	.config(function ($routeProvider) {
		$routeProvider
            .when('/', {
			     templateUrl: 'list.html'
		    }).when('/detail', {
			     templateUrl: 'detail.html'
		    })
		    .otherwise({
			     redirectTo: '/'
		    });
})



.controller('ListCtrl', function($scope, $resource, $location, halClient, $window) {


    var a = halClient.$get('api').then( function( api ) {
        return api.$get('fatture').then(function (fattura) {
            return fattura.$get('fatture').then(function (fatture) {
                $scope.fatture = fatture;
            });

        });
    })
    ;
   
    $scope.detailPage = function(numero) {
//        var id = $scope.fatture[idx].id;
        console.log(numero);
        $location.path("/detail/"+numero);
    }
    
})

.controller('DetailCtrl', function($scope, $resource, halClient, $routeParams) {
	
	var load = function() {
	//	var id = $routeParams.id;
	
	//	halClient.$get('fattura', {'id': id}).then(function(testata) {
	//		$scope.fattura = fattura;
	//		
	//		$scope.testata.$get('righe').then(function(righe) {
	//			return righe.$get('rigaFattura').then(function(righe) {
	//				$scope.righe = righe;
	//			});
	//		});
	//		
	//	});
	//	var href = null;
		
	//	halClient.$get("api/rigaFattura").then(function(riga) {
	//		href = riga.$href('self');
	//	});
		
		halClient.$get('api').then( function( api ) {
	        api.$get('fatture').then(function (fattura) {
	        	return fattura.$get('fatture').then(function (fatture) {
	    			$scope.fattura = fatture[0];
	    			$scope.fatturaCopy = angular.copy( fatture[0] );
	
	    			$scope.fattura.$get('righe').then(function(righe) {
	    				return righe.$get('righe').then(function(righe) {
		    				$scope.righe = righe;
	    				});
	    			});
	        	});
	
	        });
	    })
	    ;
	
	}
	
	$scope.aggiungiRiga = function() {
		var n = $scope.righe.length;
		var riga = {
		      "riga" : n,
		      "descrizione" : "Riga " + n,
		      "quantita" : 10 * n,
		      "prezzoUnitario" : 2.00 * n,
		      "iva" : 22.00,
		      "testata": $scope.fattura.$href('self')
		      };
		
		$scope.righe.push(riga);
		
		halClient.$get("api").then( function( api ) {
			api.$post("righe", null, riga);
		});
		
	};

	$scope.salva = function() {
		$scope.fattura.$patch('self', null, $scope.fatturaCopy);
	}
	
	$scope.elimina = function() {
		$scope.fattura.$del('self').then(function (fattura) {load()});
	}

	load();
})
;