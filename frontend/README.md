# MEDICARE-BOOKING

This application is built with React and Vite to provide a fast and modern user interface for booking medical appointments, managing profiles, and viewing doctors and services.

## Features

- Responsive React application with modern hooks and context API
- User authentication and profile management
- Doctor listings and detailed views
- Appointment booking and management
- Reviews and ratings for doctors
- Integration with backend APIs
- Fast development with Vite and hot module replacement (HMR)
- ESLint configured for code quality

## Features Based on Roles

### Doctor

- Managing appointments (view, accept, reject)
- Updating profile and availability
- Viewing patient feedback and ratings
- Managing schedules and notifications

### Patient

- Booking and managing appointments
- Viewing doctor profiles and specialties
- Managing user profile and settings
- Providing reviews and ratings for doctors

### Admin

- Managing users, doctors, appointments, and site asset management and many more are coming soon

## Demo Account

You can test the application without creating new accounts using the following demo credentials:

| Role    | Email            | Password  |
| ------- | ---------------- | --------- |
| Doctor  | doctor@demo.com  | demo@pass |
| Patient | patient@demo.com | demo@pass |

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository and navigate to the `frontend` directory:

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The app will be available at `http://localhost:3000` by default.

## Building for Production

To build the app for production deployment:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Project Structure

```
frontend/
├── public/
│   └── (static assets like images and icons)
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── Dashboard/
│   ├── hooks/
│   ├── layout/
│   ├── pages/
│   ├── routes/
│   └── utils/
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- React Router
- Context API
- Axios (for API calls)
- ESLint
- CSS Modules / Tailwind CSS (if applicable)

## ESLint Configuration

ESLint is configured to enforce code quality and consistency. You can run linting with:

```bash
npm run lint
```

## License

This project is licensed under the MIT License.
