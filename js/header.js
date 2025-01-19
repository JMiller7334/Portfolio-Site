const scrollIndicator = document.querySelector('.scroll-indicator');

// Typing effect function
function typeWriter(elementId, text, speed) {
    let index = 0;
    const element = document.getElementById(elementId);
  
    // Clear existing text
    element.innerHTML = '';
  
    function type() {
      if (index < text.length) {
        const currentChar = text.charAt(index);
        // Check for newline and replace with <br>
        if (currentChar === '\n') {
          element.innerHTML += '<br>';
        } else {
          element.innerHTML += currentChar;
        }
        index++;
        setTimeout(type, speed);
      }
    }
  
    type();
  }

  
  // Define the text for each element
  const greetingText = "Nice to meet you,";
  const skillsText =   
`Welcome to my portfolio! Here's a brief look into my developer skills:

iOS Specialist: 
-- Swift, SwiftUI, UIKit, SwiftCharts, CoreData \n 
Android Basics: 
-- Kotlin, Java, ConstraintLayout, Gradle \n
Web Developer: 
-- HTML, CSS, JavaScript, PHP, React.js, jQuery \n
Databases: 
-- SQL, SQLite, MySQL\n
API: 
-- Node.js, Express.js

Explore my projects and skills below!`;
  
//type out the greeting first, then skills
window.onload = function() {
    typeWriter('greeting', greetingText, 50); //speed is 100ms per letter

    setTimeout(function() {
        typeWriter('skills', skillsText, 15);
    }, greetingText.length * 60);

    setTimeout(function() {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.animation = 'bounce 1.5s ease-in-out infinite';
    }, skillsText.length * 10);
};
  