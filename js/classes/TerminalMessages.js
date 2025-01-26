export default class TerminalMessages {
  constructor() {
    // API CALL MESSAGES:
    this.apiCallHeader = "API Access Terminal:";
    this.apiGreetingBody = `
    Welcome to the API Access Terminal!
    
    Available Commands:
    - write customer
    - read customer
    
    Note: This terminal supports only write and read operations for the Customer Table.

    Tip: Type 'help' at any time to return to this menu.
    

    Please enter a command to proceed:
    `;
    

    // COMMAND MESSAGES
    this.unknownCommandBody = `
Unkown command entered. Please enter another command.

Tip: Type 'help' to return to the main menu.`

    this.attemptCallBody = `
Attempting API call...

Endpoint: http://jacobjmiller.com:8080/
Status: In progress...`;

    this.customerReadBody = 'Please enter a customer ID (e.g., 1) to retrieve a specific record, or leave the field blank to fetch all customers.\n\n';

    // GREETING MESSAGES (SKILLS):
    this.skillTextHeader = "Nice to meet you,";
   this.skillTextBody = `
Welcome to my portfolio! Here's an overview of my skills as a developer:

Mobile App Development:
-- Swift (iOS)
-- Kotlin, Java (Android)

Web Development:
-- HTML, CSS, JavaScript
-- PHP, Python

Other Languages:
-- SQL
-- Lua

Feel free to explore my projects and see how I put these skills to work below!
`;
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
    let parsedParameter = idParameter
    if (idParameter == '') {
      parsedParameter = 'ALL'
    } 

    return `
Method: GET
Endpoint: http://jacobjmiller.com:8080/customers
ID Parameter: ${parsedParameter}
Status: 200 OK - Customer data retrieved successfully.

Response Data: ${this.formatDataForDisplay(data)}

Tip: Type 'help' to return to the main menu.`;
  }

  errorCustomerRead(error, idParameter) {
    let parsedParameter = idParameter
    if (idParameter == '') {
      parsedParameter = 'ALL'
    } 
    return `
Method: GET
Endpoint: http://jacobjmiller.com:8080/customers
ID Parameter: ${parsedParameter}
Status: Error

Error Message: ${error.message || error}

Tip: Type 'help' to return to the main menu.\n\n`;
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
