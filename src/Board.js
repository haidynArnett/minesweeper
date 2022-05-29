import React from 'react';

class Board extends React.Component {
    constructor(props) {
        super(props);
        const numMines = Math.ceil(0.15 * props.rows * props.cols);
        const board = this.GenerateBoard();
        this.state = {
            rows: props.rows,
            cols: props.cols,
            numMines: numMines,
            mines: (new Array(props.rows)).fill(new Array(props.cols)),
            board: board,
            firstClick: true
        }
    }

    GenerateMines(numMines) {
        let mines = new Array(this.props.rows);
        for (let i = 0; i < mines.length; i++)
        {
            mines[i] = new Array(this.props.cols).fill(0);
        }
        var mineCount = 0;
        while (mineCount < numMines) {
            let r = Math.floor(Math.random() * this.props.rows);
            let c = Math.floor(Math.random() * this.props.cols);
            if (mines[r][c] === 0) {
                mines[r][c] = -1;
                mineCount++;
            }
        }
        this.fillNums(mines);
        return mines;
    }
    GenerateBoard() {
        // generates board of ints 
        // covered: 0
        // uncovered: 1
        // marked: 2
        let board = new Array(this.props.rows);
        for (let i = 0; i < board.length; i++)
        {
            board[i] = new Array(this.props.cols).fill(0);
        }
        return board
    }

    GenerateMinesOnClick(row, col) {
        let mines = new Array(this.props.rows);
        for (let i = 0; i < mines.length; i++)
        {
            mines[i] = new Array(this.props.cols).fill(0);
        }
        var mineCount = 0;
        while (mineCount < this.state.numMines) {
            let r = Math.floor(Math.random() * this.props.rows);
            let c = Math.floor(Math.random() * this.props.cols);
            if (!this.isAdjacent(row, col, r, c) && mines[r][c] === 0) {
                mines[r][c] = -1;
                mineCount++;
            }
        }
        this.fillNums(mines);
        this.state.mines = mines;
        this.setState({
            firstClick: false,
            mines: mines
        });
    }
    isAdjacent(r1, c1, r2, c2) {
        let length1 = Math.abs(r2 - r1) ** 2;
        let length2 = Math.abs(c2 - c1) ** 2;
        return Math.sqrt(length1 + length2) < 2;
    }
    fillNums(mines) {
        for (let r = 0; r < this.props.rows; r++) {
            for (let c = 0; c < this.props.cols; c++) {
                if (mines[r][c] === -1) {
                    for (let i = r - 1; i < r + 2; i++) {
                        for (let j = c - 1; j < c + 2; j++) {
                            if (i >= 0 && i < this.props.rows && j >= 0 && j < this.props.cols && mines[i][j] !== -1) {
                                mines[i][j]++;
                            }
                        }
                    }
                }
            }
        }
    }

    handleClick(r, c) {
        let newBoard = this.state.board;
        if (this.state.firstClick) {
            this.GenerateMinesOnClick(r, c);
        }
        if (this.state.board[r][c] === 0) {
            newBoard[r][c] = 1;
        }
        if (this.state.mines[r][c] === 0) {
            this.uncoverAdjacentSquares(r, c, newBoard);
        }
        
        this.setState({
            board: newBoard
        });
    }
    uncoverAdjacentSquares(r, c, newBoard) {
        for (let i = r - 1; i < r + 2; i++) {
            for (let j = c - 1; j < c + 2; j++) {
                if (i >= 0 && i < this.state.rows && j >= 0 && j < this.state.cols && newBoard[i][j] === 0) {
                    newBoard[i][j] = 1;
                    if (!(i === r && j === c) && this.state.mines[i][j] === 0) {
                        this.uncoverAdjacentSquares(i, j, newBoard);
                    } 
                }
            }
        }
    }

    handleRightClick(r, c) {
        var newBoard = this.state.board;
        if (this.state.board[r][c] === 0) {
            newBoard[r][c] = 2;
        } else if (this.state.board[r][c] === 2) {
            newBoard[r][c] = 0;
        }
        this.setState({
            board: newBoard
        });
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
            <div className='board'>{rows}</div>
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
    if (props.status === 2) {
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