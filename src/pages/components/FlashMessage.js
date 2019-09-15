// eslint-disable-next-line no-unused-vars
import React from 'react';
import './FlashMessage.css';
// eslint-disable-next-line no-unused-vars
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function FlashMessage(props) {
    const { closeHandler, data } = props;

    const active = data.status ? 'active' : 'inactive';

    return (
        <div className={`flashmessage-container ${active}`}>
            <h5>{data.message}</h5>
            <FontAwesomeIcon
                className="icon"
                icon={faTimes}
                onClick={() => closeHandler()}
            />
        </div>
    );
}

export default FlashMessage;
