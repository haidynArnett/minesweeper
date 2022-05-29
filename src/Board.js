import React from 'react';

class Board extends React.Component {
    constructor(props) {
        super(props);
        const mines = this.GenerateMines();
        const board = this.GenerateBoard();
        this.state = {
            rows: props.rows,
            cols: props.cols,
            numMines: props.numMines,
            mines: mines,
            board: board
        }
    }

    GenerateMines() {
        let mines = new Array(this.props.rows);
        for (let i = 0; i < mines.length; i++)
        {
            mines[i] = new Array(this.props.cols).fill(0);
        }
        var mineCount = 0;
        while (mineCount < this.props.numMines) {
            let r = Math.floor(Math.random() * this.props.rows);
            let c = Math.floor(Math.random() * this.props.cols);
            if (mines[r][c] === 0) {
                mines[r][c] = -1;
                mineCount++;
            }
        }
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

    handleClick(r, c) {
        if (this.state.board[r][c] === 0) {
            let newBoard = this.state.board;
            newBoard[r][c] = 1;
            this.setState({
                board: newBoard
            })
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
        return (
            <Square
                key={index}
                status={status}
                value={props.mines[index]}
                onClick={() => props.onClick(props.rowNumber, index)}
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
            <button className="marked_square"></button>
        ) 
    } else if (props.status === 1) {
        return (
            <button className="uncovered_square">{props.value}</button>
        )
    } else {
        return (
            <button onClick={props.onClick}className="covered_square"></button>
        )
    }
}

export default Board;