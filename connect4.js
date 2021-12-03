/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/*   makeBoard: create in-JS board structure:
     board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
 for (let y=0; y < HEIGHT; y++) {
   board.push(new Array(WIDTH));
 }
}

// makeHtmlBoard: make HTML table and row of column tops. 

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');
  // Creates a row, assigns CSS and listens for click
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // uses the height & width variables to determine how many rows & cells and creates them
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

// findSpotForCol: given column x, return top empty y (null if filled) 

function findSpotForCol(x) {
  for (y = HEIGHT-1 ; y >= 0 ; y--) {
      if (board[y][x] == undefined) {
        return y;
      }   
  }
  return null;
  // return 0;
}

// placeInTable: update DOM to place piece into HTML table of board 

function placeInTable (x, y) {
  const pieceInTable = document.createElement("div");
  // console.log(y,x);
  if (currPlayer == 1) {
    pieceInTable.classList.add("piece", "p1");
  }
  else {
    pieceInTable.classList.add("piece","p2");
  }
  // console.log(`${y}-${x}`);
  const correctTableCell= document.getElementById(`${y}-${x}`);
  correctTableCell.append(pieceInTable);
  
}


// endGame: announce game end 

function endGame(msg) {
  alert (msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table

  // console.log(x,y);
  placeInTable(x, y);
  board[y][x] = currPlayer;
  //switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
  console.log(currPlayer);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every(`${y}`, row.every(cell => cell))) {
    return endGame('Tie!');

}
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    /* Check four cells to see if they're all color of current player
      - cells: list of four (y, x) cells
      - returns true if all are legal coordinates & all match currPlayer */

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  /* Loops through the columns and cells in each column, and creates a variable for each way to win. 
  Uses those variables in the _win function from above and if any of them are true, 
  then it ends the game.*/

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
