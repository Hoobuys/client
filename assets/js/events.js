var events_controller = function(){
		
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
		            target = $(target)
		          
		          /*  var distance = 0;
		            
		            if(obj.attr("data-menu"))
		            	$("#overlay").show();

		            target.animate({left: distance + "px"}); */

		            $("#overlay").show();

		            target.removeClass("hide")
		                  .addClass("show");



		        }

		  }

}