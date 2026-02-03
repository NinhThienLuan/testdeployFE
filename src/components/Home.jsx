import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Tic Tac Toe</h1>
                <p className="home-description">
                    Chào mừng bạn đến với trò chơi Tic Tac Toe! Một trò chơi cổ điển cho 2 người chơi.
                </p>
                <div className="home-features">
                    <div className="feature">
                        <span className="feature-icon">🎮</span>
                        <h3>Dễ chơi</h3>
                        <p>Luật chơi đơn giản, phù hợp mọi lứa tuổi</p>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">⚡</span>
                        <h3>Nhanh chóng</h3>
                        <p>Mỗi ván chơi chỉ mất vài phút</p>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">🏆</span>
                        <h3>Cạnh tranh</h3>
                        <p>Thách thức bạn bè của bạn</p>
                    </div>
                </div>
                <Link to="/game" className="play-button">
                    Bắt đầu chơi
                </Link>
            </div>
        </div>
    );
}

export default Home;
