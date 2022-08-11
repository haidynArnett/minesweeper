import React from 'react';
import Board from './Board';
import Menu from './Menu';
import './Minesweeper.css';

class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: 'menu'
        };
    }

    SetGameState(state) {
        this.setState({
            gameState: state
        });
        console.log(state);
    }

    render() {
        return (
            <div className="game">
                <div className="title">Minesweeper</div>
                <Menu
                    gameState={this.state.gameState}
                    setGameState={(state) => this.SetGameState(state)}
                />
                <Board
                    rows={20}
                    cols={25}
                    setGameState={(state) => this.SetGameState(state)}
                    gameState={this.state.gameState}
                />
            </div>
        )
    }
}

export default Minesweeper;