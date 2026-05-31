import React, { useEffect } from 'react';
import echo from '../../utils/echo';
import { showToast } from '../../utils/toast';

const NotificationListener = () => {
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) return;

        console.log(`Setting up notification listener for user: ${userId}`);

        const channel = echo.private(`App.Models.User.${userId}`)
            .listen('NotificationSent', (e) => {
                console.log('Notification received:', e);
                showToast(e.message, e.type === 'error' ? 'error' : 'success');
                
                // Optional: Play a sound
                const audio = new Audio('/notification.mp3');
                audio.play().catch(err => console.log('Audio play failed', err));
            });

        return () => {
            channel.stopListening('NotificationSent');
        };
    }, []);

    return null; // This component doesn't render anything
};

export default NotificationListener;
