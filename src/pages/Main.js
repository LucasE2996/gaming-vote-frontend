// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Main.css';
import Api from '../services/Api';
// eslint-disable-next-line no-unused-vars
import Item from './components/Item';
// eslint-disable-next-line no-unused-vars
import FlashMessage from './components/FlashMessage';

function Main({ match, history }) {
    const [games, setGames] = useState([]);
    const [fleshMessage, setFleshMessage] = useState({ status: false });

    useEffect(() => {
        async function loadGames() {
            const token = localStorage.getItem('token');
            const response = await Api.get('game', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const myGames = response.data.map(game => {
                const gameHasVote = game.votes.find(id =>
                    id.includes(match.params.id)
                );
                game.hasVote = !!gameHasVote;
                return game;
            });
            setGames(myGames);
        }

        loadGames();
    }, [match.params.id]);

    function handleError(message) {
        if (message.includes('405')) {
            setFleshMessage({
                message: 'You cannot vote in more than 3 games',
                status: true,
            });
            return;
        }

        setFleshMessage({
            message: 'Ops, something went wrong :(',
            status: true,
        });
    }

    async function handleVote(gameId) {
        const game = games.find(g => g._id === gameId);

        if (!game) {
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            return;
        }

        const response = await Api.post(`user/${game._id}/vote`, null, {
            headers: {
                user_id: match.params.id,
                Authorization: `Bearer ${token}`,
            },
        }).catch(err => handleError(err.message));

        if (response) {
            const updatedGames = games.map(oldGame => {
                if (game === oldGame) {
                    oldGame.hasVote = response.data.userVoted;
                }
                return oldGame;
            });
            setGames(updatedGames);
        }
    }

    function handleSignOut() {
        localStorage.clear();
        history.push('/');
    }

    const gamesComponents = games.map(game => {
        return (
            <Item
                key={game._id}
                data={game}
                eventHandler={() => handleVote(game._id)}
            />
        );
    });

    return (
        <main className="main-container">
            <h2>choose 3 games only!</h2>
            <button className="sign-out" onClick={() => handleSignOut()}>
                Sign Out
            </button>
            <ul> {gamesComponents} </ul>
            <FlashMessage
                data={fleshMessage}
                closeHandler={() => setFleshMessage({ status: false })}
            />
        </main>
    );
}

export default Main;
