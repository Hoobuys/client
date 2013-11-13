var events_controller = function(){
		
		 var target_temp = null;

		  this.ini = function(){

		  	 on_listeners();

		  }



		  var actions_controller = function(e){

		    prevents(e);		    

		    var _this = $(this);
		    var cmd = _this.attr("data-action");

		    switch(cmd){

		      case "slide-left":
		          slide_left(_this);
		      break;

		      case "slide-right":
		          slide_right(_this);
		      break;


		    }




		  }

		  var on_listeners = function(){

		    $("[data-button]").on("click",actions_controller);
		    $("#overlay").on("click", overlay_controller);

		  }

		  var prevents = function(e){
		    e.preventDefault();
		    e.stopPropagation();
		  }


		  var slide_left = function(obj){

		     var target = (obj.attr("data-target")) ? obj.attr("data-target") : "self";

		     if(target != "self")
		        {
		            target = $(target)
		            target_temp = target;
		          
		          /*  var distance = (target.width() + 50) * -1;

		            target.animate({left: distance + "px"}, function(){

		            	 if(obj.attr("data-menu"))
		            	 	$("#overlay").hide();

		            }); */
	
				   $("#overlay").hide();
					target.removeClass("show")
						  .addClass("hide");



		        }

		  }


		    var slide_right = function(obj){

		     var target = (obj.attr("data-target")) ? obj.attr("data-target") : "self";

		     if(target != "self")
		        {
		            target = $(target);
		             target_temp = target;
		          
		          /*  var distance = 0;
		            
		            if(obj.attr("data-menu"))
		            	$("#overlay").show();

		            target.animate({left: distance + "px"}); */

		            $("#overlay").show();

		            target.removeClass("hide")
		                  .addClass("show");



		        }

		  }


		  var overlay_controller = function(e){

		  	  prevents(e);

		  	  target_temp.removeClass("show")
		  	  			 .addClass("hide");

			  $(this).hide();		  	  			 

		  }

}