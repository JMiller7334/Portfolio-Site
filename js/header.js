const scrollIndicator = document.querySelector('.scroll-indicator');
const terminalInputElements = document.querySelectorAll('.terminal-textbox, .terminal-send-button, .api-braces');

function toggleTerminalInput() {
  terminalInputElements.forEach(element => {
      if (element.style.display === 'none' || element.style.display === '') {
          element.style.display = 'block';
      } else {
          //element.style.display = 'none';
      }
  });
}

let apiStage = 0

const enumCxWriteStage = {
  getName: 1,
  getAddress: 2,
  getPhone: 3,
  getEmail: 4,
  getType: 5
}

let apiGreetingHeader = 'Call api:'
let apiGreetingBody = 
`api commands:

-- CUSTOMER TABLE: --
- write customer
- read customer
- read customer id[enter id ie 1]


-- USAGE TABLE: --
- write usage
- read usage
- read usage id[enter id ie 1]


please enter a command:
`;

//-- API CALL BUTTON CLICK --
document.querySelector('.api-call-button').addEventListener('click', () => {
  if (isTyping === true) {
    return;
  }

  toggleTerminalInput();
  window.scrollTo({top: 0, behavior: 'smooth'});

  isTyping = true;
  typeWriter('greeting', apiGreetingHeader, 50);

  setTimeout(function() {
      safeTypeWriter('skills', apiGreetingBody, 15);
  }, apiGreetingHeader.length * 60);

  setTimeout(function() {
  }, apiGreetingBody.length * 10);
});




// -- TYPING EFFECT FUNCTIONS --
let isTyping = false;

function safeTypeWriter(elementId, text, speed) {
  if (isTyping) return;
  isTyping = true;

  typeWriter(elementId, text, speed);
  setTimeout(() => {
    isTyping = false;
  }, text.length * speed + 3000);
}

function typeWriter(elementId, text, speed) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  element.innerHTML = '';
  let index = 0;

  function type() {
    if (index < text.length) {
      const currentChar = text.charAt(index);
      if (currentChar === '\n') {
        element.innerHTML += '<br>';
      } else {
        element.innerHTML += currentChar;
      }

      index++;
      setTimeout(type, speed);

    } else {
      isTyping = false;
    }
  }
  type();
}




// ---------- LOAD UP ----------
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
  isTyping = true;
  typeWriter('greeting', greetingText, 50); //speed is 100ms per letter

    setTimeout(function() {
        safeTypeWriter('skills', skillsText, 15);
    }, greetingText.length * 60);

    setTimeout(function() {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.animation = 'bounce 1.5s ease-in-out infinite';
    }, skillsText.length * 10);
};
  