document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Get users from localStorage
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    // Store user data without password
                    const { password, ...userData } = user;
                    localStorage.setItem('user', JSON.stringify(userData));
                    window.location.href = 'index.html';
                } else {
                    alert('Invalid email or password');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during login');
            }
        });
    }

    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Get existing users
                const users = JSON.parse(localStorage.getItem('users')) || [];
                
                // Check if email already exists
                if (users.some(user => user.email === data.email)) {
                    alert('Email already registered');
                    return;
                }

                // Add new user
                users.push(data);
                localStorage.setItem('users', JSON.stringify(users));
                
                alert('Registration successful! Please login.');
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration');
            }
        });
    }

    // Check if user is logged in
    function checkAuth() {
        const user = localStorage.getItem('user');
        if (!user && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
            window.location.href = 'login.html';
        }
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }

    checkAuth();
}); 