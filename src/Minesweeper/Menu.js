import React from 'react';
import './Menu.css';

class Menu extends React.Component {
    

    render() {
        console.log(this.props.gameState);
        if (this.props.gameState !== 'play') {
            return (
                <div className="menu">
                    <div className="backdrop"></div>
                    <GameStateMessage 
                        gameState={this.props.gameState}
                    />
                    <Buttons
                        gameState={this.props.gameState}
                        difficulty={this.props.difficulty}
                        setGameState={(state) => this.props.setGameState(state)}
                        setDifficulty={(difficulty) => this.props.setDifficulty(difficulty)}
                    />
                </div>
            );
        }
        return;
    }
}

function Buttons(props) {

    return (
        <div id="buttons">
            <div id="difficulty-buttons">
                <button
                    className={`difficulty-button ${props.difficulty === 'easy' && 'selected-button'}`}
                    id="easy-button"
                    onClick={() => props.setDifficulty('easy')}>Easy</button>
                <button
                    className={`difficulty-button ${props.difficulty === 'medium' && 'selected-button'}`}
                    id="medium-button"
                    onClick={() => props.setDifficulty('medium')}>Medium</button>
                <button
                    className={`difficulty-button ${props.difficulty === 'hard' && 'selected-button'}`}
                    id="hard-button"
                    onClick={() => props.setDifficulty('hard')}>Hard</button>
            </div>
            <button className="button" id="new-game-button" onClick={() => (props.setGameState('play'))}>New Game</button>
        </div>
    )
}

function GameStateMessage(props) {
    if (props.gameState === 'won') {
        return (
            <h2 id="win-message" className="state-message">You Win!</h2>
        )
    } else if (props.gameState === 'lost') {
        return (
            <h2 id="lose-message" className="state-message">You Lose!</h2>
        )
    }
}

export default Menu;