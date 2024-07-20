import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { format, eachMinuteOfInterval, differenceInMinutes } from 'date-fns';

function EmotionHistoryChart({ activeUser, chats }) {
    const userChats = chats.filter(chat => chat.user === activeUser);
    const formattedChats = userChats.map(chat => ({
        ...chat,
        timestamp: new Date(chat.timestamp)
    }));

    const formatTime = (date) => {
        return format(date, 'HH:mm:ss');
    };

    const generateTickValues = (chats) => {
        if (chats.length === 0) return [];
        const startTime = chats[0].timestamp;
        const endTime = chats[chats.length - 1].timestamp;
        return eachMinuteOfInterval({ start: startTime, end: endTime });
    };

    const tickValues = generateTickValues(formattedChats);

    return (
        <LineChart
            xAxis={[{
                dataKey: 'timestamp',
                type: 'time',
                scaleType: 'time',
                valueFormatter: formatTime,
                ticks: tickValues
            }]}

            series={
                [
                    {
                        dataKey: 'sentiment',
                        label: 'Sentiment',
                        color: '#EDAE77'
                    },
                ]}
            dataset={formattedChats}
            width={500}
            height={300}
        />
    );
}

export default EmotionHistoryChart;