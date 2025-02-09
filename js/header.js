const scrollIndicator = document.querySelector('.scroll-indicator');
const terminalTextbox = document.querySelector('.terminal-textbox');
const callApiButton = document.querySelector('.api-call-button');
const terminalProfile = document.getElementById('terminal-profile');
const terminalH1 = document.getElementById('terminal-h1');
const terminalP = document.getElementById('terminal-p');

const terminalInputElements = document.querySelectorAll('.terminal-textbox, .terminal-send-button, .api-braces');

function toggleTerminalInput() {
  terminalInputElements.forEach(element => {
      if (element.style.display === 'none' || element.style.display === '') {
          element.style.display = 'block';
          scrollIndicator.style.display = 'none';
      /*} else {
          element.style.display = 'none'*/
      }
  });
}


// ----- API TERMINAL CALLS -----
let enumApiCallType = {
  customerWrite: 0,
  customerRead: 1,

  undefined: 3
};

let apiStage = 0;
let apiCallType = enumApiCallType.undefined;



// TERMINAL API --
import ApiService from './classes/ApiService.js';
let apiService = new ApiService();


import Customer from './classes/Customer.js';
let customerObj = new Customer();
let idParameter = '';

//terminal messages:
import TerminalMessages from './classes/TerminalMessages.js';
const terminalMessages = new TerminalMessages();
const apiGreetingHeader = terminalMessages.apiCallHeader;
const apiGreetingBody =  terminalMessages.apiGreetingBody;


//-- API PROJECT CALL BUTTON CLICK --
document.querySelector('.api-call-button').addEventListener('click', () => {
  if (isTyping === true) {
    return;
  }
  toggleTerminalInput();
  window.scrollTo({top: 0, behavior: 'smooth'});
  terminalProfile.src = '../img/code-logo.svg';
  terminalProfile.classList.add('fit');
  terminalH1.textContent = 'API Terminal';
  terminalP.textContent = 'MySQL API';
  writeApiTerminalGreeting();
});



// ----------------- API CALL FUNCTIONS ------------------
function apiCustomerReadAll() {
  (async () => {
    try {
      const customers = await apiService.fetchCustomers();
      const terminalMsg = terminalMessages.successCustomerRead(customers, idParameter);
      typeWriter('terminal-body', terminalMsg, bodyTypingSpeed);
      console.log('header.js <api-call> fetched customers:', customers);

    } catch (error) {
      const terminalMsg = terminalMessages.errorCustomerRead(error, idParameter);
      typeWriter('terminal-body', terminalMsg, bodyTypingSpeed);
      console.error('header.js <api-call>  error fetching customers:', error.message);

    } finally {
      apiStage = 0;
      apiCallType = enumApiCallType.undefined;
      apiDebounce = false;
      return;
    }
  })();
}


import { convertStringToInt } from './modules/validationUtils.js';

function apiCustomerRead() {
  const validId = convertStringToInt(idParameter)
  if (validId === null) {
    apiCustomerReadAll();
    return;
  }

  (async () => {
    try {
      const customer = await apiService.fetchCustomerById(validId);
      const terminalMsg = terminalMessages.successCustomerRead(customer, validId);
      typeWriter('terminal-body', terminalMsg, bodyTypingSpeed);
      console.log('header.js <api-call> fetched customers:', customer);

    } catch (error) {
      const terminalMsg = terminalMessages.errorCustomerRead(error, validId);
      typeWriter('terminal-body', terminalMsg, bodyTypingSpeed);
      console.error('header.js <api-call>  error fetching customers:', error.message);

    } finally {
      idParameter = '';
      apiStage = 0;
      apiCallType = enumApiCallType.undefined;
      apiDebounce = false;
      return;
    }
  })();
}


function apiCustomerWrite() {
  console.log('header.js <api-call>: calling; customer write', apiCallType, apiStage);
  (async () => {
    let writable = customerObj.toWritableObject();

    //CASE: success
    try {
      const response = await apiService.writeTables(writable, 'POST', 'customers');
      const terminalMsg = terminalMessages.successCustomerWrite(response);
      typeWriter('terminal-body', terminalMsg, bodyTypingSpeed);
      console.log('success response received:', response);

      //CASE: error
    } catch (error) {
      let terminalMsg = terminalMessages.errorCustomerWrite(error);
      typeWriter('terminal-body', terminalMsg, bodyTypingSpeed);
      console.log('header.js<api-call>: error occured while writting', error);

    } finally {
      apiStage = 0;
      apiCallType = enumApiCallType.undefined;
      apiDebounce = false;
      return;
    }
  })();
}


// ------------ TERMINAL MESSAGE HELPER FUNCTIONS ------------
function writeApiTerminalGreeting(){
  isTyping = true;
  typeWriter('terminal-header', apiGreetingHeader, headerTypingSpeed);

  setTimeout(function() {
      typeWriter('terminal-body', apiGreetingBody, bodyTypingSpeed);
  }, apiGreetingHeader.length * 40);

  setTimeout(function() {
  }, apiGreetingBody.length * 20);
}

