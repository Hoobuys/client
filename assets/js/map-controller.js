window.geocoder = undefined;
var MAP, polys = [], path, me, my_marker;
var markers = new Array();
var infowindow = undefined;
var zone_markers = [];
var creating_zone = false;
var zones = [];
var in_city = undefined;
var map_in_full = false;
var markerCluster = undefined;
var notifier = new notifications;
    notifier.ini("#noti_globe");


var mcOptions = {styles: [{
height: 53,
url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m1.png",
width: 53
},
{
height: 56,
url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m2.png",
width: 56
},
{
height: 66,
url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m3.png",
width: 66
},
{
height: 78,
url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m4.png",
width: 78
},
{
height: 90,
url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m5.png",
width: 90
}]};






	function getLocation () {

    var options = {
  timeout: 5000,
  maximumAge: 0
};

 geocoder = new google.maps.Geocoder();    

  navigator.geolocation.getCurrentPosition(function(position) {


  		    	var lat = position.coords.latitude;
            var lng = position.coords.longitude;

                   
            var location_info = codeLatLng(lat, lng, function(rs){
            
              ini_map(lat, lng, rs)
            
            });          

  }, function(error) {
   	
        ini_map(9.312411,-75.295546, false);      


  }, options);

}


   function ini_map(lat, lon, loc_inf){

   	 console.log(loc_inf);

    if(loc_inf){

         var search_text = "Buscar Apartamentos en {{city}}";
     search_text = search_text.replace("{{city}}", loc_inf.name);

      ls.setItem("city", loc_inf.name);
      ls.setItem("country", loc_inf.country);

     $("form#search input[name='query']").attr("placeholder", search_text);

    }else
      $("input[name='OnMyLocation']").attr("checked", false).parent().find("a:first").addClass("location-off");
  
me = new google.maps.LatLng(lat, lon);

var mapOptions = {
  zoom: 17,
  center: me,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};



 MAP = new google.maps.Map(document.getElementById('map-canvas'),
  mapOptions);

  var simulator = setInterval( function(){

    simulator_markers();

  }, 4000);

 
  my_marker = new GeolocationMarker(MAP);

  google.maps.event.addListener(MAP, 'zoom_changed', function() {
   
     markerCluster = new MarkerClusterer(MAP, markers, mcOptions);

   });

  google.maps.event.addListener(my_marker, 'position_changed', function() {
 
  var new_location = this.getPosition();
 
  if(new_location){
     
     me = new_location;
     MAP.setCenter(new_location);

     }
     
 });
       

}



function how_to_arrive(){

  var me = new google.maps.DirectionsService();
  drawer = new google.maps.DirectionsRenderer( {'draggable':true} );
  drawer.setMap(MAP);
  
  me.route({ 'origin': wayA.getPosition(), 'destination':  wayB.getPosition(), 'travelMode': google.maps.DirectionsTravelMode.DRIVING},function(rs,sts) {
    if(sts=='OK') drawer.setDirections(rs);  
  });


}


function map_to_full_screen(control, fromControl){

    var w_h = $(window).height();
    
    var top_bar_h = $("header").height();
    var m_h = w_h - top_bar_h;
    var offset = 15;
    console.log(w_h, top_bar_h);
   


    $("#map-canvas").css({height: (m_h - offset ) + "px"});    
    window.scrollH = $(window).scrollTop();

    $("body").addClass("scroll-no");    
    window.scrollTo(0,0);

          if(!control)
      control = $("#map-controls [data-control='FULL_SCREEN']");
         else
           map_in_full = true;

    control.dataControl("NORMAL_SCREEN")
    .title("normal screen")
    .find("i:first")
    .removeClass("zicon-expand")
    .addClass("zicon-contract");
    

}



function map_to_normal_screen(control){
    

    $("#map-canvas").css({height: window.map_normal_h + "px"});

    if(!control)
      control = $("#map-controls [data-control='NORMAL_SCREEN']");
    else
      map_in_full = false;

    $("body").removeClass("scroll-no");
    window.scrollTo(0,window.scrollH);  

    control.dataControl("FULL_SCREEN")
    .title("fullscreen")
    .find("i:first")
    .removeClass("zicon-contract")
    .addClass("zicon-expand");

}


