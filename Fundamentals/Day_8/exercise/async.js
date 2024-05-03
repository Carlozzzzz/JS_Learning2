console.log("Async Fetch");

const fetchButton = document.querySelector("#fetchButton");

fetchButton.addEventListener("click", fetchData);

async function fetchData() {
    try {
        const url = "https://jsonplaceholder.typicode.com/photos";
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("HTTP error: ", response.status);
        }
        const data = response.json();

        // console.log(data);

        return data;
    } catch (error) {
        console.log(error);
    }
}


/**
 * Practice
 */
const insertButton = document.querySelector("#insertButton");
const randomImage = document.querySelector("#random-img");

insertButton.addEventListener("click", async () => {

    try {
        console.log("Requesting image...");
        
        // Delay image loading with setTimeout
        insertButton.disabled = true;
        // Load the loader image
        randomImage.src = "loader.gif";

        const data = await fetchData();
        const count = data.length;

        const randomIndex = Math.floor(Math.random() * count);
        const imageLink = data[randomIndex].url;

        randomImage.src = imageLink;
        console.log(randomImage.src);

        insertButton.disabled = false;

    } catch (error) {
        console.error(error);
    } 
});

