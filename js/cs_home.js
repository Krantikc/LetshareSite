
angular.module('CloudServices').controller('HomeController', ['$scope', '$http', 
    function($scope, $http) {

  var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 22
  }),
  latlng = L.latLng(12.9727132, 77.5172028);

var map = L.map('map', {
  center: latlng,
  zoom: 14,
  layers: [tiles]
});

var geojsonPath = 'data/data.json',
  tileServer = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileAttribution = 'Map data: <a href="http://openstreetmap.org">OSM</a>',
  rmax = 50;

var markerclusters = L.markerClusterGroup({
  maxClusterRadius: 2 * rmax,
  iconCreateFunction: defineClusterIcon
});
map.addLayer(markerclusters);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialize the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  },
  draw: {
    polyline: false,
    polygon: false,
    rectangle: false,
    marker: false
  }
});
map.addControl(drawControl);

map.on('draw:created', function(e) {
  var type = e.layerType,
    layer = e.layer;

  if (type === 'circle') {
    var latLng = e.layer.getLatLng();
    var latitude = latLng.lat;
    var longitude = latLng.lng;
    var radius = e.layer.getRadius();

    console.log('Latitude: ' + latitude);
    console.log('Longitude: ' + longitude);
    console.log('Radius: ' + radius);
  }
  drawnItems.addLayer(layer);
});

map.on('draw:edited', function(e) {
  var layers = e.layers;
  layers.eachLayer(function(layer) {
    var latLng = layer.getLatLng();
    var latitude = latLng.lat;
    var longitude = latLng.lng;
    var radius = layer.getRadius();

    console.log('Latitude: ' + latitude);
    console.log('Longitude: ' + longitude);
    console.log('Radius: ' + radius);
  });
});

function getAvgBandwidth(devices) {
    var totalBandwidth = 0;
    for (var i in devices) {
        totalBandwidth = totalBandwidth + devices[i].bandwidth;
    }
    return (totalBandwidth/devices.length);
}

var availableTypes = ['Router', 'Mobile'];
var HEALTH_CATEGORIES = [{
    name: 'Poor',
    value: 0,
    range: [0, 60]
},{
    name: 'Medium',
    value: 1,
    range: [60, 120]
},{
    name: 'Good',
    value: 2,
    range: [120]
}];

/**
 * Based on Average Bandwidth of device type, Health is calculated by accepting health health categories values
 */
function getDeviceTypeHealth (deviceAvgBandwidth) {
    var deviceTypeHealth = {};
    for (var i in HEALTH_CATEGORIES) {
        var range = HEALTH_CATEGORIES[i].range;
        if (deviceAvgBandwidth > range[0] && (!range[1] || deviceAvgBandwidth <= range[1])) { 
            deviceTypeHealth = HEALTH_CATEGORIES[i];
            return deviceTypeHealth;
        }
    }
}


// Load the geojson
d3.json(geojsonPath, function(error, response) {
  if (!error) {
    var markers = L.markerClusterGroup();
   
    $.each(response.data, function(index, place) {
        var n = 0;
        var totalDeviceCount = place.deviceCount;
        var types = place.types;
        var deviceType = {};
        var deviceTypesList = [];
        $.each(types, function(i, type) {
            
            var totalBandwidth = 0;
            
            var avgBandwidth =  getAvgBandwidth(type.devices);
            deviceType = {
                name: type.name,
                deviceCount: type.devices.length,
                deviceAvgBandwidth: avgBandwidth
            }
            deviceTypesList.push(deviceType);
            n = n + type.devices.length;
        });

 
        var strokeWidth = 1; //Set clusterpie stroke width
        var r = rmax - 2 * strokeWidth - (n < 10 ? 12 : n < 100 ? 8 : n < 1000 ? 4 : 0); //Calculate clusterpie radius...
        var iconDim = (r + strokeWidth) * 2; //...and divIcon dimensions
        var data = [{
            options: deviceTypesList
        }];
        var typeHtml = renderAster({
          data: deviceTypesList,
          categoriesLength: HEALTH_CATEGORIES.length,
          valueFunc: function(d) {      
            return d.deviceCount;
          },
          strokeWidth: 1,
          outerRadius: r,
          innerRadius: r - 30,
          pieClass: 'cluster-pie',
          pieLabel: totalDeviceCount ,
          pieLabelClass: 'marker-cluster-pie-label',
          pathClassFunc: function(d) {
            return "category-" + d.data.name;
          },
          pathTitleFunc: function(d) {
            return d.data.deviceCount + ' device' + (d.data.deviceCount != 1 ? 's' : '') + ' of ' + d.data.name;
          }
        });
        var typeIcon = L.divIcon({html: typeHtml});
        markerclusters.addLayer(
            L.marker(
                [place.latitude, place.longitude], 
                {deviceCount: place.deviceCount, types: place.types, icon: typeIcon} /* added 29-12-2015 */
            )
        );
    });
    map.addLayer(markerclusters);
  } else {
    console.log('Could not load data...');
  }
});



