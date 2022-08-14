import React from 'react';
import Board from './Board';
import Menu from './Menu';
import './Minesweeper.css';

class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: 'menu',
            difficulty: 'easy'
        };
    }

    setGameState(state) {
        this.setState({
            gameState: state
        });
    }

    setDifficulty(newDifficulty) {
        let oldDifficulty = this.state.difficulty;
        this.setState({
            difficulty: newDifficulty
        });
        return oldDifficulty;
    }

    render() {
        return (
            <div className="game">
                <div className="title">Minesweeper</div>
                <Menu
                    gameState={this.state.gameState}
                    difficulty={this.state.difficulty}
                    setGameState={(state) => this.setGameState(state)}
                    setDifficulty={(difficulty) => this.setDifficulty(difficulty)}
                />
                <Board
                    rows={20}
                    cols={25}
                    setGameState={(state) => this.setGameState(state)}
                    gameState={this.state.gameState}
                />
            </div>
        )
    }
}

export default Minesweeper;