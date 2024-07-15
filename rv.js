document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const reviewText = document.getElementById('reviewText').value;
    const rating = document.getElementById('rating').value;

    fetch('https://homeper.onrender.com/service/review/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            review: reviewText,
            rating: rating
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Review submitted successfully!');
        // Optionally, you can clear the form here
        document.getElementById('reviewForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting your review.');
    });
});
