const NUM_ROWS = 9;
const NUM_COLS = 9;
const NUM_MINES = 10;

const $timer = document.querySelector('.timer');
const $mineCount = document.querySelector('.mine-count');

var time = 0;
var mineTracker = NUM_MINES;

const grid = new Array(NUM_ROWS);
for(let i = 0; i < NUM_ROWS; i++) {
   grid[i] = new Array(NUM_COLS).fill(0);
}

var row, col;
for(let i = 0; i < NUM_MINES; i++) {
   row = getRandomInt(NUM_ROWS);
   col = getRandomInt(NUM_COLS);

   grid[row][col] = -1;
   incrementNeighbors(row, col);
}

$mineCount.innerHTML = NUM_MINES;
$timer.innerHTML = time;

setInterval(() => {
   time++;
   $timer.innerHTML = time;
}, 1000);

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
};

function incrementNeighbors(row, col) {
   if(checkBounds(row-1, col) && grid[row-1][col] != -1) {
      grid[row-1][col]++;
   }

   if(checkBounds(row-1, col+1) && grid[row-1][col+1] != -1) {
      grid[row-1][col+1]++;
   }

   if(checkBounds(row, col+1) && grid[row][col+1] != -1) {
      grid[row][col+1]++;
   }

   if(checkBounds(row+1, col+1) && grid[row+1][col+1] != -1) {
      grid[row+1][col+1]++;
   }

   if(checkBounds(row+1, col) && grid[row+1][col] != -1) {
      grid[row+1][col]++;
   }

   if(checkBounds(row+1, col-1) && grid[row+1][col-1] != -1) {
      grid[row+1][col-1]++;
   }

   if(checkBounds(row, col-1) && grid[row][col-1] != -1) {
      grid[row][col-1]++;
   }

   if(checkBounds(row-1, col-1) && grid[row-1][col-1] != -1) {
      grid[row-1][col-1]++;
   }
};

function uncover(id) {
   var queue = new Array();
   var at;
   var numMines;
   var space;

   queue.push([Math.floor(id / NUM_COLS), id % NUM_COLS]);
   while(queue.length > 0) {
      at = queue.shift();
      numMines = grid[at[0]][at[1]];
      space = document.getElementById((at[0] * NUM_COLS) + at[1]);

      if(space.classList.contains('uncovered')
      || space.classList.contains('flag')) {
         continue;
      }

      space.classList.add('uncovered');
      if(numMines > 0) {
         space.innerHTML = numMines.toString();
         space.classList.add('tc' + numMines);
      }
      else if(numMines === -1) {
         space.classList.add('mine-clicked');
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
   }
}

function incrementMines() {
   if(mineTracker >= NUM_MINES) {
      return;
   }
   mineTracker++;
   $mineCount.innerHTML = mineTracker;
}

function decrementMines() {
   if(mineTracker <= 0) {
      return;
   }
   mineTracker--;
   $mineCount.innerHTML = mineTracker;
}

function toggleFlag(id) {
   let space = document.getElementById(id);
   if(!space.classList.contains('uncovered')) {
      // space.classList.toggle('flag');
      if(space.classList.contains('flag')) {
         space.classList.remove('flag');
         incrementMines();
      }
      else {
         space.classList.add('flag');
         decrementMines();
      }
   }
}

function checkBounds(row, col) {
   return (row < NUM_ROWS) 
       && (row >= 0)
       && (col < NUM_COLS)
       && (col >= 0);
}


const spaces = document.querySelectorAll('.space');
let id = 0;
spaces.forEach((space) => {
   space.id = id++;
   space.addEventListener('click', () => {
      uncover(space.id);
   });
   space.addEventListener('contextmenu', () => {
      toggleFlag(space.id);
   })
});