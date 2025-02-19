const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const loadingIndicator = document.getElementById("loadingIndicator");
const closeGallery = document.getElementById("closeGallery");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

// GALLERY OPEN BUTTONS
const buttonIosDashboard = document.getElementById('ios-dashboard-gallery');
const buttonApiWeather = document.getElementById("api-weather-gallery");
const buttonIjApp = document.getElementById("ij-gallery");

// Individual galleries
const iosDashboardApp = [
    "ida-stats-portrait.png",
    "ida-customer-read-portrait.png",
    "ida-write-customer-portrait.png",
    "ida-customer-usage-write-portrait.png",
    "ida-read-usage-portrait.png"
];

const apiWeatherApp = [
    "awa-home.png"
];

const ironJournalApp = [
    "ij-build.png",
    "ij-history.png",
    "ij-home.png",
    "ij-login.png",
    "ij-prs.png",
    "ij-workout.png"
];

// Variables for the current gallery and index
const galleryLocation = "../img/gallery/";
let images = iosDashboardApp;
let currentIndex = 0;

// HELPERS
function updateImage() {
    // Show loading indicator
    loadingIndicator.style.display = "block";
    galleryImage.style.display = "none";

    const newImage = new Image();
    newImage.src = galleryLocation + images[currentIndex];

    newImage.onload = () => {
        galleryImage.src = newImage.src;
        loadingIndicator.style.display = "none"; // Hide loading indicator
        galleryImage.style.display = "block"; // Show image after it's fully loaded
    };

    newImage.onerror = () => {
        loadingIndicator.style.display = "none";
        galleryImage.style.display = "block";
        galleryImage.src = galleryLocation + "fallback-image.png"; // Set a fallback image if loading fails
    };
}

function openGallery() {
    galleryModal.style.display = "flex";
    galleryModal.classList.add("show");
    updateImage();
}

// GALLERY UI
closeGallery.addEventListener("click", () => {
    galleryModal.classList.remove("show");
});

nextImage.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

prevImage.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});

// INDIVIDUAL GALLERY BUTTONS
buttonIjApp.addEventListener("click", () => {
    currentIndex = 0;
    images = ironJournalApp;
    openGallery();
});

buttonIosDashboard.addEventListener("click", () => {
    currentIndex = 0;
    images = iosDashboardApp;
    openGallery();
});

buttonApiWeather.addEventListener("click", () => {
    currentIndex = 0;
    images = apiWeatherApp;
    openGallery();
});
