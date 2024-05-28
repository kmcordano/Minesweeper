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
                  + '<div class="spa-minesweeper-scoreboard-mine-count"></div>'
                  + '<div class="spa-minesweeper-scoreboard-result"></div>'
                  + '<div class="spa-minesweeper-scoreboard-timer"></div>'
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
      $container : null,
      gameTime   : undefined,
      mineCount  : undefined,
      mineGrid   : undefined
   };
   let elementMap = {};
   // End Maps/Objects
   
   // Methods
   let addEventListeners;
   let adjustScoreboardMineCount;
   let checkBounds;
   let configModule;
   let getMineAt;
   let getRandomInt;
   let incrementNeighbors;
   let incrementScoreboardTimer;
   let initModule;
   let populateMineGrid;
   let setElementMap;
   let setModuleContainer;
   let setScoreboardMineCount;
   let setScoreboardTimer;
   let timer;
   let uncoverSpaces;
   // End Methods

   // -------- END MODULE SCOPE VARIABLES -------- //



   // -------- BEGIN STATE MANAGEMENT METHODS -------- //

   // Begin Manager /getMineGrid/
   getMineAt = (row, col) => {
      return stateMap.mineGrid[row][col];
   };
   // End Manager /getMineGrid/

   // Begin Manager /incrementScoreboardTimer/
   incrementScoreboardTimer = () => {
      stateMap.gameTime++;
      elementMap.$timer.innerHTML = stateMap.gameTime;
   };
   // End Manager /incrementScoreboardTimer/

   // Begin Manager /setScoreboardTimer/
   setScoreboardTimer = (time) => {
      stateMap.gameTime = time;
      elementMap.$timer.innerHTML = stateMap.gameTime;
   };
   // End Manager /setScoreboardTimer/
   
   // Begin Manager /adjustScoreboardMineCount/
   adjustScoreboardMineCount = (delta) => {
      stateMap.mineCount += delta;
      elementMap.$mine_count.innerHTML = stateMap.mineCount; 
   };
   // End Manager /incrementMines/

   // Begin Manager /setScoreboardMineCount/
   setScoreboardMineCount = (val) => {
      stateMap.mineCount = val
      elementMap.$mine_count.innerHTML = stateMap.mineCount;
   };
   // End Manager /setScoreboardMineCount/

   // Begin Manager /setModuleContainer/
   setModuleContainer = ($container) => {
      stateMap.$container = $container;
      stateMap.$container.innerHTML = configMap.mainHtml;
   };
   // End Manager /setModuleContainer/

   // -------- BEGIN STATE MANAGEMENT METHODS -------- //



   // -------- BEGIN UTILITY METHODS -------- //

   // Begin Utility /addEventListeners/
   addEventListeners = () => {
      let id = 0;
      elementMap.$mine_spaces.forEach((space) => {
         space.id = id++;
         space.addEventListener('click', uncoverSpaces);
         // space.addEventListener('contextmenu', toggleFlag);
      })
   };
   // End Utility /addEventListeners/
   
   // Begin Utility /populateMineGrid/
   populateMineGrid = () => {
      let i;
      let row;
      let col;
      
      stateMap.mineGrid = new Array(configMap.mineFieldNumRows);
      for(i = 0; i < configMap.mineFieldNumRows; i++) {
         stateMap.mineGrid[i] = new Array(configMap.mineFieldNumCols).fill(0);
      }

      for(i = 0; i < configMap.mineFieldNumMines; i++) {
         do {
            row = getRandomInt(configMap.mineFieldNumRows);
            col = getRandomInt(configMap.mineFieldNumCols);
         }
         while (stateMap.mineGrid[row][col] === -1);

         stateMap.mineGrid[row][col] = -1;
         incrementNeighbors(row, col);
      }
   };
   // End Utility /populateMineGrid/

   // Begin Utility /incrementNeighbors/
   incrementNeighbors = (row, col) => {
      if(checkBounds(row-1, col-1) && stateMap.mineGrid[row-1][col-1] != -1) {
         stateMap.mineGrid[row-1][col-1]++
      }
      if(checkBounds(row-1, col) && stateMap.mineGrid[row-1][col] != -1) {
         stateMap.mineGrid[row-1][col]++
      }
      if(checkBounds(row-1, col+1) && stateMap.mineGrid[row-1][col+1] != -1) {
         stateMap.mineGrid[row-1][col+1]++
      }
      if(checkBounds(row, col+1) && stateMap.mineGrid[row][col+1] != -1) {
         stateMap.mineGrid[row][col+1]++
      }
      if(checkBounds(row+1, col+1) && stateMap.mineGrid[row+1][col+1] != -1) {
         stateMap.mineGrid[row+1][col+1]++
      }
      if(checkBounds(row+1, col) && stateMap.mineGrid[row+1][col] != -1) {
         stateMap.mineGrid[row+1][col]++
      }
      if(checkBounds(row+1, col-1) && stateMap.mineGrid[row+1][col-1] != -1) {
         stateMap.mineGrid[row+1][col-1]++
      }
      if(checkBounds(row, col-1) && stateMap.mineGrid[row][col-1] != -1) {
         stateMap.mineGrid[row][col-1]++
      }
   };
   // End Utility /incrementNeighbors/

   // Begin Utility /checkBounds/
   checkBounds = (row, col) => {
      return (row < configMap.mineFieldNumRows)
          && (row >= 0)
          && (col < configMap.mineFieldNumCols)
          && (col >= 0);
   };
   // End Utility /checkBounds/

   // Begin Utility /getRandomInt/
   getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
   };
   // End Utility /getRandomInt/

   // -------- END UTILITY METHODS -------- //

   
   
   // -------- BEGIN DOM METHODS -------- //
   
   // Begin DOM method /setElementMap/
   setElementMap = () => {
      let $container = stateMap.$container;
      let $timer = 
         $container.querySelector('.spa-minesweeper-scoreboard-timer');
      let $result = 
         $container.querySelector('.spa-minesweeper-scoreboard-result');
      let $mine_count = 
         $container.querySelector('.spa-minesweeper-scoreboard-mine-count');
      let $mine_field = 
         $container.querySelector('.spa-minesweeper-mine-field');
      let $mine_spaces = new Array(
         configMap.mineFieldNumCols * configMap.mineFieldNumRows
      );
      let $mine_space;

      // Set mine field row and cols
      $mine_field.style.gridTemplateRows 
         = `repeat(${configMap.mineFieldNumRows}, 1fr)`;
      $mine_field.style.gridTemplateColumns
         = `repeat(${configMap.mineFieldNumCols}, 1fr)`;

      // Fill mine field with spaces
      for(let i = 0; 
         i < configMap.mineFieldNumCols * configMap.mineFieldNumRows;
         i++
      ) {
         $mine_space = document.createElement('div');
         $mine_space.classList
            .add('spa-minesweeper-mine-field-space');

         $mine_field.appendChild($mine_space);
         $mine_spaces[i] = $mine_space;
      }

      elementMap = {
         $container   : $container,
         $timer       : $timer,
         $result      : $result,
         $mine_count  : $mine_count,
         $mine_field  : $mine_field,
         $mine_spaces : $mine_spaces
      };
   };
   // End DOM method /setElementMap/

   // -------- END DOM METHODS -------- //

   
   
   // -------- BEGIN EVENT HANDLERS -------- //

   // Begin Event /uncoverSpaces/
   uncoverSpaces = (event) => {
      let id = event.target.id;
      let queue = new Array();
      let at;
      let numMines;
      let space;

      console.log(event);

      queue.push([
         Math.floor(id / configMap.mineFieldNumCols),
         id % configMap.mineFieldNumCols
      ]);

      while(queue.length > 0) {
         at = queue.shift();
         numMines = getMineAt(at[0], at[1]);
         space = elementMap.$mine_spaces[
            (at[0] * configMap.mineFieldNumCols) + at[1]
         ];

         if(space.classList.contains('spa-minesweeper-uncovered')
         || space.classList.contains('spa-minesweeper-flag')
         ) {
            continue;
         }

         space.classList.add('spa-minesweeper-uncovered');
         if(numMines > 0) {
            space.innerHTML = numMines.toString();
            space.classList.add('tc' + numMines);
         }
         else if(numMines === -1) {
            space.classList.add('spa-minesweeper-mine-clicked');
            //endGame(false);
         }

         if(numMines === 0) {
            if(checkBounds(at[0]-1, at[1]-1)) {
               queue.push([at[0]-1, at[1]-1]);
            }
            if(checkBounds(at[0]-1, at[1])) {
               queue.push([at[0]-1, at[1]]);
            }
            if(checkBounds(at[0]-1, at[1]+1)) {
               queue.push([at[0]-1, at[1]+1]);
            }
            if(checkBounds(at[0], at[1]+1)) {
               queue.push([at[0], at[1]+1]);
            }
            if(checkBounds(at[0]+1, at[1]+1)) {
               queue.push([at[0]+1, at[1]+1]);
            }
            if(checkBounds(at[0]+1, at[1])) {
               queue.push([at[0]+1, at[1]]);
            }
            if(checkBounds(at[0]+1, at[1]-1)) {
               queue.push([at[0]+1, at[1]-1]);
            }
            if(checkBounds(at[0], at[1]-1)) {
               queue.push([at[0], at[1]-1]);
            }
         }

         // if(allUncovered()) {
         //    endGame(true);
         // }
      }
   };
   // End Event /uncoverSpaces/

   // Begin Interval /timer/
   timer = setInterval(incrementScoreboardTimer, 1000);
   // End Interval /timer/

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
      // Create HTML elements required in module
      setModuleContainer($container);
      setElementMap();

      // Set state values
      setScoreboardTimer(0);
      setScoreboardMineCount(configMap.mineFieldNumMines);

      // Following initialization functions
      populateMineGrid();
      addEventListeners();

      return true;
   };
   // End public method /initModule/

   // -------- END PUBLIC METHODS -------- //

   return {
      configModule : configModule,
      initModule   : initModule
   };
}());