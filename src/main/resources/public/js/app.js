'use strict';
angular.module('app', ['ngRoute', 'ngResource', 'angular-hal'])
//	.config(function ($routeProvider, HateoasInterceptorProvider) {
//		HateoasInterceptorProvider.transformAllResponses();
//		$routeProvider.when('/', {
//			controller: 'TodoCtrl',
//			templateUrl: 'todomvc-index.html'
//		}).when('/:status', {
//			controller: 'TodoCtrl',
//			templateUrl: 'todomvc-index.html'
//		}).otherwise({
//			redirectTo: '/'
//		});
//})
.controller('MainCtrl', function($scope, $resource, halClient) {
	var api = halClient.$get('api/fattura', {'id' : 0})
//    .then( function( api ) {
//        return api.$get('fattura', {'id' : 0});
//    })
    .then(function(testata) {
    	$scope.testata = testata;
    	
    	return testata;
    })
//    .then(function(testata) {
//    	$scope.righe = testata.$get('righe');
//    })
    ;
	
//	$scope.righe = [
//	        	    {id:1, descrizione: "riga 1", quantita: 122},            
//	        	    {id:2, descrizione: "riga 2", quantita: 122},            
//	        	    {id:3, descrizione: "riga 3", quantita: 122},            
//	        	    {id:4, descrizione: "riga 4", quantita: 122},            
//	        	    {id:5, descrizione: "riga 5", quantita: 122}         
//	        	    ];
});