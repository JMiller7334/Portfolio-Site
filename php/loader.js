const formResponse = document.getElementById("form-response");
const formButton = document.getElementById("form-button");

let formDebounce = false;

function resetFormResponse(){
    formResponse.classList.remove("show");
    formButton.classList.remove("debounce");
    formResponse.textContent = "";
}

document.getElementById("contact-form").addEventListener("submit", function (e) { 
    e.preventDefault();
    const formData = new FormData(this);

    if (formDebounce) {
        return
    }
    formDebounce = true;
    formResponse.textContent = "Sending message ..."
    formResponse.classList.add("show");
    formButton.classList.add("debounce");

    fetch("/php/contact.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        formResponse.textContent = data;
        console.log(data);

        if (data.includes("Message sent successfully")) {
            document.getElementById("contact-form").reset();
            setTimeout(() => {
                resetFormResponse();
                formDebounce = false;
            }, 3000);
        }
    })
    .catch(error => {
        formResponse.textContent = "An error occurred. Please try again.";
        console.error("Error:", error);

        setTimeout(() => {
            resetFormResponse();
            formDebounce = false;
        }, 3000);
    });
});

