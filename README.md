# Realtime Chat App with Sentiment Analysis
This chat application enables realtime communication between users. It uses React for the frontend, Next.js and Express for the backend, and Pusher for handling real-time functionality. Additionally, the app uses `sentiment`, a Node.js module, to perform sentiment analysis on each message sent by users.

## Features
- Real-time communication between users.
- Sentiment analysis of each message to gauge the emotional tone.
- Display of emojis (😃😐😠) based on the sentiment score of the messages.
- Retrieval of message history upon user connection.

## Prerequisites
Before you begin, make sure you have the following installed:
- Node.js
- npm (usually comes with Node.js)

## Installation
Follow these steps to get your development environment set up:
1. **Clone the Repo**

First, clone this repo to your local machine and navigate to its root directory:
```bash
git clone https://github.com/annielouu/realtime-chat-app.git
cd realtime-chat-app
```
2. **Install Dependencies**

Run the command below to install the dependencies you need:
```npm install```

3. **Set Up Environment Variables**

[Pusher](https://pusher.com) enables instant messaging and realtime analytics functionalities of this app. You would need to create a new application on your [Pusher Dashboard](http://bit.ly/pusher-dashboard) to get your application credentials. Then, create a `.env` file in the root directory of this app and add your credentials like this:
```bash
PUSHER_APP_ID=YOUR_APP_ID
    PUSHER_APP_KEY=YOUR_APP_KEY
    PUSHER_APP_SECRET=YOUR_APP_SECRET
    PUSHER_APP_CLUSTER=YOUR_APP_CLUSTER
```
Remember to replace `YOUR_APP_ID`, `YOUR_APP_KEY`, etc., with the credentials from the Pusher dashboard.

4. **Start the application with the following command:**
```bash
npm run dev
```

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

## API Endpoints
- `POST /message` - Send a new message
- `POST /messages` - Fetch all messages

## Seletion of Sentiment Analysis Model

The app utilizes the `sentiment` module, a Node.js package that uses the AFINN-165 wordlist and Emoji Sentiment Ranking to analyze text sentiment. AFINN is a list of words each assigned a valence rating between -5 (most negative) and +5 (most positive). Sentiment analysis is conducted by matching string tokens (words & emojis) to the AFINN list to obtain their scores. It returns a `comparative` score, which is `the sum of individual token scores / the number of tokens`.

Alternatively, the `vader-sentiment` module can be used for sentiment analysis. VADER (Valence Aware Dictionary and sEntiment Reasoner) calculates a `compound` score by summing and normalizing valence scores of words from its lexicon, based on established rules. The score ranges from -1 (most negative) to +1 (most positive).

### Performance Comparison ###
During testing, `sentiment` outperforms `vader-sentiment` in emoji analysis. Here are some results:
content | compound score (`vader-sentiment`) | score (`sentiment`)
--- | --- | ---
😭 | 0 | -1 
i don't know 😭 | 0 | -1
😂 | 0 | 1

### Alternative Choice: Integrating Vader-Sentiment
If you want to implement `vader-sentiment` in this app instead, you would need to add the following to  `server.js`:
```
const vader = require('vader-sentiment');
```
Then, remove this line for sentiment score calculation:
```
const sentimentScore = sentiment.analyze(content).score; // Analyze sentiment of content;
```
And replace it with:
```
const sentimentScore = vader.SentimentIntensityAnalyzer.polarity_scores(content);
```
In `Chat.js`, change the conditions for mood display. Remove this line:
```
const mood = chat.sentiment > 0 ? HAPPY_EMOJI : chat.sentiment === 0 ? NEUTRAL_EMOJI : SAD_EMOJI;
```
Add the following:
```
const mood = chat.sentiment.compound >= 0.05 ? HAPPY_EMOJI : chat.sentiment.compound > -0.05 ? NEUTRAL_EMOJI : SAD_EMOJI;
```

## Contributing
Contributions are welcome! Please feel free to submit a pull request.
