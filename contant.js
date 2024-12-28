// contact.js
$(document).ready(function() {
    const form = $('#contact-form');
    
    form.on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            showSuccess();
            form[0].reset();
        }
    });

    function validateForm() {
        let isValid = true;
        const fields = {
            firstName: { regex: /^[A-Za-z]{2,}$/, message: 'Please enter a valid first name' },
            lastName: { regex: /^[A-Za-z]{2,}$/, message: 'Please enter a valid last name' },
            email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' },
            mobile: { regex: /^\d{10}$/, message: 'Please enter a valid 10-digit mobile number' },
            age: { regex: /^(?:1[0-9]|[2-9][0-9])$/, message: 'Age must be between 10 and 99' },
            address: { regex: /.{10,}/, message: 'Address must be at least 10 characters long' },
            hobbies: { regex: /.+/, message: 'Please enter your hobbies' },
            country: { regex: /.+/, message: 'Please select a country' }
        };

        Object.entries(fields).forEach(([field, validation]) => {
            const input = $(`#${field}`);
            const value = input.val();

            if (!validation.regex.test(value)) {
                showError(input, validation.message);
                isValid = false;
            } else {
                removeError(input);
            }
        });

        return isValid;
    }

    function showError(input, message) {
        const errorDiv = input.next('.error-message');
        if (errorDiv.length === 0) {
            input.after(`<div class="error-message" style="color: red; font-size: 0.8rem;">${message}</div>`);
        }
        input.addClass('error');
    }

    function removeError(input) {
        input.next('.error-message').remove();
        input.removeClass('error');
    }

    function showSuccess() {
        const successMessage = $('<div>')
            .addClass('success-message')
            .text('Thank you for your message! We will get back to you soon.');
        form.before(successMessage);
        setTimeout(() => successMessage.remove(), 3000);
    }
});
