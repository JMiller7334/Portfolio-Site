var contentHidden = false;
var scrollDebounce = false

document.addEventListener("scroll", () => {
    if (scrollDebounce === true) {
        return;
    }

    const scrollY = window.scrollY;
    const profilePicture = document.querySelector(".profile-picture");
    const h1 = document.querySelector("header h1");
    const p = document.querySelector("header p");

    // Case: user scrolling - play slide animations
    if (scrollY > 20 && contentHidden === false) {
        profilePicture.style.transform = "translateX(-100vh)";
        h1.style.transform = "translateX(100vh)";
        p.style.transform = "translateX(100vh)";
        contentHidden = true;
        scrollDebounce = true;

        //debounce timer
        waitForTimeout(1000)
        .then(() => {
            scrollDebounce = false;
        });
    } 
    // Case: user at page top - animate text profile picture back in
    else if (contentHidden === true) {
        profilePicture.style.transform = "translateX(0)";
        h1.style.transform = "translateX(0)";
        p.style.transform = "translateX(0)";
        contentHidden = false;
        scrollDebounce = true;

        //debounce timer
        waitForTimeout(1000)
        .then(() => {
            scrollDebounce = false;
        });
    }

});

// Handle debouncing variable
function waitForTimeout(timeoutMs) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(); 
        }, timeoutMs);
    });
}

