import React, { Fragment } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

function Chat(props) {
    const [chats, setChats] = React.useState([]);

    React.useEffect(() => {
        // Set up: Runs once when component is on mount
        const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
            cluster: process.env.PUSHER_APP_CLUSTER,
            encrypted: true
        });

        // Subscribe to and bind to the events of 'chat-room' channel
        var channel = pusher.subscribe('chat-room');
        channel.bind('new-message', ({ message = null }) => {
            if ({ message }) {
                setChats(prevChats => [...prevChats, message])
            }
        });
        pusher.connection.bind('connected', () => {
            axios.post('/messages')
                .then(response => {
                    var chats = response.data.messages;
                    setChats(chats);
                })
                .catch(error => console.error('Error fetching messages,', error));
        })

        // Clean up: Runs once when component is about to unmount
        function cleanup() {
            pusher.unsubscribe('chat-room');
            pusher.disconnect();
        };

        return cleanup;
    }, []);

    const handleKeyUp = e => {
        const value = e.target.value;

        if (e.keyCode === 13 && !e.shiftKey) {
            // When user presses return, construct a new message object, reset text input and make an HTTP request
            const message = { user: props.activeUser, content: value, timestamp: +new Date().getTime() };
            e.target.value = '';
            axios.post('/message', message) // Note: this triggers the new-message event (server.js for details)
                .catch(error => console.error('Error sending message', error));
        }
    };

    return props.activeUser && (
        <Fragment>
            <div className='border-bottom border-gray w-100 d-flex align-items-center bg-white' style={{ height: 90 }}>
                <h2 className='text-dark mb-0 mx-4 px-2'>
                    {props.activeUser}
                </h2>
            </div>
            <div className='border-top border-gray w-100 px-4 d-flex align-items-center bg-light' style={{ minHeight: 90 }}>
                <textarea
                    className='form-control px-3 py-2'
                    onKeyUp={handleKeyUp}
                    placeholder='Enter a chat message'
                    style={{ resize: 'none' }}
                ></textarea>
            </div>
        </Fragment>
    )
};

export default Chat;
