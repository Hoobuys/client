


function notifications(){


var path = {
	
	title : "{{title}}",
	msg : "{{msg}}",
	date : "{{date}}",
	user_action_name : "{{user_action_name}}",
	user_action_id : "{{user_action_id}}",
	url : "{{url}}",
	coordinates : "{{coordinates}}",
	callback : "{{callback}}",
	type : "{{type}}"

}

var notifications = new Array();

var counter = 0;

var date = new Date();

var model = ' <span class="notification"> ' +
	   	   '<a href="#" rel="nofollow" class="close"><i class="zicon-close"  data-target=".notification" data-close></i></a>' +
	   	  '<div class="wrapper">' +
	   	  	  '<div class="icon">' +
	   	  	  	'<i class="zicon-marker"></i>' +
	   	  	  '</div>' +
	   	  	  '<div class="content">'+
	   	  	  	  '<a href="#" rel="nofollow" class="atext" data-type="{{type}}" data-callback="{{callback}}" data-notification><b>{{title}}</b></a>' +
	   	  	  	  '<p>'+
	   	  	  	  	'<a href="#" rel="nofollow" class="atext" data-type="{{type}}" data-callback="{{callback}}" data-notification>{{msg}}</a>' +
	   	  	  	  '</p>' +
	   	  	  	  '<span class="date">{{date}}</span>' +
	   	  	  '</div>' +
	   	  '</div>' +
	   '</span>';

var days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"];
var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var noti_globe = undefined;
var inited = false;


this.ini = function(noti_glo, count){

    noti_globe = $(noti_glo);
    noti_icon = noti_globe.parents("li:first").find("a:first");

    if(count)
    counter = count;

    inited = true;    



    ini_globe();

}


$.fn.dissapear = function(delay){

	 var _this = $(this);

	 if(!delay)
	 	 var delay = 5000;

	 var dissap = function(){ 	

	  _this.hide();
	  _this.remove(); 	 
	  interval = window.clearInterval(interval);
	}

	 var interval = self.setInterval( dissap, delay);

}

this.emit = function( replaces ){
	
	if(!inited)
		return false;


	if(!replaces instanceof Object)
		return false;
	

	var notification = parseContent( replaces );

	console.log(notification);

	if($(".notification").length > 0)
	$(".notification").removeClass("show").addClass("hide");

	$("body").append(notification);	
	up();
	$(".notification").addClass("show").dissapear();

}


var ini_globe = function(){

	  if(counter > 0)
	  	 noti_globe.text(counter).show();
	  else
	  	noti_icon.addClass("inactive");

	  noti_globe.attr("data-count", counter);


}

var down = function(){

	if(!inited)
		return false;
	
	 var notifs = parseInt(noti_globe.attr("data-count"));
	     notifs--;

	 if(notifs > 0){
	 	 noti_globe.attr("data-count", notifs);	 	 
	     noti_globe.text( notifs ) ;	     
	   }
	 else{
	 	 noti_globe.attr("data-count","0");
	 	 noti_icon.addClass("inactive");
	 	 noti_globe.hide();
	 	 return false;
	 }

	noti_globe.show();

}


var up = function(){

	if(!inited)
		return false;
	
	 var notifs = parseInt(noti_globe.attr("data-count"));
	     notifs++;
	     noti_globe.attr("data-count", notifs)

	    noti_globe.text( notifs ) ;
	 	noti_icon.removeClass("inactive");

	  noti_globe.show();

}

var get_full_date_ = function(){ 

	 var day = date.getDay();
  	 var month = date.getMonth(); 
  	 var year = date.getFullYear(); 	 	 
  	 var month = get_month_name(month, true);
  	 	 
  	 	 if(day < 9)
  	 	 	 day = "0" + day;



  	 return day + "/" + month +"/"+ year +" a las " + get_hour(); 

 }



function parseContent( replaces ){
	
	if(!inited)
		return false;

	var date = get_full_date_();

    var str = model;

	str = str.replace( new RegExp(path.msg,"g"), replaces.msg );
	str = str.replace( new RegExp(path.title,"g"), replaces.title );
	str = str.replace( new RegExp(path.date,"g"), date );
	str = str.replace( new RegExp(path.user_action_name,"g"), replaces.user_action_name );
	str = str.replace( new RegExp(path.user_action_id,"g"), replaces.user_action_id );
	str = str.replace( new RegExp(path.url,"g"), replaces.url );
	str = str.replace( new RegExp(path.type,"g"), replaces.type );
	str = str.replace( new RegExp(path.coordinates,"g"), replaces.coordinates );
	str = str.replace( new RegExp(path.callback,"g"), replaces.callback );

	return str;


 }

   
  
  this.get_full_date = function(){

  	 var day = date.getDay();
  	 var month = date.getMonth(); 
  	 var year = date.getFullYear(); 	 	 
  	 var month = get_month_name(month, true);
  	 	 
  	 	 if(day < 9)
  	 	 	 day = "0" + day;



  	 return day + "/" + month +"/"+ year +" a las " + get_hour(); 



  }

   var get_hour = function(){

    var hour = date.getHours();
    var mins = date.getMinutes();    
    var ampm = "am";

    if(mins < 9)
    	mins = "0" + mins;

    if((hour - 12 ) > 0)
     {
    	ampm = "pm";
    	hour = hour - 12;
      }

     return hour + ":" + mins + " " + ampm;
   
   }

  function get_day_name(day, short){ if(!short) return days[day]; else return days[day].substring(0,3); }
  function get_month_name(month, short){ if(!short) return months[month]; else return months[month].substring(0,3); }

}

