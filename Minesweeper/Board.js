var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './Board.css';

var Board = function (_React$Component) {
    _inherits(Board, _React$Component);

    function Board() {
        _classCallCheck(this, Board);

        return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
    }

    _createClass(Board, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var rows = this.props.board.map(function (row, index) {
                return React.createElement(BoardRow, {
                    key: index,
                    row: row,
                    rowNumber: index,
                    mines: _this2.props.mines[index],
                    handleClick: function handleClick(r, c) {
                        return _this2.props.handleClick(r, c);
                    },
                    handleRightClick: function handleRightClick(r, c) {
                        return _this2.props.handleRightClick(r, c);
                    }
                });
            });
            return React.createElement(
                'div',
                { className: 'board' },
                React.createElement(
                    'div',
                    null,
                    rows
                )
            );
        }
    }]);

    return Board;
}(React.Component);

function BoardRow(props) {
    var row = props.row.map(function (status, index) {
        function rightClick(e) {
            e.preventDefault();
            props.handleRightClick(props.rowNumber, index);
        }
        return React.createElement(Square, {
            key: index,
            status: status,
            value: props.mines[index],
            onClick: function onClick() {
                return props.handleClick(props.rowNumber, index);
            },
            onContextMenu: function onContextMenu(e) {
                return rightClick(e);
            }
        });
    });
    return React.createElement(
        'div',
        { className: 'board-row' },
        row,
        ' '
    );
}
function Square(props) {
    if (props.status === 3) {
        return React.createElement('button', { className: 'exploded_square' });
    } else if (props.status === 2) {
        return React.createElement('button', { className: 'marked_square', onContextMenu: props.onContextMenu });
    } else if (props.status === 1) {
        return React.createElement(
            'button',
            { className: 'uncovered_square' },
            props.value
        );
    } else {
        return React.createElement('button', { onClick: props.onClick, onContextMenu: props.onContextMenu, className: 'covered_square' });
    }
}

export default Board;