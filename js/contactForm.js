const formResponse = document.getElementById("form-response");
const formButton = document.getElementById("form-button");

let formDebounce = false;

function resetFormResponse() {
    formResponse.classList.remove("show");
    formButton.classList.remove("debounce");
    formResponse.textContent = "";
}

document.getElementById("contact-form").addEventListener("submit", async function (e) { 
    e.preventDefault();

    if (formDebounce) {
        return;
    }
    formDebounce = true;
    formResponse.textContent = "Sending message...";
    formResponse.classList.add("show");
    formButton.classList.add("debounce");

    const formData = new FormData(this);
    const requestData = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        honeypot: formData.get("honeypot")
    };

    //check if honeypot field is filled out (spam check)
    if (requestData.honeypot) {
        formResponse.textContent = "Spam detected. Form not submitted.";
        resetFormResponse();
        return;
    }

    try {
        const response = await fetch("http://jacobjmiller.com:8081/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const textResponse = await response.text(); // Get raw response text
        console.log("Raw API Response:", textResponse); // Debugging

        // Extract the first JSON object from the response
        const firstJsonMatch = textResponse.match(/\{.*?\}/); // Match only the first JSON object

        if (firstJsonMatch) {
            const firstValidJson = JSON.parse(firstJsonMatch[0]); // Parse the first JSON object

            if (firstValidJson.success) {
                formResponse.textContent = firstValidJson.success;
                document.getElementById("contact-form").reset();
            } else {
                formResponse.textContent = "Unexpected response format.";
            }
        } else {
            formResponse.textContent = "Invalid response from server.";
        }
    } catch (error) {
        formResponse.textContent = "An error occurred while processing the response.";
        console.error("Parsing error:", error);
    }

    setTimeout(() => {
        resetFormResponse();
        formDebounce = false;
    }, 3000);
});
