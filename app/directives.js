function appHeader() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            htitle: '='
        },
        template: '<div class="header">' +
            '<h1 class="header__title">{{ htitle }}</h1>' +
            '<div class="header__actions" ng-transclude></div>' +
            '</div>'
    };
}


function pieCircle() {
    return {
        restrict: 'E',
        scope: {
            pcurrent: '=',
            pmax: '=',
            punit: '@'
        },
        template: '<div class="circle">' +
            '<div class="circle__pie circle__pie--spinner"></div>' +
            '<div class="circle__pie circle__pie--filler"></div>' +
            '<div class="circle__mask"></div>' +
            '<div class="circle__content"></div>' +
            '</div>',
        link: function(scope, element) {
            var divs = element.find('div');
            var wrapper = divs[0];
            var spinner = divs[1];
            var filler = divs[2];
            var mask = divs[3];
            var content = divs[4];

            scope.$watch('pcurrent', function(value) {
                value = parseFloat(value);

                if (value > scope.pmax) {
                    value = scope.pmax;
                }

                if (isNaN(value) || value < 0) {
                    value = 0;
                }

                var deg = (value / parseFloat(scope.pmax)) * 360;

                spinner.style.transform = 'rotate(' + deg + 'deg)';
                filler.style.opacity = deg > 180 ? 1 : 0;
                mask.style.opacity = deg < 180 ? 1 : 0;
                content.textContent = value + scope.punit;
            });
        }
    };
}

angular
    .module('QA')
    .directive('piecircle', pieCircle)
    .directive('appheader', appHeader);