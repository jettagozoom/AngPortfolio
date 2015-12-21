var portfolioApp = angular.module('JohnMarksPortfolio', ['ngRoute', 'ngSanitize', 'ngTouch', 'ngAnimate'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/work", {
        templateUrl: "./views/work/work.html",
        controller: 'WorkCtrl'
    })
        .when("/", {
            redirectTo: "/work"
        })
        .when("/experience", {
            templateUrl: "./views/experience/experience.html",
            controller: 'ExperienceCtrl'
        })
        .when("/skills", {
            templateUrl: "./views/skills/skills.html",
            controller: 'SkillsCtrl'
        })
        // Use for Newton single-line iframe careers pages
        .when("/careers", {
            templateUrl: "./views/careers/careers.html",
            controller: 'CareersCtrl'
        })
        // Use for Newton hosted careers pages
        //.when("/careers", {
        //    template : "<div</div>",
        //    controller : function() {
        //        window.location.replace("http://192.168.56.101/career/CareerHome.action?clientId=8a80838f4f51d8b0014f525b120e000b");
        //    }
        //})
        .otherwise({redirectTo: '/'});
}])

.controller('main', ['$rootScope', '$scope', function ($rootScope, $scope) {
    var mobileDeviceUAStr = "",
        mobileDeviceMQStr = "",
        isMobileDeviceUA = false,
        isMobileDeviceMQ = false,
        mqOrientation = window.matchMedia( "(orientation: portrait)" ),
        mqOrientationStr = mqOrientation.matches ? "Portrait" : "Landscape",
        mq = window.matchMedia("screen and (max-device-width:480px) and (-webkit-min-device-pixel-ratio: 1.1) and (-webkit-max-device-pixel-ratio: 4)");

    $scope.showSummaries = false;
    $scope.isMobileDeviceUA = "";
    $scope.toggleSummaries = function () {
        $scope.showSummaries = !$scope.showSummaries;
        $rootScope.$broadcast('showSummaries', $scope.showSummaries);
    };

    $scope.headerPic = function () {
        if ($rootScope.selectedPage === 'work') {
            return 'bc';
        } else if ($rootScope.selectedPage === 'experience') {
            return 'de-rosa';
        } else if ($rootScope.selectedPage === 'skills') {
            return 'downy';
        }
    };

    $scope.toggleHamburger = function($event) {
        var mobileLinks = document.getElementsByClassName('mobile-links')[0];
        mobileLinks.classList.toggle('expand');
        $event.stopPropagation();
    };
    $scope.closeMobileMenu = function($event) {
        var mobileLinks = document.getElementsByClassName('mobile-links')[0];
        mobileLinks.classList.remove('expand');
    };

    function init() {
        mqOrientation.addListener(isMobileUsingMediaQuery);
        $scope.isMobileDeviceMQ = isMobileUsingMediaQuery(mqOrientation);
        $scope.isMobileDeviceUA = isMobileUsingUserAgent();
    }

    function isMobileUsingMediaQuery(mqO) {
        var dimensions = computeDimensionsStr(),
            mqOrientationStr = mqO.matches ? "Portrait" : "Landscape",
            mq = window.matchMedia("screen and (max-device-width:480px) and (-webkit-min-device-pixel-ratio: 1.1) and (-webkit-max-device-pixel-ratio: 4)");

        dimensions += "; Orientation=" + mqOrientationStr;
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.mobileDeviceMQStr = dimensions;
            })
        }, 1000);
        return mq.matches;
    }

    function computeDimensionsStr() {
        var scrW = screen.width,
            scrH = screen.height,
            layoutViewportW = document.documentElement.clientWidth,
            layoutViewportH = document.documentElement.clientHeight,
            visualViewportW = window.innerWidth,
            visualViewportH = window.innerHeight,
            htmlW = document.documentElement.offsetWidth,
            htmlH = document.documentElement.offsetHeight,
            mqPixelRatio1 = window.matchMedia( "(-webkit-max-device-pixel-ratio: 1)" ),
            mqPixelRatio2 = window.matchMedia( "(-webkit-min-device-pixel-ratio: 1.1) and (-webkit-max-device-pixel-ratio: 4)" ),
            mqPixelRatio5 = window.matchMedia( "(-webkit-min-device-pixel-ratio: 4.01)" ),
            mqPixelRatioStr = "";

        if (mqPixelRatio1.matches) {
            mqPixelRatioStr = "PixelRatio = 1";
        } else if (mqPixelRatio2.matches) {
            mqPixelRatioStr = "PixelRatio = 1.1 - 4";
        } else if (mqPixelRatio5.matches) {
            mqPixelRatioStr = "PixelRatio > 4";
        }

        var info = "Device info: screen width=" + scrW + " & height=" + scrH +
               "; LayoutViewport width=" + layoutViewportW + " & height=" + layoutViewportH +
               "; VisualViewport width=" + visualViewportW + " & height=" + visualViewportH +
               "; <html> width=" + htmlW + " & height=" + htmlH +
               "; " + mqPixelRatioStr;

        return info;
    }

    function isMobileUsingUserAgent() {
        var str = navigator.userAgent || navigator.vendor || window.opera;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(str) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(str.substr(0, 4))) {
            $scope.mobileDeviceUAStr = str;
            return true;
        }
        $scope.mobileDeviceUAStr = str;
        return false;
    }


    init();
}])

.directive('tooltip', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).tooltip({delay: {'show': 1000, 'hide': 100}, placement: attrs.placement});
        }
    };
}]);

