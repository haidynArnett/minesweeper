import React from 'react';
import './Board.css';

class Board extends React.Component {

    render() {
        const rows = this.props.board.map((row, index) => {
            return (
                <BoardRow
                    key={index}
                    row={row}
                    rowNumber={index}
                    mines={this.props.mines[index]}
                    handleClick={(r, c) => this.props.handleClick(r, c)}
                    handleRightClick={(r, c) => this.props.handleRightClick(r, c)}
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
            props.handleRightClick(props.rowNumber, index);
        }
        return (
            <Square
                key={index}
                status={status}
                value={props.mines[index]}
                onClick={() => props.handleClick(props.rowNumber, index)}
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