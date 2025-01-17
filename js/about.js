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
        // Start collapsing
        moreAboutSection.classList.remove("expanded");
        moreAboutSection.classList.add("collapsing");
        button.textContent = "More About Me";

        // Wait for the collapse animation to finish
        setTimeout(() => {
            moreAboutSection.classList.remove("collapsing");
        }, 500); // Match animation duration
    } else {
        // Start expanding
        moreAboutSection.classList.add("expanded");
        button.textContent = "Less About Me";
    }
});

