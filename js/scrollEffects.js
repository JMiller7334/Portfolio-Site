
const element = document.querySelector('.container-hero');

var animateHero = true;

document.addEventListener("scroll", () => {

    if (animateHero === false) {
        return;
    }

    const scrollY = window.scrollY;
    const profilePicture = document.querySelector(".profile-picture");
    const h1 = document.querySelector("header h1");
    const p = document.querySelector("header p");

    if (profilePicture) {
        // Fade effect for profilePicture based on scrollY
        profilePicture.style.opacity = 1 - (scrollY / 50); // Fades out as the user scrolls
        // Ensure the opacity stays within range [0, 1]
        if (profilePicture.style.opacity < 0) profilePicture.style.opacity = 0;
        if (profilePicture.style.opacity > 1) profilePicture.style.opacity = 1;
    }
    
    if (h1 && p) {
        // Fade effect for h1 and p based on scrollY
        const fadeAmount = 1 - (scrollY / 50); // Fades out as the user scrolls
        h1.style.opacity = fadeAmount;
        p.style.opacity = fadeAmount;
        // Ensure the opacity stays within range [0, 1]
        if (h1.style.opacity < 0) h1.style.opacity = 0;
        if (p.style.opacity < 0) p.style.opacity = 0;
        if (h1.style.opacity > 1) h1.style.opacity = 1;
        if (p.style.opacity > 1) p.style.opacity = 1;
    }
});

// Create a new Intersection Observer
const observer = new IntersectionObserver(function(entries, _) {
  entries.forEach(entry => {
    // If element is in viewport, add the 'show' class to trigger the animation
    if (entry.isIntersecting) {
        animateHero = true;
    }
    else {
        animateHero = false
    }
  });
});

// Start observing the element
observer.observe(element);




