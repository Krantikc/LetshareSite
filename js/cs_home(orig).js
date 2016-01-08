
angular.module('CloudServices').controller('HomeController', ['$scope', '$http', 'uiGmapGoogleMapApi', 
    function($scope, $http, uiGmapGoogleMapApi) {
        var center = new google.maps.LatLng(59.9214, 10.8463);
        $scope.options = {
            scrollwheel: false
        };
        $scope.drawingManagerOptions = {
            drawingMode: google.maps.drawing.OverlayType.CIRCLE,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.CIRCLE
                ]
            },
            circleOptions: {
                fillColor: '#000000',
                fillOpacity: 0.7,
                strokeWeight: 1,
                clickable: false,
                editable: true,
                draggable: true,
                zIndex: 5
            }
        };
        $scope.markersAndCircleFlag = true;
        $scope.drawingManagerControl = {};
        $scope.clearSelections = function() {
            angular.forEach($scope.overlays, function(shape) {
                shape.setMap(null);
            });
        };

        $scope.initMap = function() {
            var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                maxZoom: 18
            });
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: center,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                layers: [tiles]
            });
           
            //Custom radius and icon create function
            var markers = L.markerClusterGroup({
                maxClusterRadius: 120,
                iconCreateFunction: function (cluster) {
                    var markers = cluster.getAllChildMarkers();
                    var n = 0;
                    for (var i = 0; i < markers.length; i++) {
                        n += markers[i].number;
                    }
                            var divIcon = L.divIcon({ html: '<div class="mark">hi</div>', className: 'mycluster', iconSize: L.point(100, 100) });
                           
                    return divIcon;
                },
                //Disable all of the defaults:
                spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false
            });

     
            function populate() {
                for (var i = 0; i < 100; i++) {
                    var m = L.marker(getRandomLatLng($scope.map), { title: i });
                    m.number = i;
                    markers.addLayer(m);
                }
                return false;
            }
            function populateRandomVector() {
                for (var i = 0, latlngs = [], len = 20; i < len; i++) {
                    latlngs.push(getRandomLatLng($scope.map));
                }
                var path = L.polyline(latlngs);
                $scope.map.addLayer(path);
            }
            function getRandomLatLng(map) {
                var bounds = map.getBounds(),
                    southWest = bounds.getSouthWest(),
                    northEast = bounds.getNorthEast(),
                    lngSpan = northEast.lng - southWest.lng,
                    latSpan = northEast.lat - southWest.lat;

                return L.latLng(
                        southWest.lat + latSpan * Math.random(),
                        southWest.lng + lngSpan * Math.random());
            }

            populate();
            $scope.map.addLayer(markers);



            var shownLayer, polygon;

            function removePolygon() {
                if (shownLayer) {
                    shownLayer.setOpacity(1);
                    shownLayer = null;
                }
                if (polygon) {
                    $scope.map.removeLayer(polygon);
                    polygon = null;
                }
            };

            $scope.map.on('zoomend', removePolygon);

        };
    
        $scope.overlays = [];
        var drawingManager = new google.maps.drawing.DrawingManager();
        drawingManager.setOptions($scope.drawingManagerOptions);
        // Loading the drawing Tool in the Map.
        drawingManager.setMap($scope.map);

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
            if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
                console.log('complete');
                var radius = event.overlay.getRadius();
                var circleCenter = event.overlay.getCenter();
                var latitude = circleCenter.lat();
                var longitude = circleCenter.lng();

                console.log('Radius: ' + radius);
                console.log('Latitude: ' + latitude + ', Longitude: ' + longitude);
                var newShape = event.overlay;
                $scope.overlays.push(newShape);
            }
        });
        
        $scope.initMap();
        Aster.renderAster('.mark');
    }
]);