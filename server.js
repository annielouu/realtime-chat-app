/* server.js */

const cors = require('cors');
const next = require('next');
const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const Sentiment = require('sentiment');

// Check if environment is production or development
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

// Initialize a Next.js application
const app = next({ dev });
const handler = app.getRequestHandler();
const sentiment = new Sentiment();

// Configure Pusher with credentials stored in .env
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true
});

// Prepare the next.js app and set up Express server with middleware
app.prepare()
    .then(() => {
        const server = express();
        server.use(cors());
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true }));

        server.get('*', (req, res) => { // for all GET requests not caught by other routes, pass them to Next.js's handler
            return handler(req, res);
        });

        const chatHistory = { messages: [] };

        server.post('/message', (req, res) => {
            const { user = null, content = '', timestamp = +new Date() } = req.body; // Extracts user, content, timestamp from request body
            const sentimentScore = sentiment.analyze(content).score; // Analyze sentiment of content
            const message = { user, content, timestamp, sentiment: sentimentScore }; // Construct new message object with sentiment
            chatHistory.messages.push(message); // Push this message to chat history
            pusher.trigger('chat-room', 'new-message', message); // Trigger the 'new-message' event in 'chat-room' channel
        });

        server.post('/messages', (req, res) => {
            res.json({ messages: chatHistory.messages, status: 'success' });
        });

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
