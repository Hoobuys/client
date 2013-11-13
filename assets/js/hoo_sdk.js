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
			       url : "https://" + domain + "/POSTS/{{api_id}}/{{api_key}}"			       
			   }
			 , "login" : {
			 	  url : "https://" + domain + "/LOGIN/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }			 
			 , "logout" : {
			 	  url : "https://" + domain + "/LOGOUT/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "buy" : {
			 	  url : "https://" + domain + "/BUY/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "purchases" : {
			 	  url : "https://" + domain + "/PURCHASES/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "sales" : {
			 	  url : "https://" + domain + "/SALES/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "comment" : {
			 	  url : "https://" + domain + "/COMMENT/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "like" : {
			 	  url : "https://" + domain + "/LIKE/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "search" : {
			 	  url : "https://" + domain + "/SEARCH/{{api_id}}/{{api_key}}",
			 	  method : "GET"
			 }
			 , "profile" : {
			 	  url : "https://" + domain + "/PROFILE/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "billing" : {
			 	  url : "https://" + domain + "/BILLING/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "ads" : {
			 	  url : "https://" + domain + "/ADS/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "zone" : {
			 	  url : "https://" + domain + "/ZONE/{{api_id}}/{{api_key}}",
			 	  method : "POST"			 	  
			 }
			 , "share" : {
			 	  url : "https://" + domain + "/SHARE/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "follow" : {
			 	  url : "https://" + domain + "/FOLLOW/{{api_id}}/{{api_key}}",
			 	  method : "POST"
			 }
			 , "add_funds" : {
			 	  url : "https://" + domain + "/FUNDS/{{api_id}}/{{api_key}}",
			 	  method : "POST"			 	  
			 }
			 , "notifications" : {
			 	  url : "https://" + domain + "/NOTIFICATIONS/{{api_id}}/{{api_key}}"			 	  			 	 
			 }			 


		};


		this.init = function(id, key){

              if(!id && !key)
              {
              	
              	logout();
              	console.log("App key & id are required");
              	return false;

              }


              if(!ls.userid)              
              	logout();

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
