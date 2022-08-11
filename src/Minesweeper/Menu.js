import React from 'react';
import './Menu.css';

class Menu extends React.Component {
    

    render() {
        if (this.props.gameState !== "play") {
            return (
                <div className="menu">
                    <div className="backdrop"></div>
                    <GameStateMessage 
                        gameState={this.props.gameState}
                    />
                    <Buttons
                        gameState={this.props.gameState}
                        onClick={(state) => this.props.setGameState(state)}
                    />
                </div>
            );
        }
        return;
    }
}

function Buttons (props) {
    return (
        <button className="button" id="start-button" onClick={props.onClick('play')}>Start</button>
    )
}

function GameStateMessage(props) {
    let message = '';
    if (props.gameState === 'won') {
        message = 'You Win!'
    } else if (props.gameState === 'lost') {
        message = 'You Lose!';
    }
    return (
        <h2 className="state-message">{message}</h2>
    )
}

export default Menu;