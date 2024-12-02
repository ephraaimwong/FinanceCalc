function sendFeedback() {
    const subject = document.getElementById('name').value + ' Feedback';
    const message = document.getElementById('message').value;
    window.location.href = 'mailto:javid-pena-limones@ou.edu?subject=' +subject+ '&body=' +message;
}