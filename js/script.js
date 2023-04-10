const gameZone = document.querySelector(".gameZone")
const displayTurn = document.querySelector(".turn")
const cells = ["", "", "", "", "", "", "", "", ""]
const gameMenu = document.querySelector(".startGameMenu")

let go = "circle"
let gogo = "doge"

let cntChecked = 0
let winAlready = false


document.querySelector(".btn__twoPlayers").addEventListener('click', event => {
    gameMenu.style.display = 'none'
    displayBoard(1)
})

document.querySelector(".btn__compPlayers").addEventListener('click', event => {
    gameMenu.style.display = 'none'
    displayBoard(2)
})


function displayBoard(choice) {
    displayTurn.textContent = "Doge goes first!"
    cells.forEach((_cell, index) => {
        const singleCell = document.createElement('div')
        singleCell.classList.add('singleSquare')
        singleCell.id = index
        if (choice === 1) {
            singleCell.addEventListener('click', handleClick, { once: true }) // { once: true } is to keep the element can't be clicked again            
        } else if (choice === 2) {
            singleCell.addEventListener('click', handleClickComp, { once: true })
        }
        gameZone.append(singleCell)
    })
}

//mode 1: two players mode
function handleClick(e) {
    const circle = document.createElement('div')
    circle.classList.add(go)

    if (go === "circle") {
        circle.innerHTML = `  
            <img src="/image/dogecoin-logo.png" alt="" />
        `
    } else {
        circle.innerHTML = `  
            <img src="/image/salad-cat.png" alt="" />
        `
    }

    e.target.append(circle)

    //if this turn the value of go is "circle" already, change the value of the next turn
    go = (go === "circle" ? "cross" : "circle")
    gogo = (go === "circle" ? "doge" : "cat")
    displayTurn.textContent = "it is " + gogo + "'s turn."

    //check win
    checkWin()

}

//mode 2: vs computer mode
function handleClickComp(e) {
    const square = document.createElement('div')
    square.classList.add(go)

    if (go === "circle") {
        square.innerHTML = `  
            <img src="/image/dogecoin-logo.png" alt="" />
        `
    } else {
        square.innerHTML = `  
            <img src="/image/salad-cat.png" alt="" />
        `
    }
    e.target.append(square)

    //if this turn the value of go is "circle" already, change the value of the next turn
    go = (go === "circle" ? "cross" : "circle")
    gogo = (go === "circle" ? "doge" : "cat")
    displayTurn.textContent = "it is " + gogo + "'s turn."

    //check win
    checkWin()

    if (winAlready) {
        return
    } else {
        computerMove()
    }
}

function computerMove() {
    const allSquares = document.querySelectorAll(".singleSquare")
    let play = Math.floor(Math.random() * cells.length);
    console.log(play);
    while (allSquares[play].firstChild?.classList.contains('circle') || allSquares[play].firstChild?.classList.contains('cross')) {
        play = Math.floor(Math.random() * cells.length);
    }


    // emptyCells[random].textContent = mark;
    const square = document.createElement('div')
    square.classList.add(go)

    if (go === "circle") {
        square.innerHTML = `  
            <img src="/image/dogecoin-logo.png" alt="" />
        `
    } else {
        square.innerHTML = `  
            <img src="/image/salad-cat.png" alt="" />
        `
    }
    allSquares[play].append(square)
    const selectCell = document.getElementById(play)
    selectCell.removeEventListener("click", handleClickComp);

    //if this turn the value of go is "circle" already, change the value of the next turn
    go = (go === "circle" ? "cross" : "circle")
    gogo = (go === "circle" ? "doge" : "cat")
    displayTurn.textContent = "it is " + gogo + "'s turn."

    //check win
    checkWin()
}



function checkWin() {
    cntChecked++;

    const allSquares = document.querySelectorAll(".singleSquare")
    // console.log(allSquares);
    // console.log(cntChecked);
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(indexCell =>
            //check cái ô có index là indexCell có tồn tại k, nếu có thì check tiếp xem classList có chứa class 'circle' không?
            allSquares[indexCell].firstChild?.classList.contains('circle')
        )

        if (circleWins) {
            winAlready = true
            displayTurn.textContent = "Doge Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            //restart button
            document.querySelector(".restart").style.display = 'block'
            return true
        }

    })

    winningCombos.forEach(array => {
        const crossWins = array.every(indexCell =>
            allSquares[indexCell].firstChild?.classList.contains('cross')
        )

        if (crossWins) {
            winAlready = true
            displayTurn.textContent = "Cat Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            //restart button
            document.querySelector(".restart").style.display = 'block'
            return true
        }

    })

    if (cntChecked == 9 && winAlready === false) {
        winAlready = true
        displayTurn.textContent = "Draw!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        //restart button
        document.querySelector(".restart").style.display = 'block'
        return true
    }
}

function clearBoard() {
    gameZone.innerHTML = ""
}

//restart game
document.querySelector(".restart").addEventListener('click', event => {
    clearBoard()
    document.querySelector(".restart").style.display = 'none'
    gameMenu.style.display = 'flex'
    go = "circle"
    gogo = "doge"
    displayTurn.textContent = ""
    cntChecked = 0
    winAlready = false
    // displayBoard()
})

