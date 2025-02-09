export function isInputNumber(input) {
    if (isNaN(input)) {
      console.log("Input is not a number");
      return false;
    } else {
      console.log("Input is a valid number");
      return true;
    }
}

export function convertStringToInt(input) {
    if (isNaN(input)) {
      console.error("Invalid input: not a number");
      return null;
    }
  
    const num = parseInt(input, 10);
    if (isNaN(num)) {
      console.error("Conversion of " + input + "failed: input could not be converted to an integer");
      return null;
    }
    return num;
  }

  export function escapeMySQLString(str) {
    let modified = false;

    // Check and replace bad characters
    const sanitizedStr = str
        .replace(/\\/g, (match) => { modified = true; return "\\\\"; }) // Escape backslashes
        .replace(/'/g, (match) => { modified = true; return "\\'"; })    // Escape single quotes
        .replace(/"/g, (match) => { modified = true; return '\\"'; })     // Escape double quotes
        .replace(/\x00/g, (match) => { modified = true; return "\\0"; })  // Escape null bytes
        .replace(/\n/g, (match) => { modified = true; return "\\n"; })    // Escape new lines
        .replace(/\r/g, (match) => { modified = true; return "\\r"; })    // Escape carriage returns
        .replace(/\x1a/g, (match) => { modified = true; return "\\Z"; }); // Escape EOF character

    // Return both sanitized string and boolean flag
    return { sanitizedStr, modified };
}

  
  