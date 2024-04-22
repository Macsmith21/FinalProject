
  const displayArts = async () => {
      const response = await fetch("/api/Art"); 
      if (!response.ok) {
          console.error("Failed to fetch art:", response.statusText);
          return;
      }
      const crafts = await response.json();
      console.log(crafts)
      const top5Container = document.getElementById("top5");
      top5Container.innerHTML = ''; 

      crafts.forEach(art => {
          const craftElement = document.createElement("div");
          craftElement.className = "art-item";
          let formattedDate = 'Unknown Date';
          if (art.year) {
              const dateObj = new Date(art.year);
              const day = String(dateObj.getUTCDate()).padStart(2, '0');
              const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); 
              const year = dateObj.getUTCFullYear();
              formattedDate = `${day}/${month}/${year}`;
          }
  
          craftElement.innerHTML = `
              <h3>${art.title}</h3>
              <img src="/uploads/Assets/images/${art.img}" alt="${art.title}" style="width:100%;"/>
              <h3>Creator</h3>
              <p>${art.creator}</p>
              <h3>Genre</h3>
              <p>${art.genre}</p>
              <h3>Year</h3>
              <p>${formattedDate}</p>
              <button onclick="editArt('${art._id}')">Edit</button>
              <button onclick="deleteArt('${art._id}')">Delete</button>
          `;
          top5Container.appendChild(craftElement);
      });
  };

  displayArts();


  const editArt = async (id) => {
    console.log("Editing art with ID:", id);
    const response = await fetch(`/api/Art/${id}`);
    if (response.ok) {
      const item = await response.json();
      const form = document.getElementById("form-movie");
      form._id.value = item._id;
      form.title.value = item.title;
      form.creator.value = item.creator;
      form.genre.value = item.genre;
      form.year.value = item.year ? new Date(item.year).toISOString().substring(0, 10) : '';
      showModal();
    } else {
      console.error('Failed to fetch art details:', response.statusText);
    }
  };
  
  const showModal = () => {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "block";
  };
  
  const closeModal = () => {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "none";
  };

  
  
const showform = () => {
  const form = document.getElementById("form-movie");
  form.style.display = "block";
}
const deleteArt = async (id) => {
  const response = await fetch(`/api/Art/${id}`, {
      method: "DELETE",
  });
  if (response.ok) {
      console.log("Art deleted successfully");
      displayArts();  // Refresh the list after deletion
  } else {
      console.error("Failed to delete art:", response.statusText);
  }
};

document.getElementById('form-movie').addEventListener('submit', async function(event) {
  event.preventDefault();  // Prevent the normal submission action

  const form = event.target;
  const formData = new FormData(form); // Use FormData to handle file inputs correctly

  // Include the '_id' hidden input in the URL
  const id = formData.get('_id');
  const response = await fetch(`/api/Art/${id}`, {
      method: 'PUT',
      body: formData  // Send the form data
  });

  if (response.ok) {
      console.log('Art updated successfully');
      closeModal(); 
      displayArts(); 
  } else {
      console.error('Failed to update art:', response.statusText);
      alert('Failed to update the art.'); // Provide feedback on failure
  }
});

window.onload = () => {
  displayArts();
}