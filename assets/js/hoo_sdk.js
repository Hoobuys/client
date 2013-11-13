// Hoobuys JS SDK 
// Gomosoft 2013 



var hoo_ = function(data){
		

	    var app_id = undefined;
	    var app_key = undefined;					
		var ls = window.localStorage;
		var userid = undefined;
		var credentials = undefined;				
		var domain = "hoobuys.com";			
		var url = {

			  "posts" : {
			       url : "https://" + domain + "/POSTS/{{app_id}}/{{app_key}}"			       
			   }
			 , "login" : {
			 	  url : "https://" + domain + "/LOGIN/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }			 
			 , "logout" : {
			 	  url : "https://" + domain + "/LOGOUT/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "buy" : {
			 	  url : "https://" + domain + "/BUY/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "purchases" : {
			 	  url : "https://" + domain + "/PURCHASES/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "sales" : {
			 	  url : "https://" + domain + "/SALES/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "comment" : {
			 	  url : "https://" + domain + "/COMMENT/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "like" : {
			 	  url : "https://" + domain + "/LIKE/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "search" : {
			 	  url : "https://" + domain + "/SEARCH/{{app_id}}/{{app_key}}",
			 	  method : "GET"
			 }
			 , "profile" : {
			 	  url : "https://" + domain + "/PROFILE/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "billing" : {
			 	  url : "https://" + domain + "/BILLING/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "ads" : {
			 	  url : "https://" + domain + "/ADS/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "zone" : {
			 	  url : "https://" + domain + "/ZONE/{{app_id}}/{{app_key}}",
			 	  method : "POST"			 	  
			 }
			 , "share" : {
			 	  url : "https://" + domain + "/SHARE/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "follow" : {
			 	  url : "https://" + domain + "/FOLLOW/{{app_id}}/{{app_key}}",
			 	  method : "POST"
			 }
			 , "add_funds" : {
			 	  url : "https://" + domain + "/FUNDS/{{app_id}}/{{app_key}}",
			 	  method : "POST"			 	  
			 }
			 , "notifications" : {
			 	  url : "https://" + domain + "/NOTIFICATIONS/{{app_id}}/{{app_key}}"			 	  			 	 
			 }			 


		};


		this.init = function(id, key){

              if(!id && !key)
              {
              	
              	make_logout();
              	console.log("App key & id are required");
              	return false;

              }

             app_id = id;
             app_key = key;

              if(!ls.userid)              
              	make_logout();

             userid = ls.userid;



		}


		this.login = function( callback){

				var rs = exec("login");

				if(rs && callback instanceof Function)
					{ 

						credentials = rs.credentials;
						callback(null, rs);
						return true;

				 }else

              return false;           					 


		}


		this.logout = function( callback){

				if(callback instanceof Function)
				{
					make_logout( callback);					
				}
				else 
					make_logout();

		}


		var get_url = function(key){

			return url[key].url.replace("{{app_id}}", app_id).replace("{{app_key}}", app_key);

		}


		var make_logout = function( callback){

			  alert("Error: usuarion no logueado. URL logout => " + get_url("logout"));

		}


		//  all methods 

		// get_user_info , get_posts, get_billing, make_ads, get_ads, post, comment, get_comments
		// like, follow, get_follow, add_funds, get_payments, purchases, sales, share, connect_facebook, connect_twitter, connect_ebay, connect_mercado_libre
		// modify_profile, create_zone, get_zones ...


		/*[

			methods here
	

		]*/


		var exec = function(cmd){

			 var url = url[cmd];	
			 var credentials = credentials;
			 credentials.app_id = app_id;
			 credentials.app_key = app_key;			 		

			 // ajax request JSONP

		}




}




window.hoo = new hoo_();
