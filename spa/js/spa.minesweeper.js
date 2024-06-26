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
         + '<div class="spa-minesweeper-container" oncontextmenu="return false">'
            + '<h1 class="spa-minesweeper-title">MineSweeper</h1>'
            + '<div class="spa-minesweeper-gameboard">'
               + '<div class="spa-minesweeper-scoreboard">'
                  + '<div class="spa-minesweeper-scoreboard-mine-count"></div>'
                  + '<div class="spa-minesweeper-scoreboard-result"></div>'
                  + '<div class="spa-minesweeper-scoreboard-timer"></div>'
               + '</div>'
               + '<div class="spa-minesweeper-mine-field">'
               +'</div>'
            + '</div>'
            + '<div class="spa-minesweeper-btns">'
               + '<div class="spa-minesweeper-new-game spa-minesweeper-btn">New Game</div>'
               + '<div class="spa-minesweeper-settings spa-minesweeper-btn">Settings</div>'
            + '</div>' 
            + '<div class="spa-minesweeper-settings-modal" style="visibility: hidden">'
               + '<form>'
                  + '<h2>game settings</h2>'
                  + '<br>'
                  + '<p>number of rows :</p>'
                  + '<input type="text" class="spa-minesweeper-settings-modal-num-rows">'
                  + '<p>number of columns :</p>'
                  + '<input type="text" class="spa-minesweeper-settings-modal-num-cols">'
                  + '<p>number of mines :</p>'
                  + '<input type="text" class="spa-minesweeper-settings-modal-num-mines">'
                  + '<br><br>'
                  + '<div class="spa-minesweeper-settings-modal-submit spa-minesweeper-btn">New Game</div>'
               + '</form>'
            + '</div>'     
         + '</div>',
      settableMap : {
         mineFieldNumRows  : true,
         mineFieldNumCols  : true,
         mineFieldNumMines : true,
         DEFAULT_NUM_ROWS  : false,
         DEFAULT_NUM_COLS  : false,
         DEFAULT_NUM_MINES : false,
         MAX_NUM_COLS      : false,
         MAX_NUM_ROWS      : false,
         MAX_NUM_MINES     : false
      },
      mineFieldNumRows  : 9,
      mineFieldNumCols  : 9,
      mineFieldNumMines : 10,
      DEFAULT_NUM_ROWS  : 9,
      DEFAULT_NUM_COLS  : 9,
      DEFAULT_NUM_MINES : 10,
      MAX_NUM_ROWS      : 99,
      MAX_NUM_COLS      : 99,
      MAX_NUM_MINES     : 2200
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
   let addGameButtons;
   let adjustScoreboardMineCount;
   let adjustSettings;
   let allUncovered;
   let checkBounds;
   let clearClickListeners;
   let configModule;
   let endGame;
   let getMineAt;
   let getRandomInt;
   let incrementNeighbors;
   let incrementScoreboardTimer;
   let initModule;
   let populateMineGrid;
   let restartGame;
   let restartTimer;
   let setElementMap;
   let setMineField;
   let setModuleContainer;
   let setScoreboardMineCount;
   let setScoreboardTimer;
   let startTimer;
   let stopTimer;
   let timer;
   let toggleFlag;
   let uncoverMines;
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

   // Begin Utility /addGameButtons/
   addGameButtons = () => {
      elementMap.$new_game.addEventListener('click', restartGame);
      elementMap.$settings.addEventListener('click', adjustSettings);
   };
   // End Utility /addGameButtons/

   // Begin Utility /adjustSettings/
   adjustSettings = () => {
      let $container = elementMap.$settings_modal;
      let $rowInput = 
         $container.querySelector('.spa-minesweeper-settings-modal-num-rows');
      let $colInput = 
         $container.querySelector('.spa-minesweeper-settings-modal-num-cols');
      let $mineInput =
         $container.querySelector('.spa-minesweeper-settings-modal-num-mines');
      let $submit =
         $container.querySelector('.spa-minesweeper-settings-modal-submit');

      stopTimer();
      $container.style.visibility = 'visible';

      $submit.addEventListener('click', () => {
         configMap.mineFieldNumCols  = +$colInput.value;
         configMap.mineFieldNumRows  = +$rowInput.value;
         configMap.mineFieldNumMines = +$mineInput.value;

         $container.style.visibility = 'hidden';

         restartGame();
      });
   };
   // End Utility /adjustSettings/

   // Begin Utility /restartGame/
   restartGame = () => {
      clearClickListeners(); 

      while(elementMap.$mine_field.firstChild) {
         elementMap.$mine_field.removeChild(elementMap.$mine_field.lastChild);
      }

      elementMap.$mine_spaces = setMineField(elementMap.$mine_field);
      populateMineGrid();

      restartTimer();
      setScoreboardMineCount(configMap.mineFieldNumMines);
      elementMap.$result.classList.forEach((classItem) => {
         elementMap.$result.classList.remove(classItem);
      });
      elementMap.$result.innerHTML = '';

      addEventListeners();
   };
   // End Utility /restartGame/

   // Begin Utility /uncoverMines/
   uncoverMines = () => {
      elementMap.$mine_spaces.forEach((space) => {
         if(getMineAt(
            Math.floor(space.id / configMap.mineFieldNumCols),
            space.id % configMap.mineFieldNumCols
            ) === -1
         ) {
            space.classList.remove('spa-minesweeper-flag');
            space.classList.add('spa-minesweeper-uncovered');
            space.classList.add('spa-minesweeper-mine');
         }
      });
   }; 
   // End Utility /uncoverMines/

   // Begin Utility /clearClickListeners/
   clearClickListeners = () => {
      elementMap.$mine_spaces.forEach((space) => {
         space.removeEventListener('click', uncoverSpaces);
         space.removeEventListener('contextmenu', toggleFlag);
      });
   }; 
   // End Utility /clearClickListeners/

   // Begin Utility /endGame/
   endGame = (won) => {
      stopTimer();
      if(won) {
         elementMap.$result.classList.add('win');
         elementMap.$result.innerHTML = 'WIN';
      }
      else {
         elementMap.$result.classList.add('loss');
         elementMap.$result.innerHTML = 'LOSS';
         uncoverMines();
      }
      clearClickListeners();
   };
   // End Utility /endGame/

   // Begin Utility /allUncovered/
   allUncovered = () => {
      let completed = true;
      
      elementMap.$mine_spaces.forEach((space) => {
         if(
            !space.classList.contains('spa-minesweeper-flag')
         && !space.classList.contains('spa-minesweeper-uncovered')
         ) {
            completed = false;
         }
      });

      if(stateMap.mineCount !== 0) {
         completed = false;
      }

      return completed;
   };
   // End Utility /allUncovered/

   // Begin Utility /addEventListeners/
   addEventListeners = () => {
      let id = 0;
      elementMap.$mine_spaces.forEach((space) => {
         space.id = id++;
         space.addEventListener('click', uncoverSpaces);
         space.addEventListener('contextmenu', toggleFlag);
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
      let $mine_spaces = setMineField($mine_field);
      let $new_game = $container.querySelector('.spa-minesweeper-new-game');
      let $settings = 
         $container.querySelector('.spa-minesweeper-settings');
      let $settings_modal = 
         $container.querySelector('.spa-minesweeper-settings-modal');

      elementMap = {
         $container      : $container,
         $timer          : $timer,
         $result         : $result,
         $mine_count     : $mine_count,
         $mine_field     : $mine_field,
         $mine_spaces    : $mine_spaces,
         $new_game       : $new_game,
         $settings       : $settings,
         $settings_modal : $settings_modal
      };
   };
   // End DOM method /setElementMap/

   // Start DOM method /setMineField/
   setMineField = ($mine_field) => {
      let $mine_spaces = new Array(
         configMap.mineFieldNumCols * configMap.mineFieldNumRows
      );
      let $mine_space;

      $mine_field.style.gridTemplateRows 
         = `repeat(${configMap.mineFieldNumRows}, 1fr)`;
      $mine_field.style.gridTemplateColumns
         = `repeat(${configMap.mineFieldNumCols}, 1fr)`;

      for(
         let i = 0; 
         i < configMap.mineFieldNumCols * configMap.mineFieldNumRows;
         i++
      ) {
         $mine_space = document.createElement('div');
         $mine_space.classList
            .add('spa-minesweeper-mine-field-space');

         $mine_field.appendChild($mine_space);
         $mine_spaces[i] = $mine_space;
      }

      return $mine_spaces;
   };
   // End DOM method /setMineField/

   // -------- END DOM METHODS -------- //

   
   
   // -------- BEGIN EVENT HANDLERS -------- //

   // Begin Event /uncoverSpaces/
   uncoverSpaces = (event) => {
      let id = event.target.id;
      let queue = new Array();
      let at;
      let numMines;
      let space;

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
            space.classList.add('spa-minesweeper-tc' + numMines);
         }
         else if(numMines === -1) {
            space.classList.add('spa-minesweeper-mine-clicked');
            endGame(false);
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

         if(allUncovered()) {
            endGame(true);
         }
      }
   };
   // End Event /uncoverSpaces/

   // Begin Event /toggleFlag/
   toggleFlag = (event) => {
      let id = event.target.id;
      let space = elementMap.$mine_spaces[id];

      if(!space.classList.contains('spa-minesweeper-uncovered ')) {
         if(space.classList.contains('spa-minesweeper-flag')) {
            space.classList.remove('spa-minesweeper-flag');
            adjustScoreboardMineCount(1);
         }
         else {
            space.classList.add('spa-minesweeper-flag');
            adjustScoreboardMineCount(-1);
         }
      }

      if(allUncovered()) {
         endGame(true);
      }
   };
   // End Event /toggleFlag/

   // Begin Interval /restartTimer/
   restartTimer = () => {
      stopTimer();
      setScoreboardTimer(0);
      startTimer();
   };
   // End Interval /restartTimer/

   // Begin Interval /startTimer/
   startTimer = () => {
      timer = setInterval(incrementScoreboardTimer, 1000);
   };
   // End Interval /startTimer/

   // Begin Interval /stopTimer/
   stopTimer = () => {
      clearInterval(timer);
   };
   // End Interval /stopTimer/

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
      restartTimer();
      setScoreboardMineCount(configMap.mineFieldNumMines);

      // Following initialization functions
      populateMineGrid();
      addEventListeners();
      addGameButtons();

      return true;
   };
   // End public method /initModule/

   // -------- END PUBLIC METHODS -------- //

   return {
      configModule : configModule,
      initModule   : initModule
   };
}());