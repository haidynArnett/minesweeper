var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './Menu.css';

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu() {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
    }

    _createClass(Menu, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            console.log(this.props.gameState);
            if (this.props.gameState !== 'play') {
                return React.createElement(
                    'div',
                    { className: 'menu' },
                    React.createElement('div', { className: 'backdrop' }),
                    React.createElement(GameStateMessage, {
                        gameState: this.props.gameState
                    }),
                    React.createElement(Buttons, {
                        gameState: this.props.gameState,
                        difficulty: this.props.difficulty,
                        setGameState: function setGameState(state) {
                            return _this2.props.setGameState(state);
                        },
                        setDifficulty: function setDifficulty(difficulty) {
                            return _this2.props.setDifficulty(difficulty);
                        }
                    })
                );
            }
            return;
        }
    }]);

    return Menu;
}(React.Component);

function Buttons(props) {

    return React.createElement(
        'div',
        { id: 'buttons' },
        React.createElement(
            'div',
            { id: 'difficulty-buttons' },
            React.createElement(
                'button',
                {
                    className: 'difficulty-button ' + (props.difficulty === 'easy' && 'selected-button'),
                    id: 'easy-button',
                    onClick: function onClick() {
                        return props.setDifficulty('easy');
                    } },
                'Easy'
            ),
            React.createElement(
                'button',
                {
                    className: 'difficulty-button ' + (props.difficulty === 'medium' && 'selected-button'),
                    id: 'medium-button',
                    onClick: function onClick() {
                        return props.setDifficulty('medium');
                    } },
                'Medium'
            ),
            React.createElement(
                'button',
                {
                    className: 'difficulty-button ' + (props.difficulty === 'hard' && 'selected-button'),
                    id: 'hard-button',
                    onClick: function onClick() {
                        return props.setDifficulty('hard');
                    } },
                'Hard'
            )
        ),
        React.createElement(
            'button',
            { className: 'button', id: 'new-game-button', onClick: function onClick() {
                    return props.setGameState('play');
                } },
            'New Game'
        )
    );
}

function GameStateMessage(props) {
    if (props.gameState === 'won') {
        return React.createElement(
            'h2',
            { id: 'win-message', className: 'state-message' },
            'You Win!'
        );
    } else if (props.gameState === 'lost') {
        return React.createElement(
            'h2',
            { id: 'lose-message', className: 'state-message' },
            'You Lose!'
        );
    }
}

export default Menu;