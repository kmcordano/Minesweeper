/*
 * spa.js
 * Root namespace module
 */

let spa = (function() {
   const initModule = ($container) => {
      $container.innerHTML = "Hello World!";
   };

   return {
      initModule : initModule
   };
}());