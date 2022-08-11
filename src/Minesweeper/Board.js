import React from 'react';
import './Board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        const numMines = Math.floor(0.15 * props.rows * props.cols);
        const board = this.generateBoard();
        this.state = {
            rows: props.rows,
            cols: props.cols,
            numMines: numMines,
            mines: (new Array(props.rows)).fill(new Array(props.cols)),
            board: board,
            firstClick: true,
            gameState: this.props.gameState
        }
    }

    // generates board of ints 
    // covered: 0
    // uncovered: 1
    // marked: 2
    // exploded: 3
    generateBoard() {
        let board = new Array(this.props.rows);
        for (let i = 0; i < board.length; i++)
        {
            board[i] = new Array(this.props.cols).fill(0);
        }
        return board
    }

    // Generates mines and board numbers
    generateMinesOnClick(row, col) {

        // Initialize empty 2D array
        let mines = new Array(this.props.rows);
        for (let i = 0; i < mines.length; i++)
        {
            mines[i] = new Array(this.props.cols).fill(0);
        }

        // Add mines until numMines has been reached
        var mineCount = 0;
        while (mineCount < this.state.numMines) {

            // select random square
            let r = Math.floor(Math.random() * this.props.rows);
            let c = Math.floor(Math.random() * this.props.cols);

            // designate random square as a mine if it is not close to first click and is not in saturated area
            if (mines[r][c] !== -1 && !this.isAdjacent(row, col, r, c) && !this.areaIsSaturated(r, c, mines)) {
                mines[r][c] = -1;
                mineCount++;

                // update numbers around new mine
                for (let i = r - 1; i < r + 2; i++) {
                    for (let j = c - 1; j < c + 2; j++) {
                        if (this.coordinatesOnBoard(i, j) && mines[i][j] !== -1) {
                            mines[i][j]++;
                        }
                    }
                }
            }
        }
        this.setState({
            firstClick: false,
        });
        return mines;
    }
    // for testing that valid mine board has been generated
    verifyNums(mines) {
        for (let r = 0; r < this.props.rows; r++) {
            for (let c = 0; c < this.props.cols; c++) {
                if (mines[r][c] !== -1) {
                    let adjMines = 0;
                    for (let i = r - 1; i < r + 2; i++) {
                        for (let j = c - 1; j < c + 2; j++) {
                            if (this.coordinatesOnBoard(i, j) && mines[i][j] === -1) {
                                adjMines++;
                            }
                        }
                    }
                    if (adjMines !== mines[r][c]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // for checking if two squares are adjacent to each other
    isAdjacent(r1, c1, r2, c2) {
        let length1 = Math.abs(r2 - r1) ** 2;
        let length2 = Math.abs(c2 - c1) ** 2;
        return Math.sqrt(length1 + length2) < 2;
    }

    // For checking if the area around (r, c) is saturated with mines 
    // and distributing mines in an optimal way
    areaIsSaturated(r, c, mines) {
        let adjWeightSum = 0;
        let adjMineSum = 0;
        for (let i = r - 1; i < r + 2; i++) {
            for (let j = c - 1; j < c + 2; j++) {
                if (this.coordinatesOnBoard(i, j)) {
                    adjWeightSum += mines[i][j];
                    if (mines[i][j] === -1) {
                        adjMineSum++;
                    }
                }
            }
        }
        return adjWeightSum > 9 || adjMineSum > 2;
    }

    // for checking if (r, c) are on the current board.
    coordinatesOnBoard(r, c) {
        return r >= 0 && r < this.state.rows && c >= 0 && c < this.state.cols;
    }

    // Exclusively for visualizing and testing mine generation
    generateUncoveredBoard(mines) {
        let board = new Array(this.props.rows);
        for (let i = 0; i < board.length; i++)
        {
            board[i] = new Array(this.props.cols).fill(1);
            for (let j = 0; j < board[i].length; j++) {
                if (mines[i][j] === -1) {
                    board[i][j] = 2;
                }
            }
        }
        return board
    }

    // Makes the appropriate changes to the board when a square (r, c) is clicked
    handleClick(r, c) {
        if (this.state.gameState === 'play') {
            let newBoard = this.state.board;
            let newMines = this.state.mines;
            let newGameState = this.state.gameState;

            // Generate mines if this is the start of the game
            if (this.state.firstClick) {
                newMines = this.generateMinesOnClick(r, c);
            }

            // if a covered square was clicked, take the appropriate action
            if (this.state.board[r][c] === 0) {

                // for uncovering the square and adjacent squares if necessary
                if (newMines[r][c] !== -1) {
                    newBoard[r][c] = 1;
                    this.uncoverAdjacentSquares(r, c, newBoard, newMines);
                } else if (newMines[r][c] === -1) {

                    // for ending the game if mine was clicked
                    newGameState = 'lost';
                    this.props.setGameState('lost');
                    this.explodeMines(newBoard, newMines);
                }
                
                // check for winning game state
                if (this.gameWon(newBoard)) {
                    newGameState = 'won';
                    this.props.setGameState('won');
                }
            }

            // for testing
            // newBoard = this.generateUncoveredBoard(newMines); 

            this.setState({
                board: newBoard,
                mines: newMines,
                gameState: newGameState
            });
        }
    }

    explodeMines(board, mines) {
        for (let r = 0; r < this.state.rows; r++) {
            for (let c = 0; c < this.state.cols; c++) {
                if (mines[r][c] === -1) {
                    board[r][c] = 3;
                } else {
                    board[r][c] = 1;
                }
            }
        }
    }

    // uncovered adjacent zero squares for zeros
    uncoverAdjacentSquares(r, c, newBoard, mines) {
        if (mines[r][c] === 0) {
            for (let i = r - 1; i < r + 2; i++) {
                for (let j = c - 1; j < c + 2; j++) {
                    if (this.coordinatesOnBoard(i, j) && newBoard[i][j] === 0) {
                        newBoard[i][j] = 1;
                        if (!(i === r && j === c) && mines[i][j] === 0) {
                            this.uncoverAdjacentSquares(i, j, newBoard, mines);
                        } 
                    }
                }
            }
        }
    }

    // returns boolean of if winning game state has been reached
    gameWon(board) {
        for (let r = 0; r < this.state.rows; r++) {
            for (let c = 0; c < this.state.cols; c++) {
                if (board[r][c] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    // takes the appropriate action when a square is right clicked
    handleRightClick(r, c) {
        if (this.state.gameState === 'play') {
            var newBoard = this.state.board;
            var newGameState = this.state.gameState;

            // mark or unmark the square depending on it's current state
            if (this.state.board[r][c] === 0) {
                newBoard[r][c] = 2;
            } else if (this.state.board[r][c] === 2) {
                newBoard[r][c] = 0;
            }
            if (this.gameWon(newBoard)) {
                newGameState = 'won';
                this.props.setGameState('won');
            }
            this.setState({
                board: newBoard,
                gameState: newGameState
            });
        }
    }

    render() {
        const rows = this.state.board.map((row, index) => {
            return (
                <BoardRow
                    key={index}
                    row={row}
                    rowNumber={index}
                    mines={this.state.mines[index]}
                    onClick={(r, c) => this.handleClick(r, c)}
                    onContextMenu={(r, c) => this.handleRightClick(r, c)}
                />
            )
        })
        return (
            <div className='board'>
                <div>
                    {rows}
                </div>
            </div>
        )
    }
}

function BoardRow(props) {
    const row = props.row.map((status, index) => {
        function rightClick(e) {
            e.preventDefault();
            props.onContextMenu(props.rowNumber, index);
        }
        return (
            <Square
                key={index}
                status={status}
                value={props.mines[index]}
                onClick={() => props.onClick(props.rowNumber, index)}
                onContextMenu={(e) => rightClick(e)}
            /> 
        )
    })
    return (
        <div className='board-row'>{row} </div> 
    )
}
function Square(props) {
    if (props.status === 3) {
        return (
            <button className="exploded_square"></button>
        )
    } else if (props.status === 2) {
        return (
            <button className="marked_square" onContextMenu={props.onContextMenu}></button>
        ) 
    } else if (props.status === 1) {
        return (
            <button className="uncovered_square">{props.value}</button>
        )
    } else {
        return (
            <button onClick={props.onClick} onContextMenu={props.onContextMenu} className="covered_square"></button>
        )
    }
}

export default Board;