document.addEventListener("scroll", () => {

    //scroll animation for hero p, h1, and profile pic [slide animation]
    const scrollY = window.scrollY;
    const profilePicture = document.querySelector(".profile-picture");
    const h1 = document.querySelector("header h1");
    const p = document.querySelector("header p");

    //case: user scrolling - play slide animations
    if (scrollY > 10) {
        profilePicture.style.transform = "translateX(-100vh)";
        h1.style.transform = "translateX(100vh)";
        p.style.transform = "translateX(100vh)";

    //case: user at page top - animate text profile pic back in.
    } else {
        profilePicture.style.transform = "translateX(0)";
        h1.style.transform = "translateX(0)";
        p.style.transform = "translateX(0)";
    }
});
