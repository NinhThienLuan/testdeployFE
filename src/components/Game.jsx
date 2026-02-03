import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Game.css';

function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        <button
            className={`square ${isWinningSquare ? 'winning' : ''}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay, winningLine }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = '🎉 Người chơi ' + winner + ' thắng!';
    } else if (squares.every(square => square !== null)) {
        status = '🤝 Hòa!';
    } else {
        status = 'Lượt của: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board">
                {[0, 1, 2].map((row) => (
                    <div className="board-row" key={row}>
                        {[0, 1, 2].map((col) => {
                            const index = row * 3 + col;
                            return (
                                <Square
                                    key={index}
                                    value={squares[index]}
                                    onSquareClick={() => handleClick(index)}
                                    isWinningSquare={winningLine && winningLine.includes(index)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </>
    );
}

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const winnerInfo = calculateWinner(currentSquares);

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function resetGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Quay lại nước #' + move;
        } else {
            description = 'Bắt đầu lại';
        }
        return (
            <li key={move}>
                <button
                    className={`history-button ${move === currentMove ? 'active' : ''}`}
                    onClick={() => jumpTo(move)}
                >
                    {description}
                </button>
            </li>
        );
    });

    return (
        <div className="game-container">
            <div className="game-header">
                <Link to="/" className="back-button">← Trang chủ</Link>
                <h1>Tic Tac Toe</h1>
            </div>
            <div className="game">
                <div className="game-board">
                    <Board
                        xIsNext={xIsNext}
                        squares={currentSquares}
                        onPlay={handlePlay}
                        winningLine={winnerInfo}
                    />
                    <button className="reset-button" onClick={resetGame}>
                        🔄 Chơi lại
                    </button>
                </div>
                <div className="game-info">
                    <h3>Lịch sử nước đi:</h3>
                    <ol>{moves}</ol>
                </div>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }
    return null;
}

export default Game;
