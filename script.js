"use strict";
const DOM = (() => {
    const fieldButton = document.querySelectorAll('.field-button');
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

        resetButton.addEventListener('click', () => {
            window.location.reload(true);
        })
    }


    return {getBoard, checkForWinner, getTurn, getHasWon, reset}
})();


const displayController = (() => {
    const fieldButton = DOM.getButton('field')
    let board = gameBoard.getBoard();
    let fullCount = 0;
    
    let playerTurn = gameBoard.getTurn();
    const renderBoard = (xORy) => {
        for(let i = 0; i < fieldButton.length; i++) {
            
            fieldButton[i].addEventListener('click', () => {
                const hasWon = gameBoard.getHasWon();
                
                if(fieldButton[i].textContent === '' && playerTurn === true && hasWon === false) {
                    board[i] = fieldButton[i].textContent = 'X'
                    playerTurn = false;
                    displayController.renderBoard(board[i]); 
                    gameBoard.checkForWinner(board, board[i])
                    
                
                }
                else if(fieldButton[i].textContent === '' && playerTurn === false && hasWon === false) {
                    board[i] = fieldButton[i].textContent = 'O'
                    playerTurn = true;
                    displayController.renderBoard(board[i]); 
                    gameBoard.checkForWinner(board, board[i])
                }
                if(fullCount === 45) {
                    gameBoard.reset();
                }
            })

            if(fieldButton[i].textContent != '') {
                fullCount += 1;
              
            }
            
        }
       
    
        
    }
    const endBoard = (xORy) => {
        const gameContainer = DOM.getButton('gameContainer');
        gameContainer.querySelectorAll('*').forEach(n => n.remove())
        const endText = DOM.getButton('endText');
        endText.textContent = xORy + ' Wins!';
        gameContainer.appendChild(endText)
        
    }

    return {renderBoard, endBoard}
})();

console.log(displayController.renderBoard())

const player = () => {

    const player1 = () => {
        return 'X'
    };



    return{player1}
}