/**
 * Created by chenxianpao on 2017/5/30.
 */
(function () {
    'use strict';
    angular.module('DailyReport', ['ui.bootstrap'])
        .controller('dashboardCtrl', dashboardCtrl)
        .controller('writeReportCtrl', writeReportCtrl);

    /** @ngInject */
    function dashboardCtrl($scope, $uibModal) {
        //alert("aaa");
        var DailyReport = Bmob.Object.extend("DailyReport");
        var query = new Bmob.Query(DailyReport);
        //$scope.reportList = [];
        // $scope.test = [
        //     {"teacher":"Tom","student":[{"name":"stuA","project":"projectA"},
        //         {"name":"stuB","project":"projectB"}]},
        //     {"teacher":"Jerry","student":[{"name":"stuC","project":"projectC"},
        //         {"name":"stuD","project":"projectD"},{"name":"stuE","project":"projectE"}]},
        //     {"teacher":"Lee","student":[{"name":"stuF","project":"projectF"}
        //     ]}
        // ];
        // console.log($scope.test)
        // $scope.myObj = {
        //     "Name" : "Alfreds Futterkiste",
        //     "Country" : "Germany"};
        // $scope.reportaaa = [{
        //     "user" : "jtt",
        //     "tasks" : [{"type": "1", "content": "2", "percent": "12"}]}];
        // 查询所有数据
        query.find({
            success: function(results) {
                //alert("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                //var user_list = new Set();
                $scope.reportList = [];
                var tmp_list = [];
                for (var i = 0; i < results.length; i++) {
                    var tmp = results[i];
                    // $scope.reportList.push({"user": object.get('user'), "type": object.get('tasktype'),
                    //     "content": object.get('content'), "percent": object.get('percent')});
                    // $scope.reportList[tmp.get('user')] = [];
                    tmp_list[tmp.get('user')] = [];
                    //user_list.add(tmp.get('user'));
                    //$scope.reportList.add({"user": tmp.get('user'), "tasks": []});
                }
                for (var j = 0; j < results.length; j++) {
                    var object = results[j];
                    tmp_list[object.get('user')].push({"type": object.get('tasktype'),
                        "content": object.get('content'), "percent": object.get('percent')});
                    // $scope.reportList.push({"user": object.get('user'), "type": object.get('tasktype'),
                    //     "content": object.get('content'), "percent": object.get('percent')});
                    // $scope.reportList[object.get('user')].push({"type": object.get('tasktype'),
                    //     "content": object.get('content'), "percent": object.get('percent')});
                }
                for (var k in tmp_list) {
                    $scope.reportList.push({"user": k, "tasks": tmp_list[k]});
                }

                console.log($scope.reportList);
                $scope.$digest();
                //window.location.reload();
                //$scope.reportaaa = angular.copy($scope.reportList);
            },
            error: function(error) {
                alert("查询失败: " + error.code + " " + error.message);
            }
        });
        function getlist() {
            console.log($scope.reportList);
        }
        setInterval(getlist, 1000);
        $scope.writeReport = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/components/writereport.html',
                controller: writeReportCtrl
                // resolve: {
                //     items: function () {
                //         return $scope.items;
                //     }
                // }
            });
            modalInstance.opened.then(function () {
               console.log('modal is opened');
            });
            // modalInstance.result.then(function (result) {
            //     console.log(result);
            // }, function (reason) {
            //     console.log(reason);
            // });
        };

        // var WriteReportCtrl = function ($scope, $uibModalInstance) {
        //     $scope.taskprocess = 0;
        //     $scope.taskcontent = "";
        //     $scope.tasktype = "";
        //     $scope.tasktype_list = ["develop", "test"];
        //
        //     $scope.write = function () {
        //         console.log($scope.taskprocess, $scope.taskcontent, $scope.tasktype);
        //         var DailyReport = Bmob.Object.extend("DailyReport");
        //         var dailyReport = new DailyReport();
        //         dailyReport.set("user", "ccc");
        //         dailyReport.set("tasktype", $scope.tasktype);
        //         dailyReport.set("content", $scope.taskcontent);
        //         dailyReport.set("percent", $scope.taskprocess);
        //         dailyReport.save(null, {
        //             success: function(object) {
        //                 alert("create object success, object id:"+object.id);
        //             },
        //             error: function(model, error) {
        //                 alert("create object fail");
        //             }
        //         });
        //         $uibModalInstance.close();
        //     };
        //     $scope.cancel = function () {
        //         //$uibModalInstance.close();
        //         $uibModalInstance.dismiss('cancel');
        //     };
        // };
    }

    //angular.module('DailyReport', ['ui.router', 'ui.bootstrap'])

    function writeReportCtrl($scope, $uibModalInstance) {
        $scope.taskprocess = 0;
        $scope.taskcontent = "";
        $scope.tasktype = "";
        $scope.tasktype_list = ["develop", "test"];

        $scope.write = function () {
            console.log($scope.taskprocess, $scope.taskcontent, $scope.tasktype);
            var DailyReport = Bmob.Object.extend("DailyReport");
            var dailyReport = new DailyReport();
            dailyReport.set("user", "ccc");
            dailyReport.set("tasktype", $scope.tasktype);
            dailyReport.set("content", $scope.taskcontent);
            dailyReport.set("percent", $scope.taskprocess);
            dailyReport.save(null, {
                success: function(object) {
                    alert("create object success, object id:"+object.id);
                },
                error: function(model, error) {
                    alert("create object fail");
                }
            });
            $uibModalInstance.close();
        };
        $scope.cancel = function () {
            //$uibModalInstance.close();
            $uibModalInstance.dismiss('cancel');
        };
    }
})();