function WelcomeController($scope, $rootScope, $http, $location, config, TransferService) {

	var testData;
	$scope.test = {}
	$scope.startTest = startTest;

	//init
	getTests();

	function getTests() {
		$http.get('data/test.json')
			.success( function(data) {
				testData = data;
				$scope.test = parseTitle(testData.title);
    		})
  			.error(function(data, status, headers, config) {
  				alert('error occurred');
    		});
	}

	function startTest() {
		try {
			TransferService.set( config.STORE_TEST, testData);
			$location.path('questions/0');
		} catch(e) {
			console.log(e);
		}
	}

	function parseTitle(input) {
		var firstBracket = input.search(/\(/);
		return {
			title: input.substr(0, firstBracket),
			descr: input.substr(firstBracket)
		}
	}
}

angular
	.module('QA')
	.controller('WelcomeController', WelcomeController);