const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const closeGallery = document.getElementById("closeGallery");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

//GALLERY OPEN BUTTONS;
const buttonIosDashboard = document.getElementById('ios-dashboard-gallery');


//individual galleries
const iosDashboardApp = [
    "ida-stats-portrait.png",
    "ida-customer-read-portrait.png",
    "ida-write-customer-portrait.png",
    "ida-customer-usage-write-portrait.png",
    "ida-read-usage-portrait.png"
];

//variable representing the current gallery, index being displayed
const galleryLocation = "../img/gallery/"
let images = iosDashboardApp;
let currentIndex = 0;


//HELPER FUNCS:
function updateImage() {
    galleryImage.src = galleryLocation+images[currentIndex];
}

function openGallery() {
    galleryModal.style.display = "flex";
    updateImage();
};


//GALLERY UI:
closeGallery.addEventListener("click", () => {
    galleryModal.style.display = "none";
});

nextImage.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

prevImage.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});


//INDIVIDUAL GALLERY CALLS -- buttons:
buttonIosDashboard.addEventListener("click", () => {
    currentIndex = 0;
    images = iosDashboardApp;
    openGallery();
});