const boardGame = document.querySelector(".gameZone")
const displayTurn = document.querySelector(".turn")

let cells = ["", "", "", "", "", "", "", "", ""]
let go = "circle"

displayTurn.textContent = "Circle goes first!"

function createBoard() {
    cells.forEach((_cell, index) => {
        const square = document.createElement('div')
        square.classList.add('singleSquare')
        square.id = index
        square.addEventListener('click', handleClick, { once: true })
        boardGame.append(square)
    })
}

createBoard()

function handleClick(e) {
    const circle = document.createElement('div')
    circle.classList.add(go)
    e.target.append(circle)

    go = (go === "circle" ? "cross" : "circle")
    displayTurn.textContent = go + "'s turn"

    checkWin()
}

let countCheck = 0;
let winAlready = false;

function checkWin() {
    countCheck++;

    const allCells = document.querySelectorAll(".singleSquare")
    const winningCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    winningCombo.forEach(array => {
        const circleWins = array.every(cellIndex =>
            allCells[cellIndex].firstChild?.classList.contains('circle')
        )

        if (circleWins) {
            winAlready = true
            displayTurn.textContent = "Circle wins!"
            allCells.forEach(square => square.replaceWith(square.cloneNode(true)))

            document.querySelector(".restart").style.display = 'block'
            return
        }
    })

    winningCombo.forEach(array => {
        const crossWins = array.every(cellIndex =>
            allCells[cellIndex].firstChild?.classList.contains('cross')
        )

        if (crossWins) {
            winAlready = true
            displayTurn.textContent = "Cross Wins!"
            allCells.forEach(square => square.replaceWith(square.cloneNode(true)))

            document.querySelector(".restart").style.display = 'block'
            return
        }

    })

    if (countCheck == 9 && winAlready === false) {
        displayTurn.textContent = "Draw!"
        allCells.forEach(square => square.replaceWith(square.cloneNode(true)))
        document.querySelector(".restart").style.display = 'block'
        return
    }
}

function clearBoard() {
    boardGame.innerHTML = ""
}

document.querySelector(".restart").addEventListener('click', event => {
    clearBoard()
    document.querySelector(".restart").style.display = 'none'
    go = "circle"
    displayTurn.textContent = "Circle goes first!"
    countCheck = 0
    winAlready = false
    createBoard()
})


