angular.module('Letshare').controller('HomeController',
    function($scope,  postsAPIService) {
        console.log('Home');
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.categories = [{
            value: 0
        },{
            value: 1
        },{
            value: 2
        }];
        
        $scope.getPosts = function() {
            
            var postData = {
                size: 5
            }
            postsAPIService
                .getPosts(postData)
                    .then(function(response) {
                        $scope.postsList = response.data.posts;
                        console.log('success');
                    }, function() {
                      console.error('ERROR');
                    });
              
        };

        $scope.getPosts();
        
    }
);