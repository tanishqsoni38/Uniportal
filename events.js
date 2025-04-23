document.addEventListener('DOMContentLoaded', function() {
    // Sample event data (in a real application, this would come from a database)
    const events = [
        {
            name: "event1",
            title: "Tech Conference 2024",
            description: "Join us for the biggest tech conference of the year featuring industry leaders and innovative technologies.",
            date: "2024-05-15",
            time: "09:00 AM",
            location: "Convention Center, New York",
            organizer: "Tech Events Inc.",
            price: "$199",
            capacity: "500",
            category: "Technology",
            speakers: [
                { name: "John Smith", role: "CTO, TechCorp" },
                { name: "Sarah Johnson", role: "AI Researcher" }
            ]
        },
        {
            name: "event2",
            title: "Music Festival",
            description: "Experience three days of amazing music performances from top artists around the world.",
            date: "2024-06-20",
            time: "02:00 PM",
            location: "Central Park, New York",
            organizer: "Music Events LLC",
            price: "$149",
            capacity: "2000",
            category: "Music",
            lineup: [
                { name: "The Rock Band", time: "2:00 PM" },
                { name: "Jazz Ensemble", time: "4:00 PM" }
            ]
        },
        {
            name: "event3",
            title: "Business Workshop",
            description: "Learn essential business skills and network with industry professionals.",
            date: "2024-04-10",
            time: "10:00 AM",
            location: "Business Center, Chicago",
            organizer: "Business Academy",
            price: "$99",
            capacity: "100",
            category: "Business",
            topics: [
                "Business Strategy",
                "Marketing",
                "Financial Planning"
            ]
        }
    ];

    // Store events in localStorage
    localStorage.setItem('events', JSON.stringify(events));

    // Function to display events
    function displayEvents() {
        const eventsContainer = document.getElementById('eventsContainer');
        if (!eventsContainer) return;

        eventsContainer.innerHTML = events.map(event => `
            <div class="event-card" data-event-name="${event.name}">
                <div class="event-image">
                    <img src="images/${event.name}.jpg" alt="${event.title}">
                </div>
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <div class="event-meta">
                        <span><i class="fas fa-calendar"></i> ${event.date}</span>
                        <span><i class="fas fa-clock"></i> ${event.time}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-actions">
                        <a href="event-details.html?name=${event.name}" class="btn-primary">
                            <i class="fas fa-info-circle"></i> View Details
                        </a>
                        <button class="btn-secondary register-event" data-event-name="${event.name}">
                            <i class="fas fa-ticket-alt"></i> Register
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to register buttons
        document.querySelectorAll('.register-event').forEach(button => {
            button.addEventListener('click', function() {
                const eventName = this.getAttribute('data-event-name');
                registerForEvent(eventName);
            });
        });
    }

    // Function to handle event registration
    function registerForEvent(eventName) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please login to register for events');
            window.location.href = 'login.html';
            return;
        }

        // Get existing registrations
        const userRegistrations = JSON.parse(localStorage.getItem('userRegistrations')) || {};
        
        // Check if already registered
        if (userRegistrations[eventName]) {
            alert('You are already registered for this event');
            return;
        }

        // Register user for event
        userRegistrations[eventName] = {
            eventName: eventName,
            registrationDate: new Date().toISOString()
        };

        localStorage.setItem('userRegistrations', JSON.stringify(userRegistrations));
        alert('Registration successful!');
    }

    // Initialize events display
    displayEvents();
}); 