function defineClusterIcon(cluster) {
  var children = cluster.getAllChildMarkers();
    var n = 0; //Get number of markers in cluster
    $.each(children, function(index, type) {
        n = n + type.options.deviceCount;
    });
    var strokeWidth = 1; //Set clusterpie stroke width
    var r = rmax - 2 * strokeWidth - (n < 10 ? 12 : n < 100 ? 8 : n < 1000 ? 4 : 0); //Calculate clusterpie radius...
    var iconDim = (r + strokeWidth) * 2; //...and divIcon dimensions
    var data = d3.nest() //Build a dataset for the pie chart
    .entries(children, d3.map);

    

    //render some svg markup
    var distinct = [];
    var asterData = {};
    for (var i in availableTypes) {
        asterData[availableTypes[i]] = [];
    }   
    
    for (var j in data) {
        var types = data[j].options.types;
        for (var k in types) {
            asterData[types[k].name] = asterData[types[k].name].concat(types[k].devices);
        }
    }
        
    for (var m in availableTypes) {
        var devices = asterData[availableTypes[m]];
        var avgBandwidth = getAvgBandwidth(devices);
        var distictType = {
            name: availableTypes[m],
            devices: asterData[availableTypes[m]],
            deviceAvgBandwidth: avgBandwidth
        }
        distinct.push(distictType);
    }

    var deviceCount = 0;
    var html = renderAster({
      data: distinct,
      categoriesLength: 3,
      valueFunc: function(d) {
        return d.devices.length;
      },
      strokeWidth: 1,
      outerRadius: r,
      innerRadius: r - 30,
      pieClass: 'cluster-pie',
      pieLabel: n,
      pieLabelClass: 'marker-cluster-pie-label',
      pathClassFunc: function(d) {
        return "category-" + d.name;
      },
      pathTitleFunc: function(d) {
        return d.data.devices.length + ' device' + (d.data.devices.length!= 1 ? 's' : '') + ' of ' + d.data.name;
      }
    });
    //Create a new divIcon and assign the svg markup to the html property
    var myIcon = new L.DivIcon({
      html: html,
      className: 'marker-cluster',
      iconSize: new L.Point(iconDim, iconDim)
    });
  return myIcon;
}

/*function that generates a svg markup for the aster chart*/
function renderAster(options) {
  /*data and valueFunc are required*/
  
  /*var COLORS = {
      'Router': '#00FA9A',
      'Mobile': '#191970',
      'Network': '#8A2BE2',
      'Camera': '#F4A460',
      'Other': '#BC8F8F'
  } */
  var COLORS = ['#00FA9A', '#191970', '#8A2BE2', 'rgb(71, 118, 180)', '#F4A460', '#BC8F8F', '#B0C4DE', '#DCDCDC', '#FFB6C1', '#BA55D3'];
  if (!options.data || !options.valueFunc) {
    return '';
  }
  var data = options.data,
    valueFunc = options.valueFunc,
    r = options.outerRadius ? options.outerRadius : 58, //Default outer radius = 28px
    rInner = options.innerRadius ? options.innerRadius : r - 30, //Default inner radius = r-10
    strokeWidth = options.strokeWidth ? options.strokeWidth : 1, //Default stroke is 1
    pathClassFunc = options.pathClassFunc ? options.pathClassFunc : function() {
      return '';
    }, //Class for each path
    pathTitleFunc = options.pathTitleFunc ? options.pathTitleFunc : function() {
      return '';
    }, //Title for each path
    pieClass = options.pieClass ? options.pieClass : 'marker-cluster-pie', //Class for the whole pie
    pieLabel = options.pieLabel ? options.pieLabel : d3.sum(data, valueFunc), //Label for the whole pie
    pieLabelClass = options.pieLabelClass ? options.pieLabelClass : 'marker-cluster-pie-label', //Class for the pie label
    categoriesLength = options.categoriesLength,
    asterSegmentScale = (100/categoriesLength),
    categoriesHealth = options.categoriesHealth,
    origo = (r + strokeWidth), //Center coordinate
    w = origo * 2, //width and height of the svg element
    h = w,
    donut = d3.layout.pie(),
    arc = d3.svg.arc().innerRadius(rInner).outerRadius(function(d) {
      var avgBwd = d.data.deviceAvgBandwidth;
      var health = getDeviceTypeHealth(avgBwd);
      return (r - rInner) * ((asterSegmentScale * (health.value + 1)) / 100) + rInner;
    }),
    outlineArc = d3.svg.arc()
    .innerRadius(rInner)
    .outerRadius(r);

  //Create an svg element
  var svg = document.createElementNS(d3.ns.prefix.svg, 'svg');
  //Create the pie chart
  var vis = d3.select(svg)
    .data([data])
    .attr('class', pieClass)
    .attr('width', w)
    .attr('height', h);
    
    /*
var donutValues = function(value) {
    var values = {'Mobile':0, 'Network': 0, 'Camera': 0, 'Router': 0, 'Other': 0};
    $.each(data, function(i, type) {
        values[type.name] = values[type.name] + type.deviceCount;
    });
    
}
*/
  var arcs = vis.selectAll('g.arc')
    .data(donut.value(valueFunc))
    .enter().append('svg:g')
    .attr('class', 'arc')
    .attr('transform', 'translate(' + origo + ',' + origo + ')');



  arcs.append('svg:path')
    .attr('class', pathClassFunc)
    .attr("fill", function(d, i) {
      return COLORS[i];
    })
    .attr('stroke-width', strokeWidth)
    .attr('d', arc)
    .append('svg:title')
    .text(pathTitleFunc);

  arcs.append('svg:path')
    .attr('class', pathClassFunc)
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr('stroke-width', strokeWidth)
    .attr('d', outlineArc)
    .append('svg:title')
    .text(pathTitleFunc);



  vis.append('text')
    .attr('x', origo)
    .attr('y', origo)
    .attr('class', pieLabelClass)
    .style('font-weight', 'bold')
    .attr('text-anchor', 'middle')
    //.attr('dominant-baseline', 'central')
    .attr('dy', '.3em')
    .text(pieLabel);

  //////////////

  //Return the svg-markup rather than the actual element
  return serializeXmlNode(svg);
}


/*Helper function*/
function serializeXmlNode(xmlNode) {
  if (typeof window.XMLSerializer != "undefined") {
    return (new window.XMLSerializer()).serializeToString(xmlNode);
  } else if (typeof xmlNode.xml != "undefined") {
    return xmlNode.xml;
  }
  return "";
}
    }
]);