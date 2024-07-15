# Real-time Chat App with Sentiment Analysis
This chat application enables real-time communication between users. It uses React for the frontend, Next.js and Express for the backend, and Pusher for handling real-time functionality. Additionally, the app uses the `sentiment` npm module to perform sentiment analysis on each message sent by users.

## Features
- Real-time communication between users.
- Sentiment analysis of each message to gauge the emotional tone.
- Display of emojis (😃😐😢) based on the sentiment score of the messages.
- Retrieval of message history upon user connection.

## Prerequisites
Before you begin, make sure you have the following installed:
- Node.js
- npm (usually comes with Node.js)

## Installation
Follow these steps to get your development environment set up:
1. Clone the Repo
```bash
git clone https://github.com/annielouu/realtime-chat-app.git
cd realtime-chat-app
```
2. Install Dependencies

```npm install```

3. Set Up Environment Variables

Create a new application on your [Pusher Dashboard](http://bit.ly/pusher-dashboard) to get application credentials. Then, create a `.env` file in the root directory of this application and add your application credentials as follows.
```bash
PUSHER_APP_ID=YOUR_APP_ID
    PUSHER_APP_KEY=YOUR_APP_KEY
    PUSHER_APP_SECRET=YOUR_APP_SECRET
    PUSHER_APP_CLUSTER=YOUR_APP_CLUSTER
```
Remember to replace `YOUR_APP_ID`, `YOUR_APP_KEY`, etc., with the credentials from the Pusher dashboard.

4. Start the application with the following command:
```bash
npm run dev
```

## API Endpoints
- `POST /message` - Send a new message
- `POST /messages` - Fetch all messages

## Workflow
1. User inputs message and presses "Enter" key.
2. The application captures the key release event, and constructs a message object containing `user`, `content`, and `timestamp`.
3. The message object is sent to the server via an HTTP POST request to the `/message` endpoint.
4. The server (an Express.js application) handles POST requests to `/message`. It...
    1) Analyzes the message's sentiment using the `sentiment` module;
    2) Constructs and sends back a new object containing `user`, `content`, `timestamp`, and `sentiment`;
    3) Appends the message in the server-side data structrue `chatHistory`;
    4) Users Pusher to trigger the `new-message` event on the `chat-room` channel
5. On the client side, Pusher listens for `new-message` events and updates the `chats` state with the new message.
6. Messages are displayed, along with user names an Emojis showing message sentiment.

## Contributing
Contributions are welcome! Please feel free to submit a pull request.
