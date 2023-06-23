document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);

    // By default, load the inbox
    load_mailbox('inbox');

    document.querySelector('#compose-form').addEventListener('submit', submit_email);
});

function compose_email() {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';

    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

    show_emails(mailbox);
  
    // When loading a mailbox reset potential error message
    document.querySelector("#error_message").innerHTML = '';
  
    // Show the mailbox and hide other views
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';

    // Show the mailbox name
    document.querySelector('#title').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

function submit_email(event) {
    event.preventDefault();
    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: document.querySelector('#compose-recipients').value,
            subject: document.querySelector('#compose-subject').value,
            body: document.querySelector('#compose-body').value
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result['error']) {
            document.querySelector("#error_message").innerHTML = result['error'];
            console.log(result);
        } else {
            load_mailbox('sent'); 
        }
    });
}

function show_emails(mailbox) {
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
        // Print emails
        console.log(emails);
    
        // Reset all the emails
        document.querySelector('#emails').innerHTML = '';

        emails.forEach(email => {
            const element = document.createElement('div');
            element.className = 'list-group-item';

            if (email['read'] === true) {
                element.style.backgroundColor = "#cccccc";
            }

            const sender = document.createElement('div');
            sender.innerHTML = email['sender'];
            element.append(sender);

            const subject = document.createElement('div');
            subject.innerHTML = email['subject'];
            element.append(subject);

            const timestamp = document.createElement('div');
            timestamp.innerHTML = email['timestamp'];
            element.append(timestamp);

            document.querySelector('#emails').append(element);
        });       
    });
}