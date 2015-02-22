function ResultController($scope, $location, config, TransferService) {

	var testData = TransferService.get( config.STORE_TEST );
	var userAnswers = TransferService.get( config.STORE_ANSWERS );
	var solution = testData.solution;

	$scope.totalScore = 0;
	$scope.startAgain = startAgain
	
	angular.forEach(solution, function( result, questionID ) {
		var value = result.value;
		var percent = result.answers[ userAnswers[questionID] ] || 0;
		var points = ( value / 100 ) * percent;
		$scope.totalScore += points;
	});
	
	function startAgain() {
		//clear stored answers
		TransferService.set(config.STORE_ANSWERS, {} );
		$location.path('questions/0');
	}
}

angular
	.module('QA')
	.controller('ResultController', ResultController);