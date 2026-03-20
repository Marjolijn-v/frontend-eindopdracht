import React from 'react';
import './myMessages.css';
import formatDate from "../../helpers/formatDate.js";

function MessageItem({ message }) {
    return (
        <div className="message-item">
            <p><strong>From:</strong> {message.nameSender}</p>
            <p><strong>Email:</strong> {message.emailSender}</p>
            <p><strong>Message:</strong></p>
            <p>{message.content}</p>
            <small>{formatDate(message.createdAt)}</small>
        </div>
    );
}

export default MessageItem;