function add_point_zone(event){
 


    path.insertAt(path.length, event.latLng);
   
     

    var marker = new google.maps.Marker({
      position: event.latLng,
      map: MAP,
      draggable: true,
      icon : "assets/img/markers/__zone.png"
    });

    
    zone_markers.push(marker);
    console.log(marker);
    marker.setTitle("#" + path.length);

    google.maps.event.addListener(marker, 'click', function() {
      marker.setMap(null);
      for (var i = 0, I = zone_markers.length; i < I && zone_markers[i] != marker; ++i);
      zone_markers.splice(i, 1);
      path.removeAt(i);
      }
    );

    google.maps.event.addListener(marker, 'dragend', function() {
      for (var i = 0, I = zone_markers.length; i < I && zone_markers[i] != marker; ++i);
      path.setAt(i, marker.getPosition());
      }
    );

}

function zone_controller(){}


function create_zone_in_map(control){

    hideMarkers();
    map_to_full_screen(null, false);
    creating_zone = true;    
    
    path = new google.maps.MVCArray;


      
    var poly = new google.maps.Polygon({
      strokeWeight: 1,
       strokeColor: "#FCDF0A",
    strokeOpacity: 0.99,    
    fillColor: "#005EB2",
    fillOpacity: 0.50
    });

    poly.setMap(MAP);
    poly.setPaths(new google.maps.MVCArray([path]));
    
    window.current_poly = poly;

    google.maps.event.addListener(poly, "click", function(){

       zone_controller();

    });


    google.maps.event.addListener(MAP, 'click', add_point_zone);

    control.dataControl("SAVE_ZONE")
    .title("Guardar zona")
    .find("i:first")
    .removeClass("zicon-radio-checked")
    .addClass("zicon-checkmark");


}


function save_created_zone(control, callback){

        var zone_name = prompt("Ingresa un nombre para tu zona");



      if(zone_name)
        while(!/[a-zA-Z0-9-,. ]/i.test(zone_name) || empty(zone_name))
          zone_name = prompt("Error: nombre de zona no válido, ingresalo nuevamente.");
      else
        {
            window.current_poly.setMap(null);
            remove_zone_of_map();  
            creating_zone = false;
            showMarkers();

          if(!map_in_full)
            map_to_normal_screen();

          control.dataControl("CREATE_ZONE")
          .title("crear zona")
          .find("i:first")
          .removeClass("zicon-checkmark")
          .addClass("zicon-radio-checked");
          google.maps.event.clearListeners(MAP, 'click');


           return false;
        }
       

          polys.push(window.current_poly);
          window.current_poly = undefined;
          var zone = new Object();
          zone.name = zone_name;          
          zone.points = new Array();
          console.log(zone_markers);
          var lat = []; 
          var lng = [];

          for(x in zone_markers){


              lat.push(zone_markers[x].getPosition().lat());
              lng.push(zone_markers[x].getPosition().lng());
              zone.points.push([zone_markers[x].getPosition().lat() , zone_markers[x].getPosition().lng()]);

          }

          zone.min_lat = lat[0];
          zone.max_lat = lat[lat.length-1];
          zone.max_lng = lng[0];
          zone.min_lng = lng[lng.length-1];

          console.log(zone.points);


          poly_info = codeLatLng(zone.points[0][0] , zone.points[0][1], callback_);
        

          
          function callback_(rs){

              zone.city =  rs.name;
               zone.country = rs.country;

              zones.push(zone);
              console.log(zones);

          remove_zone_of_map();

          creating_zone = false;

          showMarkers();
        
          if(!map_in_full)
          map_to_normal_screen(null);

          google.maps.event.clearListeners(MAP, 'click');
          poly_ = (polys.length > 1) ? polys.length - 1 : 0;
          polys[poly_].name = zones[zones.length - 1].name;
       
          alert("Tu nueva zona "+ zones[zones.length - 1].name + " se ha creado!");

          if(callback instanceof Function)
            callback(zones[zones.length - 1]);

          control.dataControl("CREATE_ZONE")
          .title("crear zona")
          .find("i:first")
          .removeClass("zicon-checkmark")
          .addClass("zicon-radio-checked");

          }
          


}


function remove_zone_of_map(){

    for(x in zone_markers)
       zone_markers[x].setMap(null);
     

     //poly.setMap(null);  
     //poly = undefined;       

     zone_markers = [];



}


function map_controls_controller(e){

      prevents(e);

      var _this = $(this);
      var control = _this.dataControl();

     console.log(control);

      switch(control){

        case "FULL_SCREEN":
           map_to_full_screen(_this);
        break;

        case "NORMAL_SCREEN":
            map_to_normal_screen(_this);
        break;

        case "CREATE_ZONE":
            create_zone_in_map(_this);
        break;
        
        case "FILTER_MARKERS":
          filter_results(_this);
          break;       

        case "SAVE_ZONE":
           save_created_zone(_this);
        break;      

        case "REMOVE_ZONE":
           save_created_zone(_this);
        break;      

      }
    

}


