let responseData = ``;

function displayResponse() {
    document.getElementById("display-response").innerText = responseData.response;
}

async function handleSubmit(event) {
    event.preventDefault();

    try {
        const userInput = document.querySelector('.input-form').value;
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: userInput })
        });

        responseData = await response.json();

        displayResponse();
    } catch (error) {
        console.error("Error fetching response:", error);
    }

    document.querySelector('.input-form').value = '';
}

document.querySelector('.topic-form').addEventListener('submit', handleSubmit);
