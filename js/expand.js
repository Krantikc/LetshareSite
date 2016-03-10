
(function() {

    var expandModule = angular.module('expand', []);

    expandModule.directive('expandModal', function($compile, ExpandService) {
        return {
            scope: true,
            restrict: 'E',
            controller: 'expandButtonController',
            templateUrl: '../partials/expand-modal.html',
            link: function(scope, element) {

                var chartProperties = ExpandService.getChartScope();
                //making a clone of the "Monitor" and/or "Report" anchor elements
                var anchorElement = angular.element(document.getElementById(chartProperties.additionalLinksId)).clone();

                for (var i = 0; i < anchorElement.children().length; i++) {
                    //Adding the ng-click attribute to close the modal as the anchor leads to another page
                    angular.element(anchorElement.children()[i]).attr('ng-click', 'close()');
                    angular.element(anchorElement.children()[i]).removeAttr('ui-sref');
                    angular.element(anchorElement.children()[i]).removeAttr('ng-if');
                }
                //add anchorElement to div class="anchor-space"
                angular.element(element.children()[0].children[3]).append(anchorElement);
                $compile(anchorElement)(scope);

            }
        };
    });

    /**
     * The controller sets the scope properties that are used by the cloned chart for expansion, plus some few functions
     * for modal related operations
     */
    expandModule.controller('expandButtonController', ['$scope', 'svLocale', 'ExpandService', 'ChartSeriesService',
        '$sce', function($scope, svLocale, ExpandService, ChartSeriesService, $sce) {
            var scopeElements = ExpandService.getChartScope();
            var modalInst = ExpandService.modal();

            $scope.svLocale = svLocale;

            $scope.title = $sce.trustAsHtml(scopeElements.title);
            $scope.exportTitle = scopeElements.exportTitle;
            $scope.hideChartTitle = true;
            $scope.chartStyle = scopeElements.chartStyle;
            $scope.chartStyleLocked = scopeElements.chartStyleLocked;
            $scope.type = 'clone';
            $scope.clonedType = scopeElements.type;
            $scope.url = scopeElements.url;

            $scope.period = scopeElements.period;
            $scope.updateInterval = -1;
            $scope.yAxisTitle = scopeElements.yAxisTitle;
            $scope.seriesColors = scopeElements.seriesColors;

            $scope.data = [];
            $scope.autoUpdate = true;
            $scope.capacityLine = scopeElements.capacityLine;
            $scope.noLegend = scopeElements.noLegend;
            $scope.legendAlignment = 'right';
            $scope.lineWidth = scopeElements.lineWidth;

            $scope.plotAreaBorderWidth = scopeElements.plotAreaBorderWidth;
            $scope.plotAreaBorderColor = scopeElements.plotAreaBorderColor;
            $scope.resultSubset = scopeElements.resultSubset;
            $scope.helpContentKey = scopeElements.helpContentKey;

            if (scopeElements.chartStyle === 'pie') {
                $scope.seriesData = $scope.data = scopeElements.data;
            } else {
                $scope.data = scopeElements.data;
                $scope.seriesData = scopeElements.chart.series;
            }

            $scope.close = function() {
                ExpandService.close();
                ChartSeriesService.disableCloningBroadcast();
            };

            //stop the data broadcast service of the chart being expanded (not the cloned chart) when clicking outside
            //the modal which initiates the modal closure.
            modalInst.result.finally(function() {
                ChartSeriesService.disableCloningBroadcast();
            });

            $scope.legendTitle = '';
            $scope.legendType = 'bandwidth';
            $scope.legendModel = [];
            $scope.removeLegendLinks = false;
            $scope.toDisable = [];
            $scope.toDisableLegend = [];

            if (scopeElements.legendBarId) {
                var legendBarElement = angular.element(document.getElementById(scopeElements.legendBarId)).clone();
                $scope.legendBarScope = legendBarElement[0].attributes;
                $scope.legendTitleNode = $scope.legendBarScope.getNamedItem('title');
                $scope.legendTypeNode = $scope.legendBarScope.getNamedItem('type');

                if ($scope.legendTitleNode && $scope.legendTitleNode.value) {
                    $scope.legendTitle = $scope.legendTitleNode.value;
                }

                if ($scope.legendTypeNode && $scope.legendTypeNode.value) {
                    $scope.legendType = $scope.legendTypeNode.value;
                }

                $scope.legendModel = scopeElements.chartData;

                $scope.chartUpdate = function(legendEntry) {
                    var index = $scope.toDisable.indexOf(legendEntry.value.replace(/ /g, '-'));
                    var selectElement = angular.element(legendEntry.element.srcElement);
                    if (index === -1) {
                        $scope.toDisable.push(legendEntry.value.replace(/ /g, '-'));
                        selectElement.toggleClass('sv-toggle-text-color');
                    } else {
                        $scope.toDisable.splice(index, 1);
                        selectElement.toggleClass('sv-toggle-text-color');
                    }
                };

                if (scopeElements.disabledSeries.length > 0) {
                    $scope.toDisableLegend = scopeElements.disabledSeries;
                }
            }
        }
    ]);

    /**
     * Provides service for modal initiating and closure, plus gives access to scope of the chart to be expanded/cloned
     */
    expandModule.service('ExpandService', ['$modal', function($modal) {

        var instanceChartScope = '';
        this.getChartScope = function() {
            return instanceChartScope;
        };

        var modalInstance = {};

        this.open = function(animationEnabled, chartScope) {
            modalInstance = $modal.open({
                animation: animationEnabled,
                template: '<expand-modal></expand-modal>',
                windowClass: 'sv-expand-modal',
                resolve: {
                    chartScope: function() {
                        instanceChartScope = chartScope;
                    }
                }
            });
        };

        this.close = function() {
            modalInstance.close();
        };

        this.modal = function() {
            return modalInstance;
        };
    }]);

}());
