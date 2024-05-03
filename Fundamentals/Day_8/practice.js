/**
 * Main
 */

main();
alarm2();

function main() {
    console.log("--- Main js ---");

    const fetchPromise = fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    
    console.log("Started request…");

    fetchPromise
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error(`Could not get the results: ${error}`);
        });
    


    async function fetchProducts() {
        try {
            const response = await fetch(
                "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
            );
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            console.log(data[0].name);
        } catch (error) {
            console.error(`Could not get products: ${error}`);
        }
    }
    
    fetchProducts();

}

function alarm() {
    const output = document.querySelector("#output");
    const button = document.querySelector("#set-alarm");

    function setAlarm() {
        setTimeout(() => {
            output.textContent = "Gising na!";
        }, 1000);
        setTimeout(() => {
            output.textContent = "";
        }, 2000);
    }

    button.addEventListener("click", setAlarm);
}

function alarm2() {

    const output = document.querySelector("#output");
    const button = document.querySelector("#set-alarm");

    function setAlarm(person, delay) {
        return new Promise((resolve, reject) => {
            try {
                if(! person ) {
                    throw new Error("Name field must be filled.");
                } else if (delay < 0 || ! delay) {
                    throw new Error("Alarm delay must not be negative.");
                } else {
                    setTimeout(() => {
                        resolve(`Wake up, ${person}'s ass.`);
                    }, delay);
                }
        
            } catch (error) {
                reject(error);            
            }
        });
    }

    button.addEventListener("click", async() => {
        try {
            const personTxt = document.querySelector("#nameInput");
            const delayTxt = document.querySelector("#delayInput");

            output.textContent = "";
            const message = await setAlarm(personTxt.value, delayTxt.value);
            output.textContent = message;
        } catch (error) {
            output.textContent = `Couldn't set alarm: ${error}`;
        }
    });


}