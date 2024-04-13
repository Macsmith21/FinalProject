document.addEventListener('DOMContentLoaded', loadShows);

async function loadShows() {
    try {
        const ShowsResponse = await fetch('https://macsmith21.github.io/CSCE242/project/jsonFiles/Shows.json');
        const ShowsData = await ShowsResponse.json();
        renderShows(ShowsData);
    } catch (fetchError) {
        console.error('Error fetching house Shows:', fetchError);
    }
}

function renderShows(Shows) {
    const ShowsContainer = document.getElementById('top5');
    ShowsContainer.innerHTML = ''; // Clear existing content
    Shows.forEach(Show => {
        const ShowContainer = document.createElement('section');
        ShowContainer.className = 'row';

        const ShowImage = document.createElement('img');
        ShowImage.src = Show.image;
        ShowImage.alt = Show.title;

        const ShowDetails = document.createElement('section');
        const ShowList = document.createElement('ul');
        ShowList.className = 'descs';

        const titleItem = document.createElement('li');
        titleItem.textContent = `Title: ${Show.title}`;
        ShowList.appendChild(titleItem);

        const CreatorItem = document.createElement('li');
        CreatorItem.textContent = `Creator: ${Show.Creator}`;
        ShowList.appendChild(CreatorItem);

        const genreItem = document.createElement('li');
        genreItem.textContent = `Genre: ${Show.Genre}`;
        ShowList.appendChild(genreItem);

        const yearItem = document.createElement('li');
        yearItem.textContent = `Year: ${Show.Year}`;
        ShowList.appendChild(yearItem);

        // Append elements to the DOM
        ShowDetails.appendChild(ShowList);
        ShowContainer.appendChild(ShowImage);
        ShowContainer.appendChild(ShowDetails);
        ShowsContainer.appendChild(ShowContainer);
    });
}









const Hamburger = () =>{
    let burg = document.getElementById("main-nav");
    burg.classList.toggle("hide");
}

window.onload = () => {
    document.getElementById("hamburger").onclick = Hamburger;
}