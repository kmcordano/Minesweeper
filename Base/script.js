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


const spaces = document.querySelectorAll('.space');
let id = 0;
spaces.forEach((space) => {
   space.id = id++;
   space.addEventListener('click', () => {
      space.classList.add('uncovered');
      space.innerHTML = '' + grid[Math.floor(space.id / numCols)][space.id % numCols];
   });
});