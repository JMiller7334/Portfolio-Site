/** about.js
 * this script handles code used within the about me section of this site.
 * all javascript code related to front end operation for that section will
 * appear here.
 */


// handles expanding and closing the more about expandable section
document.getElementById("toggle-more-about").addEventListener("click", () => {
    const moreAboutSection = document.getElementById("more-about");
    const button = document.getElementById("toggle-more-about");

    if (moreAboutSection.classList.contains("expanded")) {
        // Collapse the section
        moreAboutSection.style.maxHeight = moreAboutSection.scrollHeight + "px"; // Set height before transition
        requestAnimationFrame(() => {
            moreAboutSection.style.maxHeight = "0";
            moreAboutSection.style.opacity = "0";
        });

        button.textContent = "More About Me";
        moreAboutSection.classList.remove("expanded");

    } else {
        // Expand the section
        moreAboutSection.style.maxHeight = moreAboutSection.scrollHeight + "px"; 
        moreAboutSection.style.opacity = "1";

        button.textContent = "Less About Me";
        moreAboutSection.classList.add("expanded");

        // Reset maxHeight after animation
        setTimeout(() => {
            moreAboutSection.style.maxHeight = "none";
        }, 500); // Match CSS transition duration
    }
});


