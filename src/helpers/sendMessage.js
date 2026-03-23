import axios from "axios";

export const sendMessage = async (messageData) => {
    const {
        messageContent,
        senderName,
        senderEmail,
        plantId,
        senderUserId
    } = messageData;

    // Validation
    if (!messageContent) {
        throw new Error('Please enter a message');
    }
    if (!senderName) {
        throw new Error('Please enter your name');
    }
    if (!senderEmail) {
        throw new Error('Please enter your email');
    }



    try {
        const token = localStorage.getItem("token");

        const response = await axios.post('https://novi-backend-api-wgsgz.ondigitalocean.app/api/messages', {
            content: messageContent,
            plantId: Number(plantId),
            nameSender: senderName,
            emailSender: senderEmail,
            userId: Number(senderUserId),
            createdAt: new Date().toISOString()

            },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'novi-education-project-id': `${import.meta.env.VITE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Full error:', error.response);
        throw new Error(error.response?.data?.message || 'Failed to send message. Please try again.');
    }
};