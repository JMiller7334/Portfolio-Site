
const element = document.querySelector('.container-hero');

var animateHero = true;

document.addEventListener("scroll", () => {

    if (animateHero === false) {
        return;
    }

    const scrollY = window.scrollY;
    const fadeValue = 80
    
    const profilePicture = document.querySelector(".profile-picture");
    const h1 = document.querySelector("header h1");
    const p = document.querySelector("header p");
    
    const terminals = document.querySelectorAll('.terminal-text');

    if (terminals) {
      terminals.forEach(terminal => {
      const newOpacity = 1 - window.scrollY / fadeValue;

        // Clamp opacity between 0 and 1
      terminal.style.opacity = Math.max(0, Math.min(newOpacity, 1));
      });
    }

    if (profilePicture) {
        // Fade effect for profilePicture based on scrollY
        profilePicture.style.opacity = 1 - (scrollY / fadeValue); // Fades out as the user scrolls
        if (profilePicture.style.opacity < 0) profilePicture.style.opacity = 0;
        if (profilePicture.style.opacity > 1) profilePicture.style.opacity = 1;
    }
    
    if (h1 && p) {
        // Fade effect for h1 and p based on scrollY
        const fadeAmount = 1 - (scrollY / fadeValue); // Fades out as the user scrolls
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




