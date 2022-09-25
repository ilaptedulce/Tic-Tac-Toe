let board
const playerO = 'O'
const playerX = 'X'
let currPlayer = playerO
const gameOver = false

window.onload = function () { SetGame() }

function SetGame () {
  board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ]
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const tile = document.createElement('div')
      tile.id = r.toString() + '-' + c.toString()
      tile.classList.add('tile')

      if (r === 0 || r === 1) {
        tile.classList.add('horizontal-line')
      }
      if (c === 0 || c === 1) {
        tile.classList.add('vertical-line')
      }
      tile.addEventListener('click', setTile)
      document.getElementById('board').append(tile)
    }
  }
}

function setTile () {
  if (gameOver) {
    return
  }
  let coords = this.id.split('-')
  let r = parseInt(coords[0])
  let c = parseInt(coords[1])

  if (board[r][c] !== ' ') {
    return
  }
  board[r][c] = currPlayer
  this.innerText = currPlayer

  if (currPlayer === playerO) {
    currPlayer = playerX
  }
  else {
    currPlayer = playerO
  }
}
