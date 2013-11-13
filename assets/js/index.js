
 require_once("../assets/js/jquery.js");
 require_once("../assets/js/hoo_sdk.js");
 require_once("../assets/js/ejs.js");
 require_once("../assets/js/events.js");



// esta función se encargará de iniciar todo el app


 function hoobuys(){

   
   this.run = function(){


   //iniciamos hoo SDK y  pasamos los parametros APP_ID y APP_KEY
   // el APP_SECRET no es necesario y no debe usarse lado cliente

    hoo.init("APP_ID", "APP_KEY");




  //miramos si el usuario tiene una session valida para renderizar el home 
   hoo.login( render);



  // imprimimos en consola el objeto hoo
   console.log(hoo);


   //iniciamos controladores de eventos

      new events_controller().ini();


   }



   //render es el callback del init del hoo sdk para luego renderizar el home

   function render(rs){

       var data = {};
      
           data.message = "Hoobuys JS SDK Demo";
        
        if(!rs.ok)    // en caso de error, no tenemos un usuario logueado   
           data.url = rs.url;
           data.error = rs.error;

       var content = new EJS({url:"views/home.ejs"})
                   .render(data);

     var wrapper = document.getElementById("wrapper");
   
     wrapper.innerHTML = content;

   }


 }




  
  window.onload = function(){

      //iniciamos el app una vez cargado el dom

      new hoobuys().run();

  }