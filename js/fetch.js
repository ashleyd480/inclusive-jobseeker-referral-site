const picURL = "https://picsum.photos/v2/list";

fetch(picURL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    loadPicture(data);
  })
  .catch((error) => {
    console.log("Crtical error", error);
  });

const fetchImages = document.querySelector(".fetchImages");

document.addEventListener("DOMContentLoaded", loadPicture);

function loadPicture(data) {
  {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomPic = document.createElement("img");
    randomPic.src = data[randomIndex].download_url;
    randomPic.alt = "Random Image";
    randomPic.style.width = "200px";

    randomPic.style.height = "200px";
    fetchImages.appendChild(randomPic);
  }
}
