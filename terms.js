document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('termsModal');
    const termsLink = document.getElementById('termsLink');
    const closeModal = document.querySelector('.close-modal');
    const acceptTerms = document.getElementById('acceptTerms');
    const declineTerms = document.getElementById('declineTerms');
    const termsCheckbox = document.getElementById('terms');

    // Open modal when terms link is clicked
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    });

    // Close modal when close button is clicked
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle accept terms button
    acceptTerms.addEventListener('click', function() {
        termsCheckbox.checked = true;
        modal.style.display = 'none';
    });

    // Handle decline terms button
    declineTerms.addEventListener('click', function() {
        termsCheckbox.checked = false;
        modal.style.display = 'none';
    });

    // Prevent form submission if terms are not accepted
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        if (!termsCheckbox.checked) {
            e.preventDefault();
            alert('Please accept the Terms and Conditions to continue.');
        }
    });
}); 