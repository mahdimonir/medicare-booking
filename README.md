**MEDICARE-BOOKING**  
A full-stack application for booking medical appointments, managing profiles, and viewing doctors and services, built with a React frontend and a Node.js backend.

---

### Overview  
MEDICARE-BOOKING is a modern, role-based web application that facilitates medical appointment booking, doctor management, and user reviews. The frontend is built with React and Vite for a fast and responsive user interface, while the backend uses Node.js, Express, and MongoDB to provide secure RESTful APIs.

---

### Features  
- **Responsive Frontend**: Built with React, modern hooks, and Context API for state management  
- **User Authentication**: Secure login, signup, and role-based access control (Patient, Doctor, Admin) with JWT  
- **Doctor Listings**: View detailed doctor profiles, specialties, and availability  
- **Appointment Management**: Book, view, accept, reject, or cancel appointments  
- **Reviews and Ratings**: Patients can rate and review doctors  
- **Profile Management**: Users and doctors can manage their profiles and settings  
- **Admin Dashboard**: Manage users, doctors, appointments, and site assets  
- **Fast Development**: Vite with Hot Module Replacement (HMR) for frontend development  
- **API Integration**: Backend APIs integrated with the frontend using Axios  
- **File Uploads**: Support for doctor profile images via Cloudinary  
- **Code Quality**: ESLint configured for consistent code standards  

#### Features Based on Roles  
**Doctor**  
- Manage appointments (view, accept, reject)  
- Update profile, availability, and schedules  
- View patient feedback and ratings  
- Receive notifications  

**Patient**  
- Book and manage appointments  
- View doctor profiles and specialties  
- Manage user profile and settings  
- Provide reviews and ratings for doctors  

**Admin**  
- Manage users, doctors, appointments, and site assets  
- More features coming soon  

---

### Demo Account  
Test the application without creating an account using the following credentials:  

| Role    | Email             | Password   |  
|---------|-------------------|------------|  
| Doctor  | doctor@demo.com   | demo@pass  |  
| Patient | patient@demo.com  | demo@pass  |  

---

### Prerequisites  
- **Node.js**: v14 or higher recommended  
- **npm**: Comes with Node.js  
- **MongoDB**: Local or cloud instance  

---

### Installation  
```bash
git clone <repository-url>  
cd frontend  
npm install  
cd backend  
npm install  
```
Create a .env file in the backend directory based on the .env.sample file (e.g., add MongoDB URI, JWT secret, Cloudinary credentials, etc).

---

### Running the Application  
From the frontend directory, run:  
npm run dev  
The frontend will be available at http://localhost:3000 by default.  
From the backend directory, start the server in development mode with hot reload:  
```bash
npm run dev  
```
Or start normally:  
```bash
npm start  
```
The backend will be accessible at
```
 http://localhost:<PORT> (default port specified in .env).
```

---

### Building for Production  
From the frontend directory, run:  
npm run build  
The build output will be in the dist directory.  
Ensure the backend .env file is properly configured for production, then run:  
npm start

---

### API Endpoints Overview  
```
| Route            | Description                        | Methods         |  
|------------------|------------------------------------|-----------------|  
| /api/v1/auth     | User authentication (login, signup) | POST, GET       |  
| /api/v1/users    | User profile and management        | GET, PUT, DELETE|  
| /api/v1/doctors  | Doctor profiles and listings       | GET, POST, PUT  |  
| /api/v1/bookings | Appointment booking and management | GET, POST, DELETE|  
| /api/v1/reviews  | Reviews and ratings for doctors    | GET, POST       |  

```
Refer to the source code or API documentation for detailed request and response formats.

---

### Project Structure  
#### Frontend  
```
frontend/  
├── public/               # Static assets (images, icons)  
├── src/  
│   ├── assets/           # Media files  
│   ├── components/       # Reusable React components  
│   ├── context/          # Context API for state management  
│   ├── Dashboard/        # Role-based dashboard components  
│   ├── hooks/            # Custom React hooks  
│   ├── layout/           # Layout components (e.g., Header, Footer)  
│   ├── pages/            # Page components (e.g., Home, Profile)  
│   ├── routes/           # React Router route definitions  
│   └── utils/            # Utility functions  
├── index.html            # Main HTML file  
├── vite.config.js        # Vite configuration  
├── package.json          # Dependencies and scripts  
└── README.md             #
```
 Frontend-specific documentation  

#### Backend  
```
backend/  
├── src/  
│   ├── app.js            # Express app setup, middleware, routes  
│   ├── index.js          # Server entry point and database connection  
│   ├── controllers/      # Route handlers and business logic  
│   ├── models/           # Mongoose schemas and models  
│   ├── routes/           # API route definitions  
│   ├── middlewares/      # Custom middleware (auth, error handling, file uploads)  
│   └── utils/            # Utility functions and helpers  
├── public/               # Static files served by Express  
├── .env.sample           # Environment variables template  
├── package.json          # Dependencies and scripts  
└── README.md             #
```
 Backend-specific documentation  

---

### Technologies Used  
#### Frontend  
- React  
- Vite  
- JavaScript (ES6+)  
- React Router  
- Context API  
- Axios (for API calls)  
- ESLint  
- CSS Modules / Tailwind CSS (if applicable)  

#### Backend  
- Node.js  
- Express  
- MongoDB & Mongoose  
- JSON Web Tokens (JWT)  
- dotenv  
- CORS  
- Cloudinary (for image uploads)  
- cookie-parser  

---

### Testing  
- **Frontend**: Test the UI by running the development server and using the demo accounts.  
- **Backend**: Use tools like Postman or Insomnia to test API endpoints.  

---

### Code Quality  
ESLint is configured for the frontend to enforce code consistency. Run linting with:  
```bash
cd frontend
npm run lint
```

### License
This project is licensed under the MIT License.