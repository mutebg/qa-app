angular
    .module('QA', [
        'ngRoute',
        'ngAnimate',
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/welcome.html',
                controller: 'WelcomeController',
            })
            .when('/questions/:question', {
                templateUrl: 'app/views/questions.html',
                controller: 'QuestionsController',
            })
            .when('/result', {
                templateUrl: 'app/views/result.html',
                controller: 'ResultController',
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .constant("config", {
        'LOCAL_STORAGE': 'QA',
        'STORE_TEST': 'current_test',
        'STORE_ANSWERS': 'user_anwers',
        'QUESTION_TIME': 20
    });