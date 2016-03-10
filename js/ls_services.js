angular.module('Letshare').service('svTabsData', [function() {
        var tabs = {
            'home': [
                'devices'
            ]
        };

        this.screen = function(screenId) {
            return tabs[screenId];
        };

        this.getDefaultTabId = function(screenId) {
            return Object.keys(tabs[screenId])[0];
        };
    }
]);
