const numRows = 9;
const numCols = 9;

const grid = new Array(numRows);
for(let i = 0; i < numRows; i++) {
   grid[i] = new Array(numCols).fill(0);
}

var row, col;
for(let i = 0; i < 10; i++) {
   row = getRandomInt(numRows);
   col = getRandomInt(numCols);

   grid[row][col] = -1;
   incrementNeighbors(row, col);
}

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
};

function incrementNeighbors(row, col) {
   if(row > 0 && grid[row-1][col] != -1) {
      grid[row-1][col]++;
   }

   if(row > 0 && col < numCols - 1 && grid[row-1][col-1] != -1) {
      grid[row-1][col+1]++;
   }

   if(col < numCols - 1 && grid[row][col+1] != -1) {
      grid[row][col+1]++;
   }

   if(row < numRows - 1 && col < numCols - 1 && grid[row+1][col+1] != -1) {
      grid[row+1][col+1]++;
   }

   if(row < numRows - 1 && grid[row+1][col] != -1) {
      grid[row+1][col]++;
   }

   if(row < numRows - 1 && col > 0 && grid[row+1][col-1] != -1) {
      grid[row+1][col-1]++;
   }

   if(col > 0 && grid[row][col-1] != -1) {
      grid[row][col-1]++;
   }

   if(row > 0 && col > 0 && grid[row-1][col-1] != -1) {
      grid[row-1][col-1]++;
   }
};

function uncover(id) {
   var queue = new Array();
   var at;
   var numMines;
   var space;

   queue.push([Math.floor(id / numCols), id % numCols]);
   while(queue.length > 0) {
      at = queue.shift();
      numMines = grid[at[0]][at[1]];
      space = document.getElementById((at[0] * numCols) + at[1]);

      if(space.classList.contains('uncovered')) {
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

function checkBounds(row, col) {
   return (row < numRows) 
       && (row >= 0)
       && (col < numCols)
       && (col >= 0);
}


const spaces = document.querySelectorAll('.space');
let id = 0;
spaces.forEach((space) => {
   space.id = id++;
   space.addEventListener('click', () => {
      uncover(space.id);
   });
});