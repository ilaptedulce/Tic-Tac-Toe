const cells = Array.from(document.querySelectorAll('.grid-item'))
const message = document.getElementById('status')

const xPlayer = 'X'
const oPlayer = 'O'
let clickCounter = 0
let xGameMoves = []
let oGameMoves = []

const win1 = [0, 1, 2]
const win2 = [3, 4, 5]
const win3 = [6, 7, 8]
const win4 = [0, 4, 8]
const win5 = [2, 4, 6]
const win6 = [0, 3, 6]
const win7 = [1, 4, 7]
const win8 = [2, 5, 8]

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (message.innerHTML === 'Player X turn' || message.innerHTML === 'Player O turn') {
      handleClick(index)
      checkWin()
      recordWin()
    }
  })
})

function handleClick (index) {
  if (cells[index].innerHTML === '') {
    clickCounter++
    togglePlayer()
    insertSign(index)
  } else {
    return false
  }
}
function insertSign (index) {
  if (clickCounter % 2 === 0) {
    cells[index].innerHTML = oPlayer
    cells[index].classList.add('noHover')
    oGameMoves.push(index)
  } else {
    cells[index].innerHTML = xPlayer
    cells[index].classList.add('noHover')
    xGameMoves.push(index)
  }
}
function togglePlayer () {
  if (clickCounter % 2 === 0) {
    message.innerHTML = 'Player X turn'
  } else {
    message.innerHTML = 'Player O turn'
  }
}

function containsAll (condition, moves) {
  return condition.every(i => moves.includes(i))
}

function tie () {
  if (clickCounter >= 9) {
    message.innerHTML = 'This game is a tie'
    message.classList.add('win-text')
  }
}

function getEmptyCells () {
  cells.forEach((cell) => {
    if (cell.innerHTML === '') {
      cell.classList.add('noHover')
    }
  })
}

function checkWin () {
  if (containsAll(win1, xGameMoves) || containsAll(win2, xGameMoves) || containsAll(win3, xGameMoves) ||
    containsAll(win4, xGameMoves) || containsAll(win5, xGameMoves) || containsAll(win6, xGameMoves) ||
    containsAll(win7, xGameMoves) || containsAll(win8, xGameMoves)) {
    message.innerHTML = 'X player won'
    xWin += 1
    getEmptyCells()
    message.classList.add('win-text')
  } else if (containsAll(win1, oGameMoves) || containsAll(win2, oGameMoves) || containsAll(win3, oGameMoves) ||
    containsAll(win4, oGameMoves) || containsAll(win5, oGameMoves) || containsAll(win6, oGameMoves) ||
    containsAll(win7, oGameMoves) || containsAll(win8, oGameMoves)) {
    message.innerHTML = 'O player won'
    oWin += 1
    getEmptyCells()
    message.classList.add('win-text')
  } else {
    tie()
  }
}
const restartBtn = document.querySelector('.restart')
restartBtn.addEventListener('click', () => restartGame())
function restartGame () {
  clickCounter = 0
  xGameMoves = []
  oGameMoves = []
  message.innerHTML = 'Player X turn'
  message.classList.remove('win-text')
  cells.forEach((cell) => {
    cell.innerHTML = ''
    cell.classList.remove('noHover')
  })
}
const xWon = document.getElementById('xWin')
const oWon = document.getElementById('oWin')
const totalScore = document.getElementById('total')
let xWin = 0
let oWin = 0
let total = 0
const displayScore = ({ total, xWin, oWin }) => {
  if (message.innerHTML === 'X player won') {
    xWon.innerHTML = `X-Wins: ${xWin}`
  }
  if (message.innerHTML === 'O player won') {
    oWon.innerHTML = `O-Wins: ${oWin}`
  }
  totalScore.innerHTML = `Games played ${total}`
}
function recordWin () {
  total += 1
  displayScore({ total, xWin, oWin })
  request({ total, xWin, oWin })
}
const request = (data) => {
  fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(data => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
fetch('http://localhost:3000/gameData').then(res => res.json())
  .then(data => {
    total = data.total
    xWin = data.xWin
    oWin = data.oWin
  })
