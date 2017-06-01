/**
 * Created by chenxianpao on 2017/5/30.
 */
(function () {
    'use strict';
    angular.module('DailyReport', ['ui.router', 'ui.bootstrap'])
        .controller('dashboardCtrl', dashboardCtrl);
    // .controller('WriteReportCtrl', WriteReportCtrl)
    /** @ngInject */
    function dashboardCtrl($scope, $uibModal) {
        $scope.writereport = function () {
            console.log("abcin");
            var modalInstance = $uibModal.open({
                templateUrl: 'app/components/writereport.html',
                controller: WriteReportCtrl,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.opened.then(function () {
               console.log('modal is opened'); 
            });
            modalInstance.result.then(function (result) {
                console.log(result);
            }, function (reason) {
                console.log(reason);
            });
        };
        var WriteReportCtrl = function ($scope, $uibModalInstance) {
            $scope.ok = function () {
                $uibModalInstance.close()
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }
        };

    }

    // /** @ngInject */
    // function WriteReportCtrl() {
    //     // $scope.ok = function () {
    //     //     $modalInstance.close()
    //     // };
    //     // $scope.cancel = function () {
    //     //     $modalInstance.dismiss('cancel');
    //     // }
    // }

})();