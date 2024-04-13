const Hamburger = () =>{
    let burg = document.getElementById("main-nav");
    burg.classList.toggle("hide");
}

window.onload = () => {
    document.getElementById("hamburger").onclick = Hamburger;
}