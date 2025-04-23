document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgotPasswordForm');
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    const mobileInput = document.getElementById('mobile');
    const otpInput = document.getElementById('otp');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Handle OTP sending
    sendOtpBtn.addEventListener('click', function() {
        const mobile = mobileInput.value.trim();
        
        if (!mobile || !/^\d{10}$/.test(mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        // Simulate sending OTP (in a real application, this would call an API)
        sendOtpBtn.disabled = true;
        sendOtpBtn.textContent = 'Sending OTP...';
        
        setTimeout(() => {
            // Simulate OTP sent successfully
            alert('OTP has been sent to your mobile number');
            sendOtpBtn.textContent = 'Resend OTP';
            sendOtpBtn.disabled = false;
            otpInput.focus();
        }, 2000);
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const mobile = mobileInput.value.trim();
        const otp = otpInput.value.trim();
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validate inputs
        if (!mobile || !/^\d{10}$/.test(mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        if (!otp || !/^\d{6}$/.test(otp)) {
            alert('Please enter a valid 6-digit OTP');
            return;
        }

        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Simulate password reset (in a real application, this would call an API)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.mobile === mobile);

        if (userIndex === -1) {
            alert('No account found with this mobile number');
            return;
        }

        // Update password
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));

        alert('Password has been reset successfully');
        window.location.href = 'login.html';
    });
}); 