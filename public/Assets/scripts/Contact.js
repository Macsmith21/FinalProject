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
const submitMovieForm = async (e) => {
    e.preventDefault();
    const form = document.getElementById("form-movie");
    const formData = new FormData(form);
    let response;
    console.log(...formData);
  
    //add request
    if (form._id.value.trim() == "") {
      console.log("in post");
      response = await fetch("/api/Art", {
        method: "POST",
        body: formData,
      });
    
    if (!response.ok()){
        // Display feedback message
        const movieFormFeedback = document.getElementById('movieFormFeedback');
        movieFormFeedback.textContent = "uh oh! There was a problem with your submission";
        movieFormFeedback.style.color = 'red';
    };

        movieFormFeedback.textContent = "Thank you! Your submission has been received.";
        movieFormFeedback.style.color = 'green';
        form.reset();
        setTimeout(() => {
            movieFormFeedback.textContent = '';
        }, 5000);

    };}
    
document.getElementById("form-movie").onsubmit = submitMovieForm;