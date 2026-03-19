function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NL', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
    });
}

export default formatDate;
