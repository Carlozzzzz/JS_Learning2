console.log('Day 8 Exercise');

const fetchButton = document.querySelector("#fetchButton");

fetchButton.addEventListener("click", fetchData);

function fetchData() {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    fetch(url)
        .then((response) => {
            if(!response.ok)
                throw new Error(`HTTP error: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error)
        });
}

function asyncAwaitFetch() {

}