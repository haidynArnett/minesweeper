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
                        setGameState={(state) => this.props.setGameState(state)}
                    />
                </div>
            );
        }
        return;
    }
}

function Buttons (props) {
    return (
        <button className="button" id="new-game-button" onClick={() => (props.setGameState('play'))}>New Game</button>
    )
}

function GameStateMessage(props) {
    let message = '';
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