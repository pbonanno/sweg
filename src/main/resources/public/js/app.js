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
	halClient.$post("/api/righe", null, {
        "riga": 100,
        "descrizione": "Riga 100",
        "quantita": 0,
        "prezzoUnitario": 10,
        "iva": 22,
        "testata": "http://localhost:8080/api/fattura/1"
      });


    var a = halClient.$get('api').then( function( api ) {
        return api.$get('fatture').then(function (fattura) {
            return fattura.$get('fatture').then(function (fatture) {
                $scope.fatture = fatture;
            });

        });
    })
    ;
   
//    $scope.detailPage = function(idx) {
//        var id = $scope.fatture[idx].id;
//        console.log(id);
//        $location.path("/detail/"+id);
//    }
    
})

.controller('DetailCtrl', function($scope, $resource, halClient, $routeParams) {
//	var id = $routeParams.id;

//	var fattura = halClient.$get('fattura', {'id': id}).then(function(testata) {
//		$scope.testata = testata;
//		
//		$scope.testata.$get('righe').then(function(righe) {
//			return righe.$get('rigaFattura').then(function(righe) {
//				$scope.righe = righe;
//			});
//		});
//		
//	});
	var href = null;
	
	halClient.$get("api/rigaFattura").then(function(riga) {
		href = riga.$href('self');
	});
	
	var a = halClient.$get('api').then( function( api ) {
        api.$get('fattura').then(function (fattura) {
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
	
	$scope.aggiungiRiga = function() {
		$scope.righe.push({
		      "riga" : 0,
		      "descrizione" : "Riga 0",
		      "quantita" : 0,
		      "prezzoUnitario" : 10.00,
		      "iva" : 22.00
		      });
		
		halClient.createResource(href, {} , {
		      "riga" : 0,
		      "descrizione" : "Riga 0",
		      "quantita" : 0,
		      "prezzoUnitario" : 10.00,
		      "iva" : 22.00
		      })
	};

})
;