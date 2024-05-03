console.log("Main JS\n\n");

function basicFetch() {
    consolelog('Basic Fetch');
    // Async Version
    // async function fetchUsers() {
    //     try {
    //         const url = "https://jsonplaceholder.typicode.com/users";
    //         const request = await fetch(url).then(response => response.json());
    //         console.log(request);
    //         console.log("Users successfully retrieved.");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
    fetchUsers();
    
    // Then Version
    const url = "https://jsonplaceholder.typicode.com/users";
    
    fetch(url)
        .then((response) => {
            let error = true;
            if(!response.ok || !error) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
}

async function asyncAwait() {
    console.log('Async / Await');

    var num1 = 10, num2 = 1;
   

    async function wait() {
        for(let i = num1; i >= num2; i--) {
            await new Promise(resolve => setTimeout(() => {
                console.log(i);
                resolve();
            }, 1000));
        }
    }

    await wait();
    
    console.log("test");
}

async function basicFetchRefractor() {
    try {
        const url = "https://jsonplaceholder.typicode.com/users";
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// Run
basicFetchRefractor();
