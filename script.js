"use strict";
const DOM = (() => {
    const fieldButton = document.querySelectorAll('.field-button');
    const xButton = document.querySelector('#X');
    const oButton = document.querySelector('#O');
    const resetButton = document.querySelector('.reset');
    const gameContainer = document.querySelector('.game-container');
    const endText = document.querySelector('.end-text');
    const easyButton = document.querySelector('#easy');
    const mediumButton = document.querySelector('#medium');
    const playerScore = document.querySelector('.player-score-number');
    const computerScore = document.querySelector('.computer-score-number');

    const getButton = (button) => {
        switch(button) {
            case 'reset': 
                return resetButton;
            break;
            case 'field': 
                return fieldButton;
            break;
            case 'gameContainer':
                return gameContainer;
            break;
            case 'endText':
                return endText;
            break;
            case 'xButton':
                return xButton;
            break;
            case 'yButton':
                return oButton;
            break;
            case 'easyButton':
                return easyButton;
            break;
            case 'mediumButton':
                return mediumButton;
            break;
            case 'playerScore':
                return playerScore;
            break;
            case 'computerScore':
                return computerScore;
            break;

        }
    }
    return{getButton}
})()


const gameBoard = (() => {
    let playerTurn = true;
    const getTurn = () => {
        return playerTurn
    }
    let hasWon = false;
   
    const fieldButton = DOM.getButton('field')
    let board = [fieldButton[0].textContent, fieldButton[1].textContent, 
                fieldButton[2].textContent, fieldButton[3].textContent, 
                fieldButton[4].textContent, fieldButton[5].textContent, 
                fieldButton[6].textContent, fieldButton[7].textContent, 
                fieldButton[8].textContent];
    
    
    
    const getBoard = () => {
        return board;
    }
    const checkForWinner = (board, xORy) => {
        //checks for horizontal win
        
        if(board[6] === board[7] && board[6] === board[8] && board[6] != '' && hasWon === false||
            board[3] === board[4] && board[3] === board[5] && board[3] != '' && hasWon === false||
            board[0] === board[1] && board[0] === board[2] && board[0] != '' && hasWon === false||
            
            //checks for vertical win
            board[8] === board[5] && board[8] === board[2] && board[8] != '' && hasWon === false||
            board[7] === board[4] && board[7] === board[1] && board[7] != '' && hasWon === false||
            board[6] === board[3] && board[6] === board[0] && board[6] != '' && hasWon === false||
            
            //checks for diagonal win
            board[8] === board[4] && board[8] === board[0] && board[8] != '' && hasWon === false||
            board[6] === board[4] && board[6] === board[2] && board[6] != '' && hasWon === false) {
                
                hasWon = true;
                reset(xORy);
                
                
                displayController.endBoard(xORy);
                return 'Winner'
        }
        else if(board[0] != '' && board[1] != '' && board[2] != '' && board[3] != '' && board[4] != '' &&
        board[5] != '' && board[6] != '' && board[7] != '' && board[8] != ''){
            hasWon = true;
            console.log('hi')
                reset();
                displayController.endBoard('tie');
                return 'Winner'
        }
    }
    const getHasWon = () => {
       
        return hasWon
    }
    
    const reset = (XOrO) => {
        const resetButton = DOM.getButton('reset');
        resetButton.setAttribute('style', 'visibility: visible');
        const gameContainer = DOM.getButton('gameContainer')
        const endText = DOM.getButton('endText')

        resetButton.addEventListener('click', () => {
            AI.turnReset();
            gameContainer.removeChild(endText)
            resetButton.setAttribute('style', 'visibility: hidden');
            for(let i = 0; i < board.length; i++) {
                gameContainer.appendChild(fieldButton[i])
                board[i] = fieldButton[i].textContent = '';
                hasWon = false;
                
                
            }
            if(player1.getSymbol() === 'O') {
                setTimeout(AI.easyAI, 200, board)
            }
            
        })
    }


    return {getBoard, checkForWinner, getTurn, getHasWon, reset}
})();
const player = () => {
    let playerScore = 0;
    
    const addToPlayerScore = () => {
        playerScore += 1;
        console.log(playerScore)
        localStorage.setItem('playerScore', playerScore);
        const playerScoreText = DOM.getButton('playerScore');
        console.log(playerScoreText)
        playerScoreText.textContent = playerScore;
        return playerScore;
    }
    const getPlayerScoreStorage = () => {
        if(Number(localStorage.playerScore) >= 1) {
            playerScore = Number(localStorage.playerScore)
            const playerScoreText = DOM.getButton('playerScore');
            playerScoreText.textContent = playerScore;
            return playerScore;
        }
    }
    

    const xButton = DOM.getButton('xButton');
    const oButton = DOM.getButton('yButton');
    let board = gameBoard.getBoard()
    const gameContainer = DOM.getButton('gameContainer');
    const fieldButton = DOM.getButton('field')
    
    let symbol = 'X'
    const getSymbol = () => {
        return symbol
    }

    xButton.addEventListener('click', () => {
        xButton.classList.add('pressed')
        oButton.classList.remove('pressed')
        oButton.classList.add('unpressed')
        symbol = 'X'
        for(let i = 0; i < board.length; i++) {
            board[i] = fieldButton[i].textContent = '';
        }
    } )
    oButton.addEventListener('click', () => {
        oButton.classList.add('pressed')
        xButton.classList.remove('pressed')
        xButton.classList.add('unpressed')
        symbol = 'O'
        
        for(let i = 0; i < board.length; i++) {
            board[i] = fieldButton[i].textContent = '';
        }
         
        setTimeout(AI.easyAI, 200, board)
    } )
   
    

    return{getSymbol, getPlayerScoreStorage, addToPlayerScore}
   
}
const player1 = player();
const AI = (() => {
    let computerScore = 0;
    const addToComputerScore = () => {
        const computerScoreText = DOM.getButton('computerScore');
        computerScore += 1;
        computerScoreText.textContent = computerScore;
        localStorage.setItem('computerScore', computerScore)
        return computerScore
    }
    const fieldButton = DOM.getButton('field');
    const easyButton = DOM.getButton('easyButton');
    const mediumButton = DOM.getButton('mediumButton');
    let board = gameBoard.getBoard();
    let difficulty = 'easy';
    
    const getComputerScoreStorage = () => {
        if(Number(localStorage.computerScore) >= 1) {
            computerScore = Number(localStorage.computerScore)
            const computerScoreText = DOM.getButton('computerScore');
            computerScoreText.textContent = computerScore;
            return computerScore;
        }
    }
    const getDifficulty = () => {
        return difficulty
    }
    easyButton.addEventListener('click', () => {
        let symbol = player1.getSymbol();
        easyButton.classList.add('pressed');
        easyButton.classList.remove('unpressed');
        mediumButton.classList.add('unpressed');
        mediumButton.classList.remove('pressed')
        difficulty = 'easy';
        for(let i = 0; i < board.length; i++) {
            board[i] = fieldButton[i].textContent = '';
        }
        if(symbol === 'O') {
            easyAI(board);
        }
        turn = 0;

    })
    mediumButton.addEventListener('click', () => {
        let symbol = player1.getSymbol();
        mediumButton.classList.add('pressed');
        mediumButton.classList.remove('unpressed');
        easyButton.classList.add('unpressed');
        easyButton.classList.remove('pressed')
        difficulty = 'medium';
        for(let i = 0; i < board.length; i++) {
            board[i] = fieldButton[i].textContent = '';
        }
        if(symbol === 'O') {
            mediumAI(board);
        }
        turn = 0;

    })
    
    let computerTurn = false;
    
    const getComputerTurn = () => {return computerTurn}
    
    const randomIndex = () => {
        let index = Math.floor(Math.random() * 9);
        return index
    }
    const easyAI = (board) => {
        const computerSymbol = (player1.getSymbol() === 'X') ? 'O' : 'X';
        let index = randomIndex()
            
        if(fieldButton[index].textContent != 'X' && fieldButton[index].textContent != 'O') {
            board[index] = fieldButton[index].textContent = computerSymbol;
            setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
        }
        else{
            easyAI(board)
        }
    }
    let turn = 0;
    const turnReset = () => {
        turn = 0;
    }
    const mediumAI = (board) => {
        turn += 1;
        console.log(turn)
        let symbol = player1.getSymbol();
        let index = randomIndex()
        computerTurn = true;
        const computerSymbol = (player1.getSymbol() === 'X') ? 'O' : 'X';
        console.log(board)
        for(let i = 0; i < board.length; i++) {
            //checks for possible horizontal winning move
            if(board[i] === computerSymbol && board[(i + 1)] === computerSymbol && board[(i + 2)] === '' && board[i] != ''){
                if(i === 0 || i === 3 || i === 6) {
                    board[(i + 2)] = fieldButton[(i + 2)].textContent = computerSymbol;
                    setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                    console.log(1)
                    computerTurn = false;
                    break;
                }
            }
            else if(board[i] === computerSymbol && board[(i + 1)] === computerSymbol && board[(i - 1)] === '' && board[i] != ''){
                if(i === 1 || i === 4 || i === 7) {
                    board[(i - 1)] = fieldButton[(i - 1)].textContent = computerSymbol;
                    setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                    console.log(2)
                    computerTurn = false;
                    break;
                    
                }
            }
            else if(board[i] === computerSymbol && board[(i + 2)] === computerSymbol && board[(i + 1)] === '' && board[i] != '') {
                if(i === 0 || i === 3 || i === 6) {
                    board[(i + 1)] = fieldButton[(i + 1)].textContent = computerSymbol;
                    setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                    console.log(2.5)
                    computerTurn = false;
                    break;
                }
            }
            //checks for possible vertical winning move
            else if(board[i] === computerSymbol && board[(i + 3)] === computerSymbol && board[(i + 6)] === ''){
                
                if(i === 0 || i === 1 || i === 2) {
                    board[(i + 6)] = fieldButton[(i + 6)].textContent = computerSymbol;
                    setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                    console.log(3)
                    computerTurn = false;
                    break;
                }
            }
            else if(board[i] === computerSymbol && board[(i + 3)] === computerSymbol && board[(i - 3)] === '') {
                if(i === 3 || i === 4 || i === 5) {
                    board[(i - 3)] = fieldButton[(i - 3)].textContent = computerSymbol;
                    setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                    console.log(4)
                    computerTurn = false;
                    break;
                }
            }
            //checks for posible diagonal winning move
            else if(board[i] === computerSymbol && board[(i + 4)] === computerSymbol && board[(i + 8)] === '' && i === 0) {
               
                board[(i + 8)] = fieldButton[(i + 8)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                console.log(5)
                computerTurn = false;
                break;
                
            }
            else if(board[i] === computerSymbol && board[(i + 2)] === computerSymbol && board[(i + 4)] === '' && i === 2) {
                board[(i + 4)] = fieldButton[(i + 4)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                console.log(6)
                computerTurn = false;
                break;
            }
            else if(board[i] === computerSymbol && board[(i - 2)] === computerSymbol && board[(i - 4)] === '' && i === 6) {
                board[(i - 4)] = fieldButton[(i - 4)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                console.log(7)
                computerTurn = false;
                break;
            }
            else if(board[i] === computerSymbol && board[(i - 4)] === computerSymbol && board[(i - 8)] === '' && i === 8) {
                board[(i - 8)] = fieldButton[(i - 8)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                console.log(8)
                computerTurn = false;
                break;
            }
            else if(board[0] === computerSymbol && board[8] === computerSymbol && board[4] === ''){
                board[4] = fieldButton[4].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                console.log(9)
                computerTurn = false;
                break;
            }
            else if(board[2] === computerSymbol && board[6] === computerSymbol && board[4] === '') {
                board[4] = fieldButton[4].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                console.log(10)
                computerTurn = false;
                break;
            }

        }
         for(let i = 0; i < board.length; i++) {
            //checks for possible opponent horizontal win
             if(board[i] === board[(i + 1)] && board[(i + 2)] === ''&& board[i] != '' &&
             i != 2 && i != 5 && i != 8 && i != 1 && i != 4 && i != 7 && computerTurn) {
                
                board[(i + 2)] = fieldButton[(i + 2)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                console.log(11)
                computerTurn = false;
                
                break;
            }
            else if(board[i] === board[(i - 1)] && board[(i - 2)] === '' && board[i] != '' && 
            i != 0 && i != 1 && i != 3 && i != 4 && i != 6 && i != 7 && computerTurn){
                board[(i - 2)] = fieldButton[(i - 2)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                computerTurn = false;
                console.log(12)
                
                break;
            }
            else if(board[i] === board[(i + 2)] && board[(i + 1)] === '' && board[i] != '' && computerTurn) {
                if(i === 0 || i === 3 || i === 6) {
                    board[(i + 1)] = fieldButton[(i + 1)].textContent = computerSymbol;
                    setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                    computerTurn = false;
                    console.log(12.5)
                    break;
                }
            }
            //checks for possible opponent vertical win
            else if(board[i] === board[(i + 3)] && board[i] != '' && i <= 2 && board[(i+6)] === '' && computerTurn) {
                board[(i + 6)] = fieldButton[(i + 6)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                computerTurn = false;
                console.log(13)
                break
            }
            else if(board[i] === board[(i - 3)] && board[i] != '' && i >= 6 && board[(i - 6)] === '' && computerTurn) {
                board[(i - 6)] = fieldButton[(i - 6)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                computerTurn = false;
                console.log(14)
                break
            }
            else if(board[i] === board[(i + 6)] && board[i] != '' && i < 4 && board[(i + 3)] === '' && computerTurn) {
                board[(i + 3)] = fieldButton[(i + 3)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                computerTurn = false;
                console.log(14.5)
                break

            }
            //checks for possible oponent diagonal win
            else if(board[i] === board[(i + 4)] && board[i] != '' && board[(i + 8)] === '' && i === 0 && computerTurn) {
                board[(i + 8)] = fieldButton[(i + 8)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                computerTurn = false;
                console.log(15)
                break
            }
            else if(board[i] === board[(i - 4)] && board[i] != '' && board[(i - 8)] === '' && i === 8 && computerTurn) {
                board[(i - 8)] = fieldButton[(i - 8)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                computerTurn = false;
                console.log(16)
                break
            }
            else if(board[i] === board[(i + 2)] && board[i] != '' && board[(i + 4)] === '' && i === 2 && computerTurn) {
                board[(i + 4)] = fieldButton[(i + 4)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                computerTurn = false;
                console.log(17)
                break
            }
            else if(board[i] === board[(i - 2)] && board[i] != '' && board[(i - 4)] === '' && i === 6 && computerTurn) {
                board[(i - 4)] = fieldButton[(i - 4)].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                computerTurn = false;
                console.log(18)
                break
            }
            else if(board[0] === symbol && board[8] === symbol && board[4] === '' && computerTurn){
                board[4] = fieldButton[4].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                computerTurn = false;
                console.log(19)
                break
            }
            else if(board[2] === symbol && board[6] === symbol && board[4] === '' && computerTurn) {
                board[4] = fieldButton[4].textContent = computerSymbol;
                setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
                computerTurn = false;
                console.log(20)
                break
            }
            else if(computerTurn && turn === 1 && board[4] === '') {
                board[4] = fieldButton[4].textContent = computerSymbol;
                
                computerTurn = false;
            }
            
        }
        
    
        if(fieldButton[index].textContent != 'X' && fieldButton[index].textContent != 'O' && computerTurn) {
            board[index] = fieldButton[index].textContent = computerSymbol;
            setTimeout(gameBoard.checkForWinner, 300, board, computerSymbol);
            computerTurn = false;
            
        }
        else if(fieldButton[index].textContent === 'X' && computerTurn || fieldButton[index].textContent === 'O' && computerTurn) {
            console.log('mediumAI')
            mediumAI(board);
        }
        

    }
    
    



    return {easyAI, getComputerTurn, mediumAI, getDifficulty, turnReset, addToComputerScore, getComputerScoreStorage}
})()


const displayController = (() => {
    const fieldButton = DOM.getButton('field')
    let board = gameBoard.getBoard();
    let fullCount = 0;
    
    
    const renderBoard = (xORy) => {
        for(let i = 0; i < fieldButton.length; i++) {
            
            fieldButton[i].addEventListener('click', () => {
                let difficulty = AI.getDifficulty();
                let computerTurn = AI.getComputerTurn()
                let symbol = player1.getSymbol();
                const hasWon = gameBoard.getHasWon();
                
                if(fieldButton[i].textContent === '' && computerTurn === false && hasWon === false) {
                    board[i] = fieldButton[i].textContent = symbol
                    
                    if(gameBoard.checkForWinner(board, symbol) != 'Winner' && difficulty === 'easy') {
                        setTimeout(AI.easyAI, 500, board);
                        
                        computerTurn = true;
                    }
                    if(gameBoard.checkForWinner(board, symbol) != 'Winner' && difficulty === 'medium') {
                        setTimeout(AI.mediumAI, 500, board);
                        
                        computerTurn = true;
                    }
                    45
                }
                if(fullCount === 45) {
                    gameBoard.reset(board[i]);
                    endBoard('tie')
                }
            })

            if(fieldButton[i].textContent != '') {
                fullCount += 1;
              
            }
            
        }
       
    
        
    }
    const endBoard = (xORy) => {
        const playerSymbol = player1.getSymbol()
        
        if(xORy === playerSymbol) {
            player1.addToPlayerScore();
        }
        if(xORy != playerSymbol && xORy != 'tie') {
            AI.addToComputerScore();
        }
        const gameContainer = DOM.getButton('gameContainer');
        const endText = DOM.getButton('endText');
        if(xORy != 'tie') {
            gameContainer.querySelectorAll('*').forEach(n => n.remove())
        
            endText.textContent = xORy + ' Wins!';
            gameContainer.appendChild(endText)
        }
        else {
            gameContainer.querySelectorAll('*').forEach(n => n.remove())
        
            endText.textContent = 'It\'s a tie!';
            gameContainer.appendChild(endText)
        }
        
    }

    return {renderBoard, endBoard}
})();

console.log(displayController.renderBoard())
console.log(AI.getComputerScoreStorage())
console.log(player1.getPlayerScoreStorage())



