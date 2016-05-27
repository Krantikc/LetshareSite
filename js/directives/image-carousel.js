angular.module('Letshare').directive('imageCarousel', function() {
    return {
        restrict: 'AEC',
        templateUrl: 'partials/image-carousel.html',
        controller: function($scope) {

        },
        link: function($scope, $element, attr) {
            $(".img-block").fadeOut(2).fadeIn(700);
            
            $scope.startSlider = function() {
	             var options = {
	                 $AutoPlay: true,
	                 $DragOrientation: 3,  
	                 $PauseOnHover: 0,
	                 $ArrowNavigatorOptions: {                       //[Optional] Options to specify and enable arrow navigator or not
	                     $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
	                     $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
	                     $AutoCenter: 2,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
	                     $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
	                 },
                    $ThumbnailNavigatorOptions: {
                        $Class: $JssorThumbnailNavigator$,              //[Required] Class to create thumbnail navigator instance
                        $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always

                        $SpacingX: 23,                                   //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
                        $SpacingY: 23,                                   //[Optional] Vertical space between each thumbnail in pixel, default value is 0
                        $DisplayPieces: 7,                              //[Optional] Number of pieces to display, default value is 1
                        $ParkingPosition: 219                           //[Optional] The offset position to park thumbnail
                    },
                     /*
	                 $BulletNavigatorOptions: {                                //[Optional] Options to specify and enable navigator or not
	                     $Class: $JssorBulletNavigator$,                       //[Required] Class to create navigator instance
	                     $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
	                     $ActionMode: 1,                                 //[Optional] 0 None, 1 act by click, 2 act by mouse hover, 3 both, default value is 1
	                     $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
	                     $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
	                     $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
	                     $SpacingX: 20,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
	                     $SpacingY: 10,                                   //[Optional] Vertical space between each item in pixel, default value is 0
	                     $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
	                 },*/
	                 $SlideshowOptions: {
	                     $Class: $JssorSlideshowRunner$,
	                     $TransitionsOrder: 1,
	                     $ShowLink: true
	                 }
	             };
	             $scope.imageSlider = new $JssorSlider$(attr.id, options);
	             //$scope.scaleSlider();
	             
	        };
            //$scope.startSlider();
            //$scope.imageSlider.$GoTo(2);
        },
        scope: {
            data: '=data' 
        },
        replace: true
    }
    
});
