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
        console.log("Spam detected. Form not submitted.");

        setTimeout(() => resetFormResponse(), 3000);
        formDebounce = false;
        return;
    }

    // Sending a POST request to the PHP script
    try {
        const formResponse = document.getElementById("form-response");
        const formButton = document.getElementById("form-button");
    
        let formDebounce = false;
        
        // Debounce to prevent repeated form submission
        if (formDebounce) {
            return;
        }
        formDebounce = true;
        
        formResponse.textContent = "Sending message...";
        formResponse.classList.add("show");
        formButton.classList.add("debounce");
    
        const formData = new FormData(document.getElementById("contact-form"));
        const requestData = {
            name: formData.get("name").trim(),
            email: formData.get("email").trim(),
            message: formData.get("message").trim(),
            honeypot: formData.get("honeypot") // Honeypot for spam detection
        };
    
        // Check for empty fields
        if (!requestData.name || !requestData.email || !requestData.message) {
            formResponse.textContent = "All fields are required.";
            setTimeout(() => resetFormResponse(), 3000);
            formDebounce = false;
            return;
        }
    
        // Honeypot spam detection
        if (requestData.honeypot) {
            formResponse.textContent = "Spam detected. Form not submitted.";
            console.log("Spam detected. Form not submitted.");
            setTimeout(() => resetFormResponse(), 3000);
            formDebounce = false;
            return;
        }
    
        // Sending a POST request to the PHP script
        //test url: https://jacobjmiller.com/portfolio-api/public/email.php
        //production url: /portfolio-api/public/email.php
        const response = await fetch('/portfolio-api/public/email.php', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
    
        const data = await response.json(); // Expecting a JSON response
    
        // Handle the response from PHP
        if (data.success) {
            formResponse.textContent = data.success;
            document.getElementById("contact-form").reset();
            console.log(data.success);
        } else if (data.error) {
            formResponse.textContent = data.error;
            console.log(data.error);
        } else {
            formResponse.textContent = 'Invalid format.';
            console.log('Invalid format');
        }
    } catch (error) {
        formResponse.textContent = 'An error occurred while processing the response.';
        console.error('Error:', error);
    } finally {
        // Reset after the response is processed
        setTimeout(() => {
            resetFormResponse();
            formDebounce = false;
        }, 3000);
    }
});    