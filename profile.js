document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Display user information
    document.getElementById('userName').textContent = user.name || 'User';
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userFullName').textContent = user.name || 'Not set';
    document.getElementById('userEmailInfo').textContent = user.email;
    document.getElementById('userPhone').textContent = user.phone || 'Not set';
    document.getElementById('userUniversity').textContent = user.university || 'Not set';

    // Load registered events
    loadRegisteredEvents();

    // Handle edit profile button
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    editProfileBtn.addEventListener('click', openEditProfileModal);

    // Handle edit avatar button
    const editAvatarBtn = document.querySelector('.edit-avatar-btn');
    editAvatarBtn.addEventListener('click', openCamera);
});

// Function to open camera
function openCamera() {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const profileAvatar = document.getElementById('profileAvatar');

    // Create modal for camera
    const modal = document.createElement('div');
    modal.className = 'camera-modal';
    modal.innerHTML = `
        <div class="camera-modal-content">
            <div class="camera-preview">
                <video id="cameraPreview" autoplay playsinline></video>
            </div>
            <div class="camera-controls">
                <button id="captureBtn" class="btn-primary">Capture</button>
                <button id="cancelBtn" class="btn-secondary">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Get video stream
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            const video = document.getElementById('cameraPreview');
            video.srcObject = stream;

            // Handle capture button
            document.getElementById('captureBtn').addEventListener('click', () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0);
                const imageData = canvas.toDataURL('image/png');
                
                // Update profile avatar
                profileAvatar.src = imageData;
                
                // Save to localStorage
                const user = JSON.parse(localStorage.getItem('user'));
                user.avatar = imageData;
                localStorage.setItem('user', JSON.stringify(user));

                // Stop stream and remove modal
                stream.getTracks().forEach(track => track.stop());
                modal.remove();
            });

            // Handle cancel button
            document.getElementById('cancelBtn').addEventListener('click', () => {
                stream.getTracks().forEach(track => track.stop());
                modal.remove();
            });
        })
        .catch(err => {
            console.error('Error accessing camera:', err);
            alert('Could not access camera. Please make sure you have granted camera permissions.');
            modal.remove();
        });
}

// Function to open edit profile modal
function openEditProfileModal() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'edit-profile-modal';
    modal.innerHTML = `
        <div class="edit-profile-modal-content">
            <h2>Edit Profile</h2>
            <form id="editProfileForm">
                <div class="form-group">
                    <label for="editName">Full Name</label>
                    <input type="text" id="editName" value="${user.name || ''}" required>
                </div>
                <div class="form-group">
                    <label for="editPhone">Phone</label>
                    <input type="tel" id="editPhone" value="${user.phone || ''}">
                </div>
                <div class="form-group">
                    <label for="editUniversity">University</label>
                    <input type="text" id="editUniversity" value="${user.university || ''}">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Save Changes</button>
                    <button type="button" class="btn-secondary" id="cancelEdit">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Handle form submission
    const form = document.getElementById('editProfileForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update user data
        const updatedUser = {
            ...user,
            name: document.getElementById('editName').value,
            phone: document.getElementById('editPhone').value,
            university: document.getElementById('editUniversity').value
        };

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Update UI
        document.getElementById('userName').textContent = updatedUser.name;
        document.getElementById('userFullName').textContent = updatedUser.name;
        document.getElementById('userPhone').textContent = updatedUser.phone || 'Not set';
        document.getElementById('userUniversity').textContent = updatedUser.university || 'Not set';

        // Remove modal
        modal.remove();
    });

    // Handle cancel button
    document.getElementById('cancelEdit').addEventListener('click', () => {
        modal.remove();
    });
}

// Function to load registered events
function loadRegisteredEvents() {
    const userRegistrations = JSON.parse(localStorage.getItem('userRegistrations')) || {};
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const registeredEventsContainer = document.getElementById('registeredEvents');

    if (Object.keys(userRegistrations).length === 0) {
        registeredEventsContainer.innerHTML = '<p>You have not registered for any events yet.</p>';
        return;
    }

    const registeredEvents = events.filter(event => userRegistrations[event.id]);

    if (registeredEvents.length === 0) {
        registeredEventsContainer.innerHTML = '<p>You have not registered for any events yet.</p>';
        return;
    }

    registeredEventsContainer.innerHTML = registeredEvents.map(event => `
        <div class="event-item">
            <div class="event-item-info">
                <h3>${event.title}</h3>
                <p>${event.date} at ${event.time}</p>
            </div>
            <div class="event-item-actions">
                <a href="event-details.html?id=${event.id}" class="view-btn">View Details</a>
                <button class="cancel-btn" data-event-id="${event.id}">Cancel Registration</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to cancel buttons
    document.querySelectorAll('.cancel-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            cancelRegistration(eventId);
        });
    });
}

// Function to cancel event registration
function cancelRegistration(eventId) {
    if (!confirm('Are you sure you want to cancel your registration for this event?')) {
        return;
    }

    const userRegistrations = JSON.parse(localStorage.getItem('userRegistrations')) || {};
    
    // Only delete the specific event registration
    if (userRegistrations[eventId]) {
        delete userRegistrations[eventId];
        localStorage.setItem('userRegistrations', JSON.stringify(userRegistrations));
        
        // Reload the events list
        loadRegisteredEvents();
        alert('Registration cancelled successfully!');
    } else {
        alert('Event registration not found!');
    }
} 