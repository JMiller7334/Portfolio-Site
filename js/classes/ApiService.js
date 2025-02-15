export default class MySqlApi {
  constructor() {

    //test url: http://localhost:3000/php/mysql-api-proxy.php
    //production url: /php/mysql-api-proxy.php
    this.baseUrl = "http://localhost:3000/php/mysql-api-proxy/";
  }

  // General API Call Handler
  async writeTables(dataClass, requestMethod, apiTable) {
    let apiUrl = `${this.baseUrl}${apiTable}.php`;

    // For PUT and DELETE, include the ID in the query string
    if (["PUT", "DELETE"].includes(requestMethod) && dataClass && dataClass.id) {
      //TODO: - not yet implemented
      
    } else if (["PUT", "DELETE"].includes(requestMethod) && !dataClass) {
      throw new Error("Missing dataClass for PUT/DELETE request");
    }

    try {
      const response = await this.performWriteRequest(dataClass, apiUrl, requestMethod);
      return response;
    } catch (error) {
      console.error("Error writing to table:", error.message);
      throw error;
    }
  }

  // Perform the Write Request (POST/PUT/DELETE)
  async performWriteRequest(dataClass, apiUrl, requestMethod) {

    const headers = { "Content-Type": "application/json" };
    const options = {
      method: requestMethod,
      headers: headers,
    };

    if (["POST", "PUT"].includes(requestMethod) && dataClass) {
      options.body = JSON.stringify(dataClass);
    }

    const response = await fetch(apiUrl, options);
    const status = response.status;

    if (![200, 201, 204].includes(status)) {
      throw new Error(`status code: ${status}`);
    }

    if (status === 204) {
      return "Write operation successful, no content returned";
    }

    const data = await response.json();
    return data;
  }

  // Read Handler for GET requests
  async performReadRequest(apiUrl, requestMethod) {
    const response = await fetch(apiUrl, { method: requestMethod });

    if (![200, 201].includes(response.status)) {
      throw new Error(`status code: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  // Fetch a single customer by ID
  async fetchCustomerById(searchId) {
    const apiUrl = `${this.baseUrl}customers.php`;
    return await this.performReadRequest(apiUrl, "GET");
  }

  // Fetch all customers
  async fetchCustomers() {
    const apiUrl = `${this.baseUrl}customers.php`;
    return await this.performReadRequest(apiUrl, "GET");
  }

  // Fetch usage records by customer ID
  async fetchUsageRecords(searchId = "") {
    const apiUrl = `${this.baseUrl}usage.php`;
    //TODO: - not yet implemented
    
    return await this.performReadRequest(apiUrl, "GET");
  }
}
