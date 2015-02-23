function QuestionsController($scope, $location, $routeParams, $interval, config, TransferService) {

	var questionIndex = parseInt($routeParams.question) || 0;
	var testData = TransferService.get(config.STORE_TEST); //get all data stored in storage
	if (!testData) {
		//redirect to welcome page if there is not test data
		$location.path('welcome');
		return;
	}
	var questionsLength = testData.questions.length;

	$scope.userAnswers = TransferService.get(config.STORE_ANSWERS); //get stored answers
	$scope.question = testData.questions[questionIndex]; // get current question
	$scope.selectedAnswer = $scope.userAnswers[$scope.question.id] || null; //get current answer, this is used if user go back or refresh page
	$scope.currentPercent = 100 / questionsLength * questionIndex; //percent of completed test
	$scope.currentTime = config.QUESTION_TIME; //current time
	$scope.totalTime = config.QUESTION_TIME; //time per question
	$scope.isFinalStep = (questionIndex + 1) === questionsLength; // check for final step

	$scope.nextQuestion = nextQuestion;
	$scope.selectAnswer = selectAnswer;
	$scope.isSelected = isSelected;

	//count seconds
	var timer = $interval(function() {
		$scope.currentTime--;
		if ($scope.currentTime === -1) {
			$interval.cancel(timer);
			$scope.selectedAnswer = $scope.selectedAnswer ? $scope.selectedAnswer : 'TIMEOUT';
			nextQuestion();
		}
	}, 1000);

	function isSelected(answerID) {
		return answerID === $scope.selectedAnswer;
	}

	function selectAnswer(anwerID) {
		$scope.selectedAnswer = anwerID;
	}

	function nextQuestion() {
		if ($scope.selectedAnswer) {

			//clear timer
			$interval.cancel(timer);

			//save answer
			$scope.userAnswers[$scope.question.id] = $scope.selectedAnswer;
			TransferService.set(config.STORE_ANSWERS, $scope.userAnswers);

			questionIndex++;
			var locationURL = 'questions/' + questionIndex;

			//if we are on last question redirect to result page	
			if ($scope.isFinalStep) {
				locationURL = 'result';
			}

			//redirect to the next question page || result page
			$location.path(locationURL);
		}
	}
}

angular
	.module('QA')
	.controller('QuestionsController', QuestionsController);