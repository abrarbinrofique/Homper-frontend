document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the customer data from localStorage
    const customerData = localStorage.getItem('customer');
    if (customerData) {
        const customer = JSON.parse(customerData);

        // Display the customer data on the page
        document.getElementById('customer-dp').src = customer.dp;
        document.getElementById('customer-name').innerText = customer.user;
        document.getElementById('customer-designation').innerText = 'Customer'; // Replace with actual designation if available
        document.getElementById('customer-fee').innerText = 'N/A'; // Replace with actual fee if available
        document.getElementById('customer-available-time').innerText = 'N/A'; // Replace with actual available time if available
        
        // Set specialization buttons
        const specializationContainer = document.getElementById('customer-specialization');
        if (customer.specialization) {
            customer.specialization.forEach(spec => {
                const button = document.createElement('button');
                button.className = 'bg-secondary text-white m-1';
                button.innerText = spec;
                specializationContainer.appendChild(button);
            });
        }

        // Set social links
        document.getElementById('customer-fb').href = customer.fb || '#';
        document.getElementById('customer-ln').href = customer.ln || '#';
        document.getElementById('customer-twitter').href = customer.x || '#'; // Assuming 'x' is for Twitter
    } else {
        console.error('No customer data found in localStorage.');
    }
});
