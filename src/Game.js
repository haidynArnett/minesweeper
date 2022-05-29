import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Board
                rows={15}
                cols={15}
            />
        )
    }
}

export default Game;