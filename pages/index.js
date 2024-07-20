/* pages/index.js */

import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import Layout from '../components/Layout';
import Chat from '../components/Chat';
import EmotionHistoryChart from '../components/EmotionHistoryChart';
import { FaChartBar } from 'react-icons/fa';


function IndexPage() {
    const [user, setUser] = React.useState(null);
    const [chats, setChats] = React.useState([]);
    const [showHistory, setShowHistory] = React.useState(false);
    const [isMobileView, setIsMobileView] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleKeyUp = e => {
        if (e.keyCode === 13) { // User presses the Return/Enter key
            const user = e.target.value;
            setUser(user);
        };
    };

    const toggleEmotionHistory = () => {
        setShowHistory(!showHistory);
    }

    const showEmotionHistory = () => {
        const userChats = chats.filter(chat => chat.user === user)
        return (
            (userChats.length !== 0) ? (
                <div className='mt-5'>
                    <EmotionHistoryChart activeUser={user} chats={chats} />
                </div>
            ) : (
                <p class='mt-3'>You haven't sent a message yet!</p>
            )
        );
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    };

    const nameInputStyles = {
        background: 'transparent',
        color: 'wheat',
        border: 0,
        borderBottom: '1px solid #666',
        borderRadius: 0,
        fontSize: '3rem',
        fontWeight: 500,
        boxShadow: 'none !important',
        paddingTop: '15px',
        paddingBottom: '15px'
    };

    return (
        <Layout pageTitle='Realtime Chat'>
            <main className='container-fluid position-absolute h-100' style={{ backgroundColor: '#79A2BB' }}>
                <div className='row position-absolute w-100 h-100'>
                    {isMobileView ? (
                        user ? (
                            // Mobile View - User Logged In
                            <Fragment>
                                <div className='col-12 position-relative d-flex flex-column h-100 px-0' style={{ backgroundColor: '#F8F8F8' }}>
                                    <Chat activeUser={user} chats={chats} setChats={setChats} />
                                    <button className="btn btn-link p-4 position-absolute" onClick={toggleEmotionHistory} style={{ top: 10, right: 10 }}>
                                        <FaChartBar size={28} onClick={toggleEmotionHistory} style={{ color: '#79A2BB' }} />
                                    </button>
                                    {showHistory && (
                                        <div style={overlayStyle}>
                                            <button className="btn" backgroundColor='#79A2BB' onClick={toggleEmotionHistory} style={{ position: 'absolute', top: 10, right: 10 }}>X</button>
                                            <h5 style={{ color: 'white', margin: 15 }}>MY EMOTION HISTORY</h5>
                                            <div className="bg-light p-3 rounded">
                                                {showEmotionHistory()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Fragment>
                        ) : (
                            // Mobile View - No User
                            <div className='col-12 position-relative d-flex flex-column h-100' style={{ backgroundColor: '#79A2BB' }}>
                                <span className='d-block w-100 h1 text-light' style={{ marginTop: '40%' }}>What is your name?</span>
                                <input
                                    type='text'
                                    className='form-control mt-3 px-3 py-2'
                                    onKeyUp={handleKeyUp}
                                    autoComplete='off'
                                    style={nameInputStyles}
                                />
                            </div>
                        )
                    ) : (
                        // Desktop View
                        <Fragment>
                            <section className='col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center px-5'>
                                <div className='px-5 mx-5' style={{ top: '30%' }}>
                                    {user ? (
                                        <Fragment>
                                            <div className='px-3 position-absolute' style={{ top: '30%' }}>
                                                <span className='d-block w-100 h1 text-light' style={{ color: 'whitesmoke' }}>Hello, {user}!</span>
                                                <Button variant='contained' color='secondary' disableElevation onClick={toggleEmotionHistory} className='mt-3'>View emotion history</Button>
                                                {showHistory && (
                                                    <div className='p-3 rounded' style={{ backgroundColor: 'whitesmoke' }}>
                                                        {showEmotionHistory()}
                                                    </div>
                                                )}
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <span className='d-block w-100 h1 text-light' style={{ top: '30%' }}>What is your name?</span>
                                            <input
                                                type='text'
                                                className='form-control mt-3 px-3 py-2'
                                                onKeyUp={handleKeyUp}
                                                autoComplete='off'
                                                style={nameInputStyles}
                                            />
                                        </Fragment>
                                    )}
                                </div>
                            </section>
                            <section className='col-md-4 position-relative d-flex flex-column h-100 align-content-between px-0' style={{ backgroundColor: '#F8F8F8' }}>
                                {user && <Chat activeUser={user} chats={chats} setChats={setChats} />}
                            </section>
                        </Fragment>
                    )}
                </div>
            </main>
        </Layout >
    );
}

export default IndexPage;