function simulator_markers(){

  if(creating_zone)
     return false;

   var lat = me.lat();
   var lon = me.lng();

  if(Math.floor((Math.random()*10)+1)%2 === 0)
   if(Math.floor((Math.random()*10)+1)%2 === 0){

    lat = lat - (Math.random()/1000);
    lon = lon + (Math.random()/1000);
    lat = lat + (Math.random()/1000);



   }else
    {
      lat = lat + (Math.random()/1000);
      lon = lon - (Math.random()/1000);
      lon = lon - (Math.random()/1000);

    }
   else
    if(Math.floor((Math.random()*10)+1)%2 === 0){

    lat = lat + (Math.random()/1000);
      lon = lon - (Math.random()/1000);
      lon = lon - (Math.random()/1000);


   }else
    {
      
       lat = lat - (Math.random()/1000);
    lon = lon + (Math.random()/1000);
    lat = lat + (Math.random()/1000);


    }
    

  marker = new google.maps.Marker({
    map:MAP,
    draggable:false,
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(lat, lon),
    icon: 'assets/img/markers/default.png'
  });

   var content = '<div id="content" style="width:400px">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h3 id="firstHeading" class="firstHeading">Apartamento en altos de rio mar</h3><br />'+
      '<div id="bodyContent">'+
      '<p style="float:left; width:200px; padding:0 1em 1em 0;"><iframe width="200" height="170" src="//www.youtube.com/embed/cKloz3-w7-o" frameborder="0"  allowfullscreen></iframe></p>'+
      '<p style="float:left; width: 184px;">' +
      'Hoadasdasa sd ad ada sd asd ad asd asd asd asd as das da das da sd... <a href="">Ver mas</a><br />'+
      '<br />&nbsp;<i class="fa fa-dollar"></i><span style="font-weight:bold;font-family: "Lucida grande", Verdana, sans-serif;"> &nbsp;300.000.000</span> (Venta)'+
      '<br />&nbsp;<i class="fa fa-phone"></i> 301 555 5555' +      
      '<br />&nbsp;<a href="#" style="color:#333"><i class="fa fa-picture-o"></i> Fotografías</a>'+      
      '<br /><br /><a href="#" class="btn btn-warning full" style="display:block">Contactar al anunciante</a>'+
      '</p>'+
      '</div>'+
      '</div>';

  

  google.maps.event.addListener(marker, 'click', function() {
       
       if(infowindow)
         infowindow.close();

        infowindow = new google.maps.InfoWindow({
           content: content,
           maxWidth: 400
        });

       infowindow.open(MAP, this);

  });

   markers.push(marker);

    if(markerCluster)
    markerCluster.clearMarkers();

    markerCluster = new MarkerClusterer(MAP, markers, mcOptions);

   check_is_marker_on_zone(marker);



}


function check_is_marker_on_zone(marker){

   

    for(x in zones){
        console.log(marker.position.mb + " < " + zones[x].min_lng + "&&" + marker.position.lb + "<" + zones[x].max_lat);        
        if(inside([marker.getPosition().lat() , marker.getPosition().lng()], zones[x].points)){

              var replaces = {
                   title : "Publicación en tu zona",
                   msg : "Han publicado en tu zona <b>" + zones[x].name +"</b>, pulsa aquí para ver la publicación.",
                   type : "{type:'ZONE_NOTIFICATION', lat':" + marker.getPosition().lat() + ",'lng':" + marker.getPosition().lng() + "}"                   
                }

                notifier.emit(replaces);

           }
           
       }
    

}

function hideMarkers(){

    for(x in markers)
      markers[x].setMap(null);

}


function showMarkers(){

    for(x in markers)
      markers[x].setMap(MAP);

}


function clearMarkers(){

  hideMarkers();
   markers = [];

}


function codeLatLng(lat, lng, callback) {


    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {    
 

        if (results[1]) {
         
         address = results[0].formatted_address.split(",");
         var location_info = {

         	 name : address[1],
         	 location_address : address[0],
         	 state : address[2],
         	 country : address[3]         	 

         }

           if(!callback instanceof Function)
            return location_info;       
          else
            callback(location_info);


        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  }


     
