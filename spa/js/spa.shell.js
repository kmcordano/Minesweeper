/* 
 * spa.shell.js
 * Shell module for SPA
 */   

spa.shell = (function() {
   'use strict';

   // -------- BEGIN MODULE SCOPE VARIABLES -------- //
   let configMap = {
      main_html : String()
         + '<div class="spa-shell-header">'
            + '<div class="spa-shell-header-logo">Logo</div>'
            + '<div class="spa-shell-header-acct">Login</div>'
         + '</div>'
         + '<div class="spa-shell-main">'
            + '<div class="spa-shell-main-nav"></div>'
            + '<div class="spa-shell-main-content"></div>'
         + '</div>'
         + '<div class="spa-shell-footer"></div>'
   };
   let stateMap = { $container : null };
   let elementMap = {};
   let setElementMap;
   let initModule;
   // -------- END MODULE SCOPE VARIABLES -------- //



   // -------- BEGIN UTILITY METHODS -------- //
   // -------- END UTILITY METHODS -------- //

   
   
   // -------- BEGIN DOM METHODS -------- //
   
   // Begin DOM method /setElementMap/
   setElementMap = () => {
      let $container = stateMap.$container;
      elementMap = {
         $container : $container
      };
   };
   // End DOM method /setElementMap/
   
   // -------- END DOM METHODS -------- //

   
   
   // -------- BEGIN EVENT HANDLERS -------- //
   // -------- END EVENT HANDLERS -------- //

   
   
   // -------- BEGIN PUBLIC METHODS -------- //

   // Begin public method /initModule/
   initModule = ($container) => {
      stateMap.$container= $container;
      $container.innerHTML = configMap.main_html;
      setElementMap();
   };
   // End public method /initModule/

   // -------- END PUBLIC METHODS -------- //

   return {
      initModule : initModule
   };
}());