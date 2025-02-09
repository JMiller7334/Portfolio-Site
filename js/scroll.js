const heroContainer = document.querySelector('.container-hero');
const profilePicture = document.querySelector('.profile-picture');
const terminalFooter = document.querySelector('.terminal-footer');
const navLogo = document.getElementById('nav-logo');
const h1 = document.querySelector('header h1');
const p = document.querySelector('header p');

const nav = document.querySelector('nav');

const terminals = document.querySelectorAll('.terminal-text');

const heroTrigger = document.querySelector('.hero-trigger');


var animateHero = true;
var isScrolledToTop = true;

var initialLoadup = true;

document.addEventListener("scroll", () => {
    /** events to occur when user scrolls happen here */
   handleElementsFade();
});

//allows nav buttons avoid snap-scroll
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function() {
        console.log('disable snap-scroll');
        document.documentElement.style.scrollSnapType = "none"; // Disable snapping
        setTimeout(() => {
            document.documentElement.style.scrollSnapType = "y proximity"; // Re-enable it after 1s
        }, 1000);
    });
});



// Create a new Intersection Observer
const observerHeroFade = new IntersectionObserver(function(entries, _) {
    entries.forEach(entry => {
        animateHero = entry.isIntersecting;
    });
});

// Start observing the element
observerHeroFade.observe(heroContainer);

const observerHeroSnapScroll = new IntersectionObserver(function (entries, _) {
    entries.forEach(entry => {
        if (entry.isIntersecting && isScrolledToTop === false) {
            handleSnapScroll();
            navLogo.classList.remove('visible');
            nav.classList.remove('standard');
        } else {
            isScrolledToTop = false;

            //prevent elements from being modified on site loadup.
            if (initialLoadup) {
                initialLoadup = false;
                return;
            }
            navLogo.classList.add('visible');
            nav.classList.add('standard');
        }
    });
});

// Start observing the element
observerHeroSnapScroll.observe(heroTrigger);




// --- FUNCTIONS --
// SNAP SCROLL ADJUSTMENT:
function handleSnapScroll() {
    heroContainer.scrollIntoView({ behavior: "smooth" });
    isScrolledToTop = true;
}


//ELEMENT FADING:
function fadeElement(element) {
    /** helper function to individually fade ui elements.
     */
    const scrollY = window.scrollY;
    const fadeValue = 80;

    if (element) {
        const newOpacity = 1 - scrollY / fadeValue;
        //clamp opacity between 0 and 1
        element.style.opacity = Math.max(0, Math.min(newOpacity, 1));
    }
}


function handleElementsFade(){
    /** primary function for handling elment fading on scroll
    */
    if (animateHero === false) {
        return;
    }
    if (terminals) {
        terminals.forEach(terminal => {
        fadeElement(terminal);
      });
    }

    fadeElement(profilePicture);
    fadeElement(p);
    fadeElement(h1);
    fadeElement(terminalFooter);
}




