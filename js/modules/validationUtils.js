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
  
  