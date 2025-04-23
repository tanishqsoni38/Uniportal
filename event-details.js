document.addEventListener('DOMContentLoaded', function() {
    // Get event name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('name');

    if (!eventName) {
        window.location.href = 'events.html';
        return;
    }

    // Get events from localStorage
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events.find(e => e.name === eventName);

    if (!event) {
        window.location.href = 'events.html';
        return;
    }

    // Populate event details
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDate').textContent = event.date;
    document.getElementById('eventTime').textContent = event.time;
    document.getElementById('eventLocation').textContent = event.location;
    document.getElementById('eventImage').src = `images/${event.name}.jpg`;
    document.getElementById('eventImage').alt = event.title;
    document.getElementById('eventDescription').textContent = event.description;
    document.getElementById('eventCategory').textContent = event.category;
    document.getElementById('eventOrganizer').textContent = event.organizer;
    document.getElementById('eventCapacity').textContent = event.capacity;
    document.getElementById('eventDeadline').textContent = event.deadline || 'N/A';

    // Add event-specific content based on category
    const detailSection = document.querySelector('.detail-section ul');
    
    // Add price if available
    if (event.price) {
        const priceItem = document.createElement('li');
        priceItem.innerHTML = `<strong>Price:</strong> <span>${event.price}</span>`;
        detailSection.appendChild(priceItem);
    }

    // Add speakers for tech conference
    if (event.speakers) {
        const speakersSection = document.createElement('div');
        speakersSection.className = 'event-speakers';
        speakersSection.innerHTML = `
            <h3>Speakers</h3>
            <ul>
                ${event.speakers.map(speaker => `
                    <li>
                        <strong>${speaker.name}</strong>
                        <span>${speaker.role}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        document.querySelector('.event-content').appendChild(speakersSection);
    }

    // Add lineup for music festival
    if (event.lineup) {
        const lineupSection = document.createElement('div');
        lineupSection.className = 'event-lineup';
        lineupSection.innerHTML = `
            <h3>Lineup</h3>
            <ul>
                ${event.lineup.map(artist => `
                    <li>
                        <strong>${artist.name}</strong>
                        <span>${artist.time}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        document.querySelector('.event-content').appendChild(lineupSection);
    }

    // Add topics for business workshop
    if (event.topics) {
        const topicsSection = document.createElement('div');
        topicsSection.className = 'event-topics';
        topicsSection.innerHTML = `
            <h3>Topics</h3>
            <ul>
                ${event.topics.map(topic => `
                    <li>${topic}</li>
                `).join('')}
            </ul>
        `;
        document.querySelector('.event-content').appendChild(topicsSection);
    }

    // Handle registration button
    const registerBtn = document.getElementById('registerBtn');
    const cancelBtn = document.getElementById('cancelRegistrationBtn');
    const registrationStatus = document.getElementById('registrationStatus');

    // Check if user is already registered
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const userRegistrations = JSON.parse(localStorage.getItem('userRegistrations')) || {};
        if (userRegistrations[event.id]) {
            registerBtn.style.display = 'none';
            cancelBtn.style.display = 'flex';
            registrationStatus.textContent = 'You are registered for this event';
        }
    } else {
        registerBtn.disabled = true;
        registerBtn.textContent = 'Login to Register';
        registrationStatus.textContent = 'Please login to register for this event';
    }

    registerBtn.addEventListener('click', function() {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        // Get existing registrations
        const userRegistrations = JSON.parse(localStorage.getItem('userRegistrations')) || {};
        
        // Check if already registered
        if (userRegistrations[event.id]) {
            alert('You are already registered for this event');
            return;
        }

        // Register user for event
        userRegistrations[event.id] = {
            eventId: event.id,
            registrationDate: new Date().toISOString()
        };

        localStorage.setItem('userRegistrations', JSON.stringify(userRegistrations));

        // Update UI
        registerBtn.style.display = 'none';
        cancelBtn.style.display = 'flex';
        registrationStatus.textContent = 'You have successfully registered for this event';
        
        alert('Registration successful!');
    });

    cancelBtn.addEventListener('click', function() {
        if (!user) return;

        // Get existing registrations
        const userRegistrations = JSON.parse(localStorage.getItem('userRegistrations')) || {};
        
        // Remove registration
        delete userRegistrations[event.id];
        localStorage.setItem('userRegistrations', JSON.stringify(userRegistrations));

        // Update UI
        registerBtn.style.display = 'flex';
        cancelBtn.style.display = 'none';
        registrationStatus.textContent = 'Your registration has been cancelled';
        
        alert('Registration cancelled successfully!');
    });
}); 