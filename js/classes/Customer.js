export default class Customer {
    constructor() {
      this.name = '';
      this.address = '';
      this.phone = '';
      this.email = '';
      this.type = '';
    }

    writeToCustomer(apiStage, input){
        if (apiStage === 1) {
            this.name = input;
        }
        if (apiStage === 2) {
            this.address = input;
        }
        if (apiStage === 3) {
            this.phone = input;
        }
        if (apiStage === 4) {
            this.email = input;
        }
        if (apiStage == 5) {
            this.type = input

        } else {
            console.log('customer.js<writeToCustomer>: unknown api stage')
        }
    }
  
    // Method to reset all properties to empty strings
    resetProperties() {
      this.name = '';
      this.address = '';
      this.phone = '';
      this.email = '';
      this.type = '';
    }

    toWritableObject() {
    return {
        name: this.name,
        address: this.address,
        phone: this.phone,
        email: this.email,
        customer_type: this.type
    }   
    }
  }