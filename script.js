"use strict";
const DOM = (() => {
    const fieldButton = document.querySelectorAll('.field-button');
    const xButton = document.querySelector('#X');
    const oButton = document.querySelector('#O');
    const resetButton = document.querySelector('.reset');
    const gameContainer = document.querySelector('.game-container');
    const endText = document.querySelector('.end-text');
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

        }
    }
    return{getButton}
})()
const player = () => {

    const xButton = DOM.getButton('xButton');
    const oButton = DOM.getButton('yButton');
    
    
    let symbol = 'X'
    const getSymbol = () => {
        return symbol
    }

    xButton.addEventListener('click', () => {
        xButton.classList.add('pressed')
        oButton.classList.remove('pressed')
        oButton.classList.add('unpressed')
        symbol = 'X'
    } )
    oButton.addEventListener('click', () => {
        oButton.classList.add('pressed')
        xButton.classList.remove('pressed')
        xButton.classList.add('unpressed')
        symbol = 'O'
    } )
   
    

    return{getSymbol}
   
}
const player1 = player();
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
        if(board[6] === board[7] && board[6] === board[8] && board[6] != ''||
            board[3] === board[4] && board[3] === board[5] && board[3] != ''||
            board[0] === board[1] && board[0] === board[2] && board[0] != '' ||
            
            //checks for vertical win
            board[8] === board[5] && board[8] === board[2] && board[8] != ''||
            board[7] === board[4] && board[7] === board[1] && board[7] != ''||
            board[6] === board[3] && board[6] === board[0] && board[6] != '' ||
            
            //checks for diagonal win
            board[8] === board[4] && board[8] === board[0] && board[8] != '' ||
            board[6] === board[4] && board[6] === board[2] && board[6] != '' ) {
                hasWon = true;
                reset();
                
                displayController.endBoard(xORy);
                return 'Winner'

        }
    }
    const getHasWon = () => {
       
        return hasWon
    }
    
    const reset = () => {
        const resetButton = DOM.getButton('reset');
        resetButton.setAttribute('style', 'visibility: visible');
        const gameContainer = DOM.getButton('gameContainer')

        resetButton.addEventListener('click', () => {
            window.location.reload(true);
        })
    }


    return {getBoard, checkForWinner, getTurn, getHasWon, reset}
})();


const AI = (() => {
    const fieldButton = DOM.getButton('field')
    const computerSymbol = (player1.getSymbol() === 'X') ? 'O' : 'X';
    let computerTurn = false;
    
    const getComputerTurn = () => {return computerTurn}
    
    const randomIndex = () => {
        let index = Math.floor(Math.random() * 9);
        return index
    }
    const easyAI = (board) => {
        
        let index = randomIndex()
            
        if(fieldButton[index].textContent != 'X' && fieldButton[index].textContent != 'O') {
            board[index] = fieldButton[index].textContent = computerSymbol;
            gameBoard.checkForWinner(board, board[index]) 
            setTimeout(gameBoard.checkForWinner, 800, board, board[index]);
        }
        else{
            easyAI(board)
                
        }

            
        
        
        
    }
    




    return {easyAI, getComputerTurn}
})()


const displayController = (() => {
    const fieldButton = DOM.getButton('field')
    let board = gameBoard.getBoard();
    let fullCount = 0;
    
    
    const renderBoard = (xORy) => {
        for(let i = 0; i < fieldButton.length; i++) {
            
            fieldButton[i].addEventListener('click', () => {
                let computerTurn = AI.getComputerTurn()
                let symbol = player1.getSymbol();
                const hasWon = gameBoard.getHasWon();
                
                if(fieldButton[i].textContent === '' && computerTurn === false && hasWon === false) {
                    board[i] = fieldButton[i].textContent = symbol
                    console.log(gameBoard.checkForWinner(board, 'X') != 'Winner')
                    if(gameBoard.checkForWinner(board, 'X') != 'Winner') {
                        setTimeout(AI.easyAI, 500, board);
                        computerTurn = true;
                        console.log('hi')
                    }
                
                }
                if(fullCount === 45) {
                    gameBoard.reset();
                    endBoard('tie')
                }
            })

            if(fieldButton[i].textContent != '') {
                fullCount += 1;
              
            }
            
        }
       
    
        
    }
    const endBoard = (xORy) => {
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




