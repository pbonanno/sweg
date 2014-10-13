angular.module('app', ['ngRoute'])
	.config(function ($routeProvider) {
		'use strict';
		$routeProvider.when('/', {
			controller: 'TodoCtrl',
			templateUrl: 'todomvc-index.html'
		}).when('/:status', {
			controller: 'TodoCtrl',
			templateUrl: 'todomvc-index.html'
		}).otherwise({
			redirectTo: '/'
		});
}).controller('MainCtrl', function($scope) {
	$scope.righe = [
	        	    {id:1, descrizione: "riga 1", quantita: 122},            
	        	    {id:2, descrizione: "riga 2", quantita: 122},            
	        	    {id:3, descrizione: "riga 3", quantita: 122},            
	        	    {id:4, descrizione: "riga 4", quantita: 122},            
	        	    {id:5, descrizione: "riga 5", quantita: 122}         
	        	    ];
});