import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Board
                rows={10}
                cols={10}
                numMines={20}
            />
        )
    }
}

export default Game;