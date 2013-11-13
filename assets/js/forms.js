/*

Copyrights @gomosoft 2013


    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


*/


(function(){


   var form;

   var vars = {

       live : true,
       error_class : "input-error"
   };

   var patterns = [         
          {name : "text" , pattern : "^\\w" , error_msg: "%field% no es un texto válido"},          
          {name :"only-text" , pattern : "^[a-zA-Z'ÁÉÍÓÚáéíóúñ'\",\.\\s+]{3,}$" , error_msg: "%field% no es un texto valido"},
          {name : "email" , pattern: "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]{2,3})+(\.[a-z]{2}\s)?$" , error_msg : "%field% no es un email valido"},
          {name : "password" , pattern : "^[\\w]{6,}" , error_msg: "%field% no es un texto válido"},
          {name : "tel" , pattern :"^[\+]?[0-9-]{7,12}$", error_msg: "%field% no es un correo valido" },
          {name : "address" , pattern : "^([a-zA-Z0-9])[a-zA-Z0-9 ,-/#]*$", error_msg: "%field% no es una dirección valida"},
          {name : "credit-card" , pattern : "^((67\d{2})|(4\d{3})|(5[1-5]\d{2})|(6011))(-?\s?\d{4}){3}|(3[4,7])\ d{2}-?\s?\d{6}-?\s?\d{5}$" , error_msg: "%field% no es una tarjeta de credito válida"},
          {name : "postal" , pattern : "^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$" , error_msg: "%field% no es un código postal válido"},
          {name: "date" , pattern : "#^(((0?[1-9]|1d|2[0-8]){[/-.]}(0?[1-9]|1[012])|(29|30){[/-.]}(0?[13456789]|1[012])|31{[/-.]}(0?[13578]|1[02])){[/-.]}(19|[2-9]d)d{2}|29{[/-.]}0?2{[/-.]}((19|[2-9]d)(0[48]|[2468][048]|[13579][26])|(([2468][048]|[3579][26])00)))$#", error_msg: "%field% no es una fecha válida"}
       ]; 


   $.fn.forms = function(varss, callback){
      
      if(varss instanceof Function && !callback)
          var callback = varss;
      else if(varss instanceof Object){
         
         $.extend(vars, varss); 

         if(vars.patterns){

           $.extend(patterns, vars.patterns);

          } 

         }

        form = $(this);



       if(vars.live)
         live_validate();

      
      controller(this,callback);
      return this;          
            

   }






   this.controller = function ( form , callback){


    form.live("submit", function(e){

        submit(e, callback);


    });    


    form.find("input:not(input[type=\"submit\"], input[type=\"password\"], input[type=\"button\"]), textarea").focusout(function(){

        $(this).val( trim($(this).val()) );
         
                     var field = $(this);

                     if(field.attr("data-type"))
                     var pat = new RegExp(get_pattern(field.attr("data-type")).pattern,"i");  
                     else
                     var pat = new RegExp(get_pattern("text").pattern,"i");  

                     

                     if(field.attr("data-require") instanceof String)
                      if(field.attr("data-require") == "no" && strlen(field.val()) == 0)
                         field.removeClass(vars.error_class);

                     if( !pat.test(field.val()) ) 
                     {

                        field.addClass(vars.error_class);                        

                     }else
                      field.removeClass(vars.error_class);
         


    });


    this.submit = function(e, callback){

        e.preventDefault();
        e.stopPropagation();

        if(!test_form()){          
            
            var target = form.find("."  + vars.error_class + ":first");

            $("body").animate({ "scrollTop" : (target.offset().top - 50) + "px" }, function(e){

                 target.focus();

            });

            callback(false);

           }
        else
          callback(form);


        return false;


    }

   
   

    this.test_form = function (){


          var cond = new Array();

           form.find("input:not(input[type=\"submit\"], input[type=\"button\"], input[type=\"password\"]), textarea").each(function(){

                     var field = $(this);
                                        
                     if(field.attr("data-require"))                    
                       if(field.attr("data-require") === "no" && strlen(field.val()) === 0)
                          { 
                            
                            field.removeClass(vars.error_class);
                            return true; 
                            return;          

                          }

                          console.log($(this));

                    if(field.attr("data-type"))
                    var regE = get_pattern(field.attr("data-type"));
                    else
                    var regE = get_pattern("text");

                       console.log(regE)

                     if(!regE)                                      
                      cond.push("false");
                    else
                      regE = regE.pattern;

                     var pat = new RegExp(regE,"i");  
                                     
              
                     if( !pat.test( field.val()) ) 
                     {

                        field.addClass(vars.error_class);
                        cond.push("false");

                     }else 
                      field.removeClass(vars.error_class);

                     

                  });


  if($.inArray("false", cond) != -1)
    return false;
  else
    return true;

}

  

}


this.chk_input = function (){


                     var field = $(this);   



                     if(field.attr("data-type"))
                    var regE = get_pattern(field.attr("data-type"));
                    else
                    var regE = get_pattern("text");

                     console.log(regE)

                     if(regE)
                      regE = regE.pattern;
                    else
                      return false;

                     var pat = new RegExp(regE,"i");  
                     

                     if(field.attr("data-require"))
                      if(field.attr("data-require") == "no" && field.val().split("").length == 0){
                         field.removeClass(vars.error_class);
                         return true;
                       }

                     if( !pat.test(field.val()) ) 
                     {

                        field.addClass(vars.error_class);                        

                     }else
                      field.removeClass(vars.error_class);
         
                      

}


this.live_validate = function (){

   form.find("input[type='text'], textarea").live("keyup", chk_input);


}


this.get_pattern = function (type){

   
    for(x in patterns)
       if(type === patterns[x].name) 
          return patterns[x]


}



}(jQuery));




