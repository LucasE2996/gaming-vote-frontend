// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Item.css';

function Item(props) {
    const { _id: gameId, image, hasVote } = props.data;

    const activeStyle = {
        backgroundColor: '#1ab394',
    };
    const inactiveStyle = {
        backgroundColor: '#ed5565',
    };

    return (
        <li className="item-container">
            <img src={process.env.PUBLIC_URL + image} alt="Game poster" />
            <button
                className="button"
                style={hasVote ? inactiveStyle : activeStyle}
                onClick={e => props.eventHandler(gameId)}
            >
                {hasVote ? 'Roll back vote' : 'Vote'}
            </button>
        </li>
    );
}

export default Item;
