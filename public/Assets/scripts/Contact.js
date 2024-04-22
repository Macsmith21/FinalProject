const Hamburger = () =>{
    let burg = document.getElementById("main-nav");
    burg.classList.toggle("hide");
}

window.onload = () => {
    document.getElementById("hamburger").onclick = Hamburger;
}
document.getElementById('contactform').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const form = e.target;
    const data = new FormData(form);
    const formFeedback = document.getElementById('formFeedback');

    fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Success feedback
            formFeedback.innerHTML = "Thank you! You will be responded to as soon as possible";
            formFeedback.style.color = 'green';
            form.reset(); // Clear the form fields
        } else {
            // Error feedback if the submission was not successful
            formFeedback.innerHTML = "uh oh! There was a problem with your submission";
            formFeedback.style.color = 'red';
        }
    })
    .catch(error => {
        // Error feedback for network errors or exceptions
        console.error('Submission error:', error);
        formFeedback.innerHTML = "An error occurred. Please try again later.";
        formFeedback.style.color = 'red';
    });

    // Clear the feedback message after 5 seconds
    setTimeout(() => {
        formFeedback.textContent = '';
    }, 5000);
});
document.getElementById('form-movie').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData, // formData will be sent correctly without setting 'Content-Type'
            // 'headers' is not set because the browser will automatically set the multipart boundary
        });

        const data = await response.json();

        const movieFormFeedback = document.getElementById('movieFormFeedback');
        if (response.ok) {
            movieFormFeedback.textContent = "Thank you! Your submission has been received.";
            movieFormFeedback.style.color = 'green';
        } else {
            movieFormFeedback.textContent = data.errors.join(", ");
            movieFormFeedback.style.color = 'red';
        }
    } catch (error) {
        console.error('Submission error:', error);
        movieFormFeedback.textContent = "An error occurred. Please try again later.";
        movieFormFeedback.style.color = 'red';
    }

    setTimeout(() => {
        movieFormFeedback.textContent = '';
    }, 5000);
});

    
document.getElementById("form-movie").onsubmit = submitMovieForm;