import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoSend, IoAttach, IoPersonCircle } from 'react-icons/io5';
import echo from '../utils/echo';
import './ProjectDiscussion.css';

const ProjectDiscussion = ({ assignmentId, onClose }) => {
    const [comments, setComments] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchComments();

        // Listen for new comments
        const channel = echo.private(`assignment.${assignmentId}`)
            .listen('CommentPosted', (e) => {
                setComments(prev => [...prev, e]);
                scrollToBottom();
            });

        return () => {
            channel.stopListening('CommentPosted');
        };
    }, [assignmentId]);

    useEffect(() => {
        scrollToBottom();
    }, [comments]);

    const fetchComments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseUrl}/assignments/${assignmentId}/comments`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setLoading(false);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() && !attachment) return;

        const formData = new FormData();
        formData.append('message', newMessage);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseUrl}/assignments/${assignmentId}/comments`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            // Add the comment locally immediately
            setComments(prev => [...prev, response.data]);
            setNewMessage('');
            setAttachment(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            console.error('Error sending comment:', error);
        }
    };

    return (
        <div className="discussion-overlay">
            <div className="discussion-modal glass">
                <div className="discussion-header">
                    <h3>Project Discussion</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="comments-container">
                    {loading ? (
                        <div className="loader">Loading discussion...</div>
                    ) : comments.length === 0 ? (
                        <div className="empty-discussion">No messages yet. Start the conversation!</div>
                    ) : (
                        comments.map((comment, index) => (
                            <div key={index} className={`comment-bubble ${comment.user_id === parseInt(localStorage.getItem('userId')) ? 'own' : ''}`}>
                                <div className="comment-meta">
                                    <IoPersonCircle size={24} />
                                    <span className="user-name">{comment.user?.name || comment.user_name}</span>
                                    <span className="comment-time">{new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="comment-text">{comment.message}</div>
                                {comment.attachment && (
                                    <a href={`${import.meta.env.VITE_STORAGE_URL}/${comment.attachment}`} target="_blank" rel="noreferrer" className="attachment-link">
                                        <IoAttach /> Attachment
                                    </a>
                                )}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="discussion-input" onSubmit={handleSend}>
                    <button type="button" className="attach-btn" onClick={() => fileInputRef.current.click()}>
                        <IoAttach size={24} />
                    </button>
                    <input 
                        type="file" 
                        hidden 
                        ref={fileInputRef} 
                        onChange={(e) => setAttachment(e.target.files[0])} 
                    />
                    <input 
                        type="text" 
                        placeholder="Type a message..." 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="send-btn">
                        <IoSend size={24} />
                    </button>
                </form>
                {attachment && <div className="attachment-preview">Selected: {attachment.name}</div>}
            </div>
        </div>
    );
};

export default ProjectDiscussion;
