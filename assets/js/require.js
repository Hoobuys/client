//Licencia GPL v3 


window.require = function( src_file , where){
    
    if(! where )
       var where = "";


    switch(where){


    	case "head":

    	var head  = document.getElementsByTagName("head")[0];
    	var script = document.createElement("script");
    	    script.src = src_file;

    	    head.appendChild(script);

    	break;


    	case "body":

    	var body  = document.getElementsByTagName("body")[0];
    	var script = document.createElement("script");
    	    script.src = src_file;

    	    body.appendChild(script);

    	break;


    	default:

    	document.write("<script src=\"" + src_file + "\"></script>");
    	
    		
    }
	

}



window.require_once = function( src_file , where){
    
    if(! where )
       var where = "";


   var scripts = document.getElementsByTagName("script");
   var i = 0;

   for(;i < scripts.length; i++)
   	 if(scripts[i].getAttribute("src") === src_file)
   	 	 return false;


    switch(where){


    	case "head":

    	var head  = document.getElementsByTagName("head")[0];
    	var script = document.createElement("script");
    	    script.src = src_file;

    	    head.appendChild(script);

    	break;


    	case "body":

    	var body  = document.getElementsByTagName("body")[0];
    	var script = document.createElement("script");
    	    script.src = src_file;

    	    body.appendChild(script);

    	break;


    	default:

    	document.write("<script src=\"" + src_file + "\"></script>");
    	
    		
    }
	

}


//Ejemplos de Uso 
// require("ruta/a/mi/archivo.js");  //inserta el script justo en el lugar del documento donde es llamada la función
// require("ruta/a/mi/archivo.js", "head");  // inserta el script en el head
// require("ruta/a/mi/archivo.js", "body");  // inserta el script al final del body

// *happy coding*  by  @gomosoft 