function resetApiTerminal(){
  apiStage = 0;
  apiCallType = enumApiCallType.undefined;
  writeApiTerminalGreeting();
}

function terminalCustomerWriteMsg() {
  let terminalMsg = terminalMessages.getMessageForCustomerWrite(apiStage, customerObj)
  typeWriter('terminal-body', terminalMsg, bodyTypingSpeed);
}

function terminalCustomerReadMsg() {
  let terminalMsg = terminalMessages.customerReadBody
  typeWriter('terminal-body', terminalMsg, bodyTypingSpeed);
}


// -------------------- TERMINAL SEND BUTTON -------------------- //
import { isInputNumber } from './modules/validationUtils.js';
import { escapeMySQLString } from './modules/validationUtils.js';
const terminalSendButton = document.querySelector('.terminal-send-button');
const terminalAttemptMsg = terminalMessages.attemptCallBody;
let apiDebounce = false;
let sendButtonDebounce = false;

const SEND_BUTTON_TIMEOUT = 2500; //3500

document.querySelector('.terminal-send-button').addEventListener('click', () => {
  if (isTyping === true || apiDebounce === true || sendButtonDebounce === true) {
    return;
  }
  isTyping = true;


  //api customer write call
  if (apiCallType === enumApiCallType.customerWrite && apiStage >= 5) {
    apiDebounce = true;
    typeWriter('terminal-body', terminalAttemptMsg, bodyTypingSpeed);
  
    setTimeout(function() {
      apiCustomerWrite();

      terminalTextbox.value = '';
    }, terminalAttemptMsg.length * 60);

    return;

  //api customer read call
  } else if (apiCallType === enumApiCallType.customerRead && apiStage >= 1) {
    apiDebounce = true;

    typeWriter('terminal-body', terminalAttemptMsg, bodyTypingSpeed);
  
    setTimeout(function() {
      if (isInputNumber(terminalTextbox.value) === true ) {
        idParameter = terminalTextbox.value;
        apiCustomerRead();

      } else {
        idParameter = '';
        apiCustomerReadAll();
      }
      terminalTextbox.value = '';
    }, terminalAttemptMsg.length * 60);

    return;
  }

  //command handling:
  sendButtonDebounce = true;
  terminalSendButton.style.opacity = '0.2';

  const lowercaseInput = terminalTextbox.value = terminalTextbox.value.toLowerCase(); 
  if (lowercaseInput === 'write customer') {
    customerObj.resetProperties();
    apiStage = 1;
    apiCallType = enumApiCallType.customerWrite;
    terminalCustomerWriteMsg();
  }

  else if (lowercaseInput === 'read customer') {
    idParameter = '';
    apiStage = 1;
    apiCallType = enumApiCallType.customerRead;
    terminalCustomerReadMsg();
  }


  // Write handling:
  else if (apiCallType === enumApiCallType.customerWrite && apiStage > 0) {
    let safeResult = escapeMySQLString(terminalTextbox.value);
    let safeString = safeResult.sanitizedStr
    if (safeResult.modified) {
      alert('Your input was modified to be database safe.');
    }
    customerObj.writeToCustomer(apiStage, safeString);
    apiStage++;
    terminalCustomerWriteMsg();
  }

  // help handling
  else if (lowercaseInput === 'help') {
    apiCallType = enumApiCallType.undefined;
    apiStage = 0;
    customerObj.resetProperties();
    idParameter = '';
    resetApiTerminal();
  }

  // Do nothing:
  else {
    let terminalMsgInvalid = terminalMessages.unknownCommandBody;
    typeWriter('terminal-body', terminalMsgInvalid, bodyTypingSpeed);
  }
  terminalTextbox.value = ''; // Clear input
  setTimeout(function() {
    sendButtonDebounce = false;
      terminalSendButton.style.opacity = '1';
}, SEND_BUTTON_TIMEOUT);


});



// ----------------------  TYPING EFFECT FUNCTIONS ----------------------
const headerTypingSpeed = 20;
const bodyTypingSpeed = 14;

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
        /**api calls should make 2 header and body updates:
         * apiDebounce check prevents premature disableing of
         * typing debounce.
         */
        if (elementId === 'terminal-body' && apiDebounce === false){
          isTyping = false;
        }
    }
  }
  type();
}



// --------------------  LOAD UP -------------------- 
const skillTextHeader = terminalMessages.skillTextHeader;
const skillsTextBody =   terminalMessages.skillTextBody

//type out the greeting first, then skills
window.onload = function() {
  isTyping = true;
  typeWriter('terminal-header', skillTextHeader, headerTypingSpeed); //speed is 100ms per letter

    setTimeout(function() {
        typeWriter('terminal-body', skillsTextBody, bodyTypingSpeed);
    }, skillTextHeader.length * 35);

    setTimeout(function() {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.animation = 'bounce 1.5s ease-in-out infinite';
        callApiButton.style.opacity = '1';
    }, skillsTextBody.length * 17);
};
  