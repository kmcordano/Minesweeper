/* 
 * spa.minesweeper.js
 * Minesweeper module for SPA
 */   

spa.minesweeper = (function() {
   'use strict';

   // -------- BEGIN MODULE SCOPE VARIABLES -------- //
   let configMap = {
      main_html : String()
         + '<div class="container">'
            + '<h1>MineSweeper</h1>'
            + '<div class="gameboard">'
               + '<div class="scoreboard">'
                  + '<div class="mine-count"></div>'
                  + '<div class="result"></div>'
                  + '<div class="timer"></div>'
               + '</div>'
               + '<div class="mine-field">'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
                  + '<div class="space"></div>'
               +'</div>'
            + '</div>'
         + '</div>'
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
      stateMap.$container = $container;
      $container.innerHTML = configMap.main_html;
      setElementMap();
   };
   // End public method /initModule/

   // -------- END PUBLIC METHODS -------- //

   return {
      initModule : initModule
   };
}());