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
// const cellMode2 = [0, 1, 2, 3, 4, 5, 6, 7, 8] //chỉ để lấy index, còn bảng tạo ra vẫn build từ mảng cells ở trên cùng

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
    // //lấy dc index cái cell mà player vừa click
    // const valP = e.target.id
    // console.log(e.target.id);
    // const cellP = cellMode2.indexOf(valP)

    // //xóa phần tử có index cellP trong mảng cellMode2
    // console.log(cellMode2);
    // cellMode2.splice(cellP, 1);
    // console.log(cellMode2);

    // //computer turn 
    // compChoice(cellMode2, go, gogo)
}

// function compChoice(arr) {
//     //get random index from arr 
//     const randIdx = Math.floor(Math.random() * arr.length);
//     console.log(randIdx);
//     // const cellComp = document.getElementById(randIdx) //dom to cell with id equal to randIdx

//     // //display the content of the selected cell
//     // const square = document.createElement('div')
//     // square.classList.add(go)
//     // if (go === "circle") {
//     //     square.innerHTML = `  
//     //         <img src="/image/dogecoin-logo.png" alt="" />
//     //     `
//     // } else {
//     //     square.innerHTML = `  
//     //         <img src="/image/salad-cat.png" alt="" />
//     //     `
//     // }
//     // cellComp.target.append(square)

//     // //
//     // cellMode2.splice(randIdx, 1);

//     // go = (go === "circle" ? "cross" : "circle")
//     // gogo = (go === "circle" ? "doge" : "cat")
//     // displayTurn.textContent = "it is " + gogo + "'s turn."
//     // checkWin()
// }

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
        displayTurn.textContent = "Draw!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        //restart button
        document.querySelector(".restart").style.display = 'block'
        return true
    }

    // winningCombos.forEach(array => {
    //     const circleWins = array.every(indexCell =>
    //         allSquares[indexCell].firstChild?.classList.contains('circle')
    //     )

    //     const crossWins = array.every(indexCell =>
    //         allSquares[indexCell].firstChild?.classList.contains('cross')
    //     )

    //     const isDraw = [...allSquares].every(index =>
    //         allSquares[index].classList.contains('circle')
    //         ||
    //         allSquares[index].classList.contains('cross')
    //     )
    //     if (circleWins) {
    //         // displayTurn.textContent = "Circle Wins!"
    //         winAlready = true
    //         displayTurn.textContent = "Doge Wins!"
    //         allSquares.forEach(square => square.replaceWith(square.cloneNode(true))) //xóa hết các event listener của các square
    //         //restart button
    //         document.querySelector(".restart").style.display = 'block'
    //         console.log("aaaaa");
    //         return
    //     }
    //     else if (crossWins) {
    //         // displayTurn.textContent = "Cross Wins!"
    //         winAlready = true
    //         displayTurn.textContent = "Cat Wins!"
    //         allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
    //         //restart button
    //         document.querySelector(".restart").style.display = 'block'
    //         console.log("bbbbb");
    //         return
    //     }
    //     // cntChecked === 9 && !circleWins && !crossWins
    //     else if (isDraw) {
    //         displayTurn.textContent = "Draw!"
    //         allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
    //         //restart button
    //         document.querySelector(".restart").style.display = 'block'
    //         return
    //     }
    // })
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

