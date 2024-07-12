/* components/ChatMessage.js */

import React from 'react';

function ChatMessage(props) {
    const isRight = props.position.toLowerCase() === 'right';
    const align = isRight ? 'text-right' : 'text-left';
    const justify = isRight ? 'justify-content-end' : 'justify-content-start';
    const messageBoxStyles = {
        fontWeight: 500,
        lineHeight: 1.4,
        whiteSpace: 'pre-wrap'
    };

    return <div className={`w-100 my-1 d-flex ${justify}`}>
        <div className="bg-light rounded border border-gray p-2" style={messageBoxStyles}>
            <span className={`d-block text-secondary ${align}`} style={messageBoxStyles}>
                {message}
            </span>
        </div>
    </div>
};

export default ChatMessage;