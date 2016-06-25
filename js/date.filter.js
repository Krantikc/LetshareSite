
angular.module('Letshare').filter('dateFormat',
    function() {
        
        return function(input) {
            var filteredDate;

            filteredDate = new Date(input);

            var dateString = filteredDate.toUTCString();

            return dateString.substr(5, 17);
        }


    });