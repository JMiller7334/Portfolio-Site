export default class TerminalMessages {
    constructor() {
      // API CALL MESSAGES:
      this.apiCallHeader = "API Access Terminal:";
      this.apiGreetingBody = `
  api commands:
  
  -- customer table: --
  - write customer
  - read customer
  
  please enter a command:
  `;
      // COMMAND MESSAGES
      this.attemptCallBody = 
      `calling api...

      url - http://jacobjmiller.com:8080/
      status: attempting`


      this.customerReadBody = 'please enter an id or leave blank and press send to read all \n\n';
  
      // GREETING MESSAGES (SKILLS):
      this.skillTextHeader = "Nice to meet you,";
      this.skillTextBody = `
  Welcome to my portfolio! Here's a brief look into my developer skills:
  
  iOS Specialist: 
  -- Swift, SwiftUI, UIKit, SwiftCharts, CoreData
  
  Android Basics: 
  -- Kotlin, Java, ConstraintLayout, Gradle
  
  Web Developer: 
  -- HTML, CSS, JavaScript, PHP, React.js, jQuery
  
  Databases: 
  -- SQL, SQLite, MySQL
  
  API: 
  -- Node.js, Express.js
  
  Explore my projects and skills below!`;
    }
  
    // API CUSTOMER MESSAGES:

    // ------ CUSTOMER WRITE MESSAGES ------
    getMessageForCustomerWrite(stage, customerObject) {
      let baseString = "new customer = " + JSON.stringify(customerObject);
  
      if (stage === 1) {
        return `${baseString}\n\nPlease enter customer name.`;

      } else if (stage === 2) {
        return `${baseString}\n\nPlease enter customer address.`;

      } else if (stage === 3) {
        return `${baseString}\n\nPlease enter customer phone number.`;

      } else if (stage === 4) {
        return `${baseString}\n\nPlease enter customer email`;

      } else if (stage === 5) {
        return `${baseString}\n\nPlease enter customer type`;

      } else {
        return `${baseString}\n\n unknown api stage recieved..`;
      }
    }

    successCustomerWrite(data) {
        return `
        method - POST
        url - http://jacobjmiller.com:8080/customers
        newCustomer = ${data}
        result - status code: 200 OK

        type help to return
        `;
    }

    errorCustomerWrite(error) {
      return `
        method - POST
        url - http://jacobjmiller.com:8080/customers
        newCustomer = ${data}
        result - error: ${error}

        type help to return
      
      `
    }
    // READ API MESSAGES
  successCustomerRead(data, idParameter) {
    return `
    method - GET
    url - http://jacobjmiller.com:8080/customers
    idParameter = ${idParameter}
    result - status code 200: OK

    response: ${this.formatDataForDisplay(data)}

    type help to return
    `
  }

  errorCustomerRead(error, idParameter) {
    return `
    method - GET
    url - http://jacobjmiller.com:8080/customers
    idParameter = ${idParameter}
    result - error: ${error.message || error}

    response: -

    type help to return
    `
  }

  // Helper function to format data
  formatDataForDisplay(data) {
    if (typeof data === 'object') {
      try {
        return JSON.stringify(data, null, 2);
      } catch (err) {
        return 'Error formatting data';
      }
    }
    return data;
  }
}
  