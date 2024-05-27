/* 
 * spa.minesweeper.js
 * Minesweeper module for SPA
 */   

spa.minesweeper = (function() {
   'use strict';

   // -------- BEGIN MODULE SCOPE VARIABLES -------- //

   // Begin Maps/Objects
   let configMap = {
      main_html : String()
         + '<div class="spa-minesweeper-container">'
            + '<h1>MineSweeper</h1>'
            + '<div class="spa-minesweeper-gameboard">'
               + '<div class="spa-minesweeper-scoreboard">'
                  + '<div class="spa-minsweeper-scoreboard-mine-count"></div>'
                  + '<div class="spa-minsweeper-scoreboard-result"></div>'
                  + '<div class="spa-minsweeper-scoreboard-timer"></div>'
               + '</div>'
               + '<div class="spa-minesweeper-mine-field">'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
                  + '<div class="spa-minesweeper-mine-field-space"></div>'
               +'</div>'
            + '</div>'
         + '</div>',
      settableMap : {}
   };
   let stateMap = { $container : null };
   let elementMap = {};
   // End Maps/Objects
   
   // Methods
   let setElementMap;
   let initModule;
   let configModule;
   // End Methods

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

   // Begin public method /configModule/
   // Purpose   : adjust confif of allowed keys
   // Arguments : a map of settable keys and values
   //    + numRows  - number of rows in mine field
   //    + numCols  - number of columns in mine field
   //    + numMines - number of mines in mine field
   // Settings  :
   //    + configMap.settableMap declares allowed keys
   // Returns   : true
   // Throws    : none
   configModule = (inputMap) => {
      spa.util.setConfigMap({
         inputMap    : inputMap,
         settableMap : configMap.settableMap,
         configMap   : configMap
      });
      return true;
   };
   // End public method /configModule/

   // Begin public method /initModule/
   // Purpose   : initialize module
   // Arguments :
   //    + $container - the html element used by this feature
   // Returns   : true
   // Throws    : none
   initModule = ($container) => {
      stateMap.$container = $container;
      $container.innerHTML = configMap.main_html;
      setElementMap();
      return true;
   };
   // End public method /initModule/

   // -------- END PUBLIC METHODS -------- //

   return {
      configModule : configModule,
      initModule   : initModule
   };
}());