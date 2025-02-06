document.addEventListener("DOMContentLoaded", () => {

    function createPlus(gutter) {
        const plus = document.createElement("div");

        //effect controls:
        const animLength = (10 - 5) + 5;
        const animPos = Math.random() * 100;
        const animDelay = Math.random * 3;
        const animSize = Math.random(10 - 7) + 7;

        plus.classList.add("plus");
        plus.textContent = "+";
        
        //randomize position, animation duration, and delay
        plus.style.left = animPos + "%";
        plus.style.animationDuration = animLength + "s";
        plus.style.animationDelay = animDelay + "s";
        plus.style.fontSize = animSize + "vw";

        gutter.appendChild(plus);

        //remove after animation completes
        setTimeout(() => plus.remove(), animLength * 1000);
    }

    const leftGutter = document.querySelector(".gutter.left");
    const rightGutter = document.querySelector(".gutter.right");

    //recursion
    setInterval(() => createPlus(leftGutter), 4000);
    setInterval(() => createPlus(rightGutter), 4200);
});
