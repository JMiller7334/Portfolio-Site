export default class TerminalMessages {
  constructor() {
    // API CALL MESSAGES:
    this.apiCallHeader = "API Access Terminal:";
    this.apiGreetingBody = `
Welcome! Below are the available commands:

-- Customer Table Commands --
- write customer
- read customer

Please enter a command to proceed:
`;

    // COMMAND MESSAGES
    this.attemptCallBody = `
Attempting API call...

Endpoint: http://jacobjmiller.com:8080/
Status: In progress...`;

    this.customerReadBody = 'Enter an ID to read a specific customer or leave blank to fetch all customers.\n\n';

    // GREETING MESSAGES (SKILLS):
    this.skillTextHeader = "Welcome to My Portfolio!";
    this.skillTextBody = `
Hello! I'm a developer with experience in various technologies. Here’s a glimpse of my skills:

iOS Development:
-- Swift, SwiftUI, UIKit, SwiftCharts, CoreData

Android Development (Basics):
-- Kotlin, Java, ConstraintLayout, Gradle

Web Development:
-- HTML, CSS, JavaScript, PHP, React.js, jQuery

Databases:
-- SQL, SQLite, MySQL

API Development:
-- Node.js, Express.js

Feel free to explore my projects and skills below!`;
  }

  // API CUSTOMER MESSAGES:

  // ------ CUSTOMER WRITE MESSAGES ------
  getMessageForCustomerWrite(stage, customerObject) {
    let baseString = "New Customer Object:\n" + JSON.stringify(customerObject, null, 2);

    switch (stage) {
      case 1:
        return `${baseString}\n\nPlease enter the customer name:`;
      case 2:
        return `${baseString}\n\nPlease enter the customer address:`;
      case 3:
        return `${baseString}\n\nPlease enter the customer phone number:`;
      case 4:
        return `${baseString}\n\nPlease enter the customer email:`;
      case 5:
        return `${baseString}\n\nPlease enter the customer type:`;
      default:
        return `${baseString}\n\nError: Unexpected API stage.`;
    }
  }

  successCustomerWrite(data) {
    return `
Method: POST
Endpoint: http://jacobjmiller.com:8080/customers
New Customer Data: ${this.formatDataForDisplay(data)}
Status: 200 OK - Customer successfully created!

Tip: Type 'help' to return to the main menu.`;
  }

  errorCustomerWrite(error) {
    return `
Method: POST
Endpoint: http://jacobjmiller.com:8080/customers
Status: Error

Error Message: ${error.message || error}

Tip: Type 'help' to return to the main menu.`;
  }

  // READ API MESSAGES
  successCustomerRead(data, idParameter) {
    return `
Method: GET
Endpoint: http://jacobjmiller.com:8080/customers
ID Parameter: ${idParameter}
Status: 200 OK - Customer data retrieved successfully.

Response Data: ${this.formatDataForDisplay(data)}

Tip: Type 'help' to return to the main menu.`;
  }

  errorCustomerRead(error, idParameter) {
    return `
Method: GET
Endpoint: http://jacobjmiller.com:8080/customers
ID Parameter: ${idParameter}
Status: Error

Error Message: ${error.message || error}

Tip: Type 'help' to return to the main menu.`;
  }

  // Helper function to format data
  formatDataForDisplay(data) {
    if (typeof data === 'object') {
      try {
        // Format the object with indentation for better readability
        return JSON.stringify(data, null, 2);
      } catch (err) {
        return 'Error formatting data. The object might be too complex.';
      }
    }
    return data; // Return the data as-is if it is not an object
  }
}
