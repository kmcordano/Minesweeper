/* 
 * spa.minesweeper.js
 * Minesweeper module for SPA
 */   

spa.minesweeper = (function() {
   'use strict';

   // -------- BEGIN MODULE SCOPE VARIABLES -------- //

   // Begin Maps/Objects
   let configMap = {
      mainHtml : String()
         + '<div class="spa-minesweeper-container">'
            + '<h1>MineSweeper</h1>'
            + '<div class="spa-minesweeper-gameboard">'
               + '<div class="spa-minesweeper-scoreboard">'
                  + '<div class="spa-minsweeper-scoreboard-mine-count"></div>'
                  + '<div class="spa-minsweeper-scoreboard-result"></div>'
                  + '<div class="spa-minsweeper-scoreboard-timer"></div>'
               + '</div>'
               + '<div class="spa-minesweeper-mine-field">'
               +'</div>'
            + '</div>'
         + '</div>',
      settableMap : {
         mineFieldNumRows  : true,
         mineFieldNumCols  : true,
         mineFieldNumMines : true
      },
      mineFieldNumRows  : 9,
      mineFieldNumCols  : 9,
      mineFieldNumMines : 10
   };
   let stateMap = { 
      $container : null
   };
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
      let $mine_field = 
         $container.querySelector('.spa-minesweeper-mine-field');
      elementMap = {
         $container : $container,
         $mine_field : $mine_field
      };
   };
   // End DOM method /setElementMap/
   
   // -------- END DOM METHODS -------- //

   
   
   // -------- BEGIN EVENT HANDLERS -------- //
   // -------- END EVENT HANDLERS -------- //

   
   
   // -------- BEGIN PUBLIC METHODS -------- //

   // Begin public method /configModule/
   // Purpose   : adjust config of allowed keys
   // Arguments : a map of settable keys and values
   //    + mineFieldNumRows  - number of rows in mine field
   //    + mineFieldNumCols  - number of columns in mine field
   //    + mineFieldNumMines - number of mines in mine field
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
      let $mine_space;

      stateMap.$container = $container;
      $container.innerHTML = configMap.mainHtml;
      setElementMap();

      // Set mine field row and cols
      elementMap.$mine_field.style.gridTemplateRows 
         = `repeat(${configMap.mineFieldNumRows}, 1fr)`;
      elementMap.$mine_field.style.gridTemplateColumns
         = `repeat(${configMap.mineFieldNumCols}, 1fr)`;

      // Fill mine field with spaces
      for(let i = 0; 
          i < configMap.mineFieldNumCols * configMap.mineFieldNumRows;
          i++) {
            //'<div class="spa-minesweeper-mine-field-space"></div>'
            $mine_space = document.createElement('div');
            $mine_space.classList
               .add('spa-minesweeper-mine-field-space');

            elementMap.$mine_field.appendChild($mine_space);
     }

      return true;
   };
   // End public method /initModule/

   // -------- END PUBLIC METHODS -------- //

   return {
      configModule : configModule,
      initModule   : initModule
   };
}());