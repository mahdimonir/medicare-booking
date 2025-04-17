# MEDICARE-BOOKING_SERVER

This is the backend server for the MEDICARE-BOOKING application. It is built with Node.js, Express, and MongoDB to provide RESTful APIs for user authentication, doctor management, appointment bookings, and reviews.

## Features

- User registration, login, and authentication with JWT
- Role-based access control (users, doctors, admins)
- Doctor profile management
- Appointment booking and management
- Review and rating system for doctors
- Error handling and input validation
- CORS enabled for frontend integration
- File uploads support (e.g., doctor profile images)

## Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB (local or cloud instance)
- npm (comes with Node.js)

## Installation

1. Clone the repository and navigate to the `backend` directory:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory based on `.env.sample` file.

## Running the Server

- To start the server in development mode with hot reload (using nodemon):

  ```bash
  npm run dev
  ```

- To start the server normally:
  ```bash
  npm start
  ```

The server will be accessible at `http://localhost:<PORT>`.

## API Endpoints Overview

| Route              | Description                         | Methods           |
| ------------------ | ----------------------------------- | ----------------- |
| `/api/v1/auth`     | User authentication (login, signup) | POST, GET         |
| `/api/v1/users`    | User profile and management         | GET, PUT, DELETE  |
| `/api/v1/doctors`  | Doctor profiles and listings        | GET, POST, PUT    |
| `/api/v1/bookings` | Appointment booking and management  | GET, POST, DELETE |
| `/api/v1/reviews`  | Reviews and ratings for doctors     | GET, POST         |

Refer to the API documentation or source code for detailed request and response formats.

## Project Structure

- `src/app.js` - Express app setup, middleware, and routes
- `src/index.js` - Server entry point and database connection
- `src/controllers/` - Route handlers and business logic
- `src/models/` - Mongoose schemas and models
- `src/routes/` - API route definitions
- `src/middlewares/` - Custom middleware (auth, error handling, file uploads)
- `src/utils/` - Utility functions and helpers
- `public/` - Static files served by Express

## Testing

You can use tools like Postman or Insomnia to test the API endpoints.

## Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- dotenv
- CORS
- Cloudinary (for image uploads)
- cookie-parser

## License

This project is licensed under the MIT License.
