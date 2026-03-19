import React, { useState } from 'react';
import { sendMessage } from "../../helpers/sendMessage.js";
import './MessageForm.css';

function MessageForm({ plantId, plantUserId, onSuccess, onClose }) {
    const [messageContent, setMessageContent] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');

    async function handleSendMessage (e){
        e.preventDefault();
        setMessageError('');
        setMessageSuccess('');

        try {
            setSendingMessage(true);

            await sendMessage({
                messageContent,
                senderName,
                senderEmail,
                plantId,
                senderUserId: plantUserId
            });

            setMessageSuccess('Message sent successfully!');
            setMessageContent('');
            setSenderName('');
            setSenderEmail('');

            if (onSuccess) {
                onSuccess();
            }

            setTimeout(() => {
                if (onClose) {
                    onClose();
                }
                setMessageSuccess('');
            }, 2000);

        } catch (e) {
            console.error('Error sending message:', e);
            setMessageError(e.message);
        } finally {
            setSendingMessage(false);
        }
    };

    return (
        <form onSubmit={handleSendMessage}>
            {messageError && <p className="error-message">{messageError}</p>}
            {messageSuccess && <p className="success-message">{messageSuccess}</p>}

            <label htmlFor="message-field">
                <p>Message:</p>
                <textarea
                    name="message-field"
                    id="message-field"
                    cols="30"
                    rows="10"
                    placeholder="Type your message here"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    disabled={sendingMessage}
                />
            </label>

            <label htmlFor="name-field">
                <p>Your name:</p>
                <input
                    type="text"
                    id="name-field"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    disabled={sendingMessage}
                />
            </label>

            <label htmlFor="email-field">
                <p>Your email address:</p>
                <input
                    type="email"
                    id="email-field"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    disabled={sendingMessage}
                />
            </label>

            <button
                type="submit"
                className="send-button"
                disabled={sendingMessage}
                style={{cursor: sendingMessage ? 'not-allowed' : 'pointer'}}
            >
                {sendingMessage ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}

export default MessageForm;