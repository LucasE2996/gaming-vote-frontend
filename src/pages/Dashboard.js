// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import Api from '../services/Api';
import './Dashboard.css';

function Dashboard() {
    const [games, setGames] = useState([]);

    function sortByVotes(a, b) {
        if (a.votes.length > b.votes.length) {
            return -1;
        }
        if (a.votes.length < b.votes.length) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        async function getAllGames() {
            const result = await Api.get('game', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!result) {
                return;
            }

            setGames(result.data.sort(sortByVotes));
        }

        getAllGames();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>dashboard</h1>
            <Link to="/">
                <button className="sign-out">Go back</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Votes</td>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game._id}>
                            <td> {game._id} </td>
                            <td> {game.name} </td>
                            <td> {game.votes.length} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
