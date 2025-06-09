# Promotexter Exam

This project is a Node.js RESTful API built with TypeScript and Express, following the MVC pattern. It demonstrates CRUD operations and a phone button letter combinations endpoint.

## Features
- **CRUD API** for items (`POST`, `GET`, `PUT`, `DELETE`)
- **Phone letter combinations** endpoint (GET `/phone-combinations?digits=23`)
- **MVC structure** (Controllers, Routes, App)
- **Unit tests** with Jest and Supertest

## Approach and Logic Explanation

### Why/How This Logic Was Used

- **Express & TypeScript**: Chosen for their popularity, type safety, and ease of RESTful API development.
- **MVC Pattern**: Separates concerns for maintainability and scalability. Controllers handle business logic, routes define endpoints, and the app file wires everything together.
- **In-Memory Store**: Used for simplicity and demonstration. In real-world apps, this would be replaced by a database.
- **CRUD Endpoints**: Each HTTP method (POST, GET, PUT, DELETE) is mapped to a controller function, following RESTful conventions.
- **Phone Combinations Logic**: Uses a mapping of digits to letters and iteratively builds all possible combinations, which is efficient and easy to test.
- **Testing (AAA Pattern)**: Unit tests are written using Arrange-Act-Assert for clarity and reliability, ensuring each endpoint and logic branch is covered.
- **Postman Collection**: Provided for easy manual testing and demonstration of all endpoints.

This approach ensures the code is modular, testable, and easy to extend or refactor.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
```sh
npm install
```

### Running the Server
```sh
npm start
```
The server will run on [http://localhost:3000](http://localhost:3000).

### Running Tests
```sh
npm test
```

## API Endpoints

### Item CRUD
- `POST /items` – Create an item
  - Body: `{ "name": "Sample Item" }`
- `GET /items` – Get all items
- `GET /items/:id` – Get a single item by ID
- `PUT /items/:id` – Update an item
  - Body: `{ "name": "Updated Name" }`
- `DELETE /items/:id` – Delete an item

### Phone Letter Combinations
- `GET /phone-combinations?digits=23` – Returns all possible letter combinations for the given digits (2-9)

## Postman Collection
A ready-to-use Postman collection is included:
- `PromotexterExam.postman_collection.json`

Import this file into Postman to test all endpoints easily.

## Project Structure
```
src/
  app.ts                # Main app entry
  controllers/          # Controller logic
    itemController.ts
    phoneController.ts
  routes/               # Route definitions
    itemRoutes.ts
    phoneRoutes.ts
test/
  app.test.ts           # Unit tests
```

---

## User Login and Access Management Flow Test

**Step 1: The user initiates a login**

- The user opens the login page and enters their username and password.
- Upon submitting the form, the system generates a token representing the login session attempt.

**Step 2: Credential Validation**

- The system compares the input credentials against its database.
- **If credentials are correct:**
  - The system marks the token as valid.
  - It resets any previous count of failed login attempts.
  - The user is redirected to the homepage and can access their account.
- **If credentials are incorrect:**
  - The system marks the token as invalid.
  - It increments the user's invalid login attempt count by one.

**Step 3: Continued Failed Attempts**

- After each failed login, the system checks the number of failed attempts for the user.
- **If the user has failed less than 5 times:**
  - The user is informed that the login was invalid and is allowed to retry.
- **If the user has failed 5 or more times:**
  - The system blocks the account from further attempts.

**Step 4: Temporary Lockout Period**

- When an account is blocked, the timestamp of the last unsuccessful attempt is recorded.
- A 15-minute timer starts from that moment.
- **If the user tries to log in again within these 15 minutes:**
  - A message is displayed: "Your account is temporarily locked. Please try again later."
- **After 15 minutes:**
  - The system automatically unblocks the user's account.

---

**Author:**
- Jan Nickson Y. Altura

**Date:**
- June 2025