if(!$)
   {
    console.log("jQuery is require");
   }else{

       $("[data-forms]").each(function(){

           $(this).form({live:true}, $(this).attr("data-callback"));
            
       });

   }








// ----------------------------- forms api 



 // patterns util --------------------------

 function strlen (string) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Sakimori
  // +      input by: Kirk Strobeck
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
  // %        note 1: characters and to this function in PHP which does not count the number of bytes
  // %        note 1: but counts the number of characters, something like this is really necessary.
  // *     example 1: strlen('Kevin van Zonneveld');
  // *     returns 1: 19
  // *     example 2: strlen('A\ud87e\udc04Z');
  // *     returns 2: 3
  var str = string + '';
  var i = 0,
    chr = '',
    lgth = 0;

  if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
    return string.length;
  }

  var getWholeChar = function (str, i) {
    var code = str.charCodeAt(i);
    var next = '',
      prev = '';
    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
      if (str.length <= (i + 1)) {
        throw 'High surrogate without following low surrogate';
      }
      next = str.charCodeAt(i + 1);
      if (0xDC00 > next || next > 0xDFFF) {
        throw 'High surrogate without following low surrogate';
      }
      return str.charAt(i) + str.charAt(i + 1);
    } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
      if (i === 0) {
        throw 'Low surrogate without preceding high surrogate';
      }
      prev = str.charCodeAt(i - 1);
      if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
        throw 'Low surrogate without preceding high surrogate';
      }
      return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
    }
    return str.charAt(i);
  };

  for (i = 0, lgth = 0; i < str.length; i++) {
    if ((chr = getWholeChar(str, i)) === false) {
      continue;
    } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
    lgth++;
  }
  return lgth;
}



function trim (str, charlist) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: mdsjack (http://www.mdsjack.bo.it)
  // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
  // +      input by: Erkekjetter
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: DxGx
  // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // *     example 1: trim('    Kevin van Zonneveld    ');
  // *     returns 1: 'Kevin van Zonneveld'
  // *     example 2: trim('Hello World', 'Hdle');
  // *     returns 2: 'o Wor'
  // *     example 3: trim(16, 1);
  // *     returns 3: 6
  var whitespace, l = 0,
    i = 0;
  str += '';

  if (!charlist) {
    // default list
    whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
  } else {
    // preg_quote custom list
    charlist += '';
    whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  }

  l = str.length;
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }

  l = str.length;
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }

  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}
