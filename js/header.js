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
`Welcome to my developer portfolio:

iOS Specialist: 
-- Swift, SwiftUI, UIKit, SwiftCharts, CoreData \n 
Android Basics: 
-- Kotlin, Java, ConstraintLayout, Gradle \n
Web Development: 
-- HTML, CSS, JavaScript, React.js, jQuery \n
Databases: 
-- SQLite, MySQL, PHP \n
API Builder: 
-- Node.js  \n

Explore my projects and skills below!`;
  
  // Type out the greeting first, then skills
  window.onload = function() {
    typeWriter('greeting', greetingText, 50); // Speed is 100ms per letter
    setTimeout(function() {
      typeWriter('skills', skillsText, 15); // Type skills after greeting is done
    }, greetingText.length * 60); // Wait for greeting to finish before typing skills
  };
  