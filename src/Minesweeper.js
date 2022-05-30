import React from 'react';
import Board from './Board';

class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="game">
                <div className="title">Minesweeper</div>
                <Board
                    rows={15}
                    cols={15}
                />
            </div>
        )
    }
}

export default Minesweeper;