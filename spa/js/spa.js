/*
 * spa.js
 * Root namespace module
 */

let spa = (function() {
   'use strict';

   const initModule = ($container) => {
      spa.shell.initModule($container);
   };

   return {
      initModule : initModule
   };
}());