document.addEventListener('DOMContentLoaded', function() {
    const createEventForm = document.getElementById('createEventForm');
    
    createEventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const eventName = document.getElementById('eventName').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const eventCategory = document.getElementById('eventCategory').value;
        const eventTheme = document.getElementById('eventTheme').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = document.getElementById('eventTime').value;
        const eventLocation = document.getElementById('eventLocation').value;
        const eventCapacity = document.getElementById('eventCapacity').value;
        const eventPrice = document.getElementById('eventPrice').value;
        const eventContact = document.getElementById('eventContact').value;
        const eventWebsite = document.getElementById('eventWebsite').value;
        const eventTerms = document.getElementById('eventTerms').value;

        // Create event object
        const newEvent = {
            id: Date.now().toString(), // Generate unique ID
            title: eventName,
            description: eventDescription,
            category: eventCategory,
            theme: eventTheme,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            capacity: eventCapacity,
            price: eventPrice,
            contact: eventContact,
            website: eventWebsite,
            terms: eventTerms,
            organizer: JSON.parse(localStorage.getItem('user')).name,
            createdAt: new Date().toISOString()
        };

        // Get existing events from localStorage
        const events = JSON.parse(localStorage.getItem('events')) || [];
        
        // Add new event
        events.push(newEvent);
        
        // Save back to localStorage
        localStorage.setItem('events', JSON.stringify(events));
        
        // Show success message
        alert('Event created successfully!');
        
        // Redirect to events page
        window.location.href = 'events.html';
    });

    // Handle image upload preview
    const eventImageInput = document.getElementById('eventImage');
    if (eventImageInput) {
        eventImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // You can store the image data in localStorage or handle it as needed
                    console.log('Image uploaded:', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}); 