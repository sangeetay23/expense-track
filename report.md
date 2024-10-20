## Expense Tracker Server Documentation

This repository contains the server-side code for a simple expense tracker application.

### File Structure

* **server.js**: Main server file.
* **models/Expense.js**: Model defining the schema for expense data.
* **routes/expenses.js**: API routes for handling expense data.
* **client**: Folder containing client-side code (HTML, CSS, JavaScript).

### Installation and Setup

1. **Prerequisites**:
   * Node.js and npm installed.
   * MongoDB account.
2. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/expense-tracker-server.git
   ```
3. **Install dependencies**:
   ```bash
   cd expense-tracker-server
   npm install
   ```
4. **Create a .env file**:
   * Create a file named `.env` at the root of the project.
   * Add the following environment variable:
     ```
     MONGO_URI=mongodb+srv://YOUR_MONGO_USERNAME:YOUR_MONGO_PASSWORD@YOUR_MONGO_CLUSTER_NAME.YOUR_MONGO_CLUSTER_ID.mongodb.net/?retryWrites=true&w=majority&appName=YOUR_MONGO_APP_NAME
     ```
     * Replace placeholders with your actual MongoDB connection string.
5. **Start the server**:
   ```bash
   npm start
   ```

### Server Configuration

* **Database Connection**:
    * Uses `mongoose` to connect to MongoDB.
    * Connects to the specified MongoDB URI defined in the `.env` file.
* **CORS**:
    * Enables Cross-Origin Resource Sharing using `cors` middleware.
    * Allows requests from any origin (adjust this based on your security requirements).
* **Middleware**:
    * Uses `express.json()` middleware to parse JSON request bodies.
    * Uses `express.static()` middleware to serve static files from the `client` directory.
* **API Routes**:
    * Routes for handling expense data are defined in `routes/expenses.js`.
* **Server Start**:
    * Listens on port 3000 by default.

### Usage

The server provides the following API endpoints:

* **`/api/expenses`**:
    * `GET`: Retrieve all expenses.
    * `POST`: Create a new expense.
    * `PUT`: Update an existing expense.
    * `DELETE`: Delete an expense.

**Example Request (GET /api/expenses):**

```
curl -X GET 'http://localhost:3000/api/expenses'
```

### Client-Side Code

The client-side code is located in the `client` folder. It provides a simple user interface for interacting with the expense tracker application.

### Notes

* The `server.js` file is the main entry point for the server.
* The `Expense` model defines the data structure for expenses.
* The `expenses` router handles all API requests related to expenses.
* The client-side code interacts with the server through the defined API endpoints.

### Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.