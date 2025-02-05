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
        name: formData.get("name").trim(),
        email: formData.get("email").trim(),
        message: formData.get("message").trim(),
        honeypot: formData.get("honeypot")
    };

    //check for empty fields
    if (!requestData.name || !requestData.email || !requestData.message) {
        formResponse.textContent = "All fields are required.";
        setTimeout(() => resetFormResponse(), 3000);
        formDebounce = false;
        return;
    }

    // Honeypot spam detection
    if (requestData.honeypot) {
        formResponse.textContent = "Spam detected. Form not submitted.";
        console.log("Spam detect. Form not submitted.")

        setTimeout(() => resetFormResponse(), 3000);
        formDebounce = false;
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
    
        if (!response.ok) {
            formResponse.textContent = `An error occurred: ${response.status}`;
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //attempt to parse JSON safely
        let firstValidJson;
        try {
            firstValidJson = await response.json();
        } catch (jsonError) {
            console.error("Invalid JSON response:", jsonError);
            formResponse.textContent = "Unexpected server response.";
            
            setTimeout(() => resetFormResponse(), 3000);
            formDebounce = false;
            return;
        }

        //handle API response:
        if (firstValidJson.success) {
            formResponse.textContent = firstValidJson.success;
            document.getElementById("contact-form").reset();
            console.log(firstValidJson.success);


        } else if (firstValidJson.error) {
            formResponse.textContent = firstValidJson.error;
            console.log(firstValidJson.error);

        } else {
            formResponse.textContent = "Invalid format.";
            console.log("Invalid format");
        }

    } catch (error) {
        formResponse.textContent = "An error occurred while processing the response.";
        console.error("Error:", error);
    }

    setTimeout(() => {
        resetFormResponse();
        formDebounce = false;
    }, 3000);
});
