# Modern Hotel Booking Platform

## **Overview**
The **Modern Hotel Booking Platform** is a full-stack web application designed for seamless hotel room discovery, booking, and management. It features an interactive and user-friendly interface, making it easy for users to browse rooms, book stays, and manage their reservations. The platform ensures secure authentication and provides administrators with tools to manage bookings effectively.

## **Live Demo**
[Visit Live Project](https://mordern-hotel-booking-platform.web.app/)

## **Technologies Used**
### Frontend:
- **React.js**: Library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router DOM**: Handles client-side routing.
- **Axios**: Facilitates API communication.
- **React Toastify**: Provides toast notifications for user feedback.
- **React Leaflet**: Displays interactive maps for room locations.
- **Framer Motion**: Adds smooth animations and transitions.
- **React Helmet**: Manages metadata for improved SEO.
- **Moment.js**: Manages date formatting and comparisons.
- **React Datepicker**: Implements an intuitive date picker for bookings.

### Backend:
- **Node.js**: JavaScript runtime for backend operations.
- **Express.js**: Simplifies server-side operations and routing.
- **MongoDB**: NoSQL database for efficient data management.
- **JSON Web Token (JWT)**: Ensures secure authentication.
- **Bcrypt.js**: Hashes passwords for secure storage.
- **Dotenv**: Manages environment variables securely.

## **Core Features**
- **Dynamic Homepage**:
  - Interactive banner slider and map integration.
  - Featured rooms and user reviews displayed in a carousel.
- **Authentication**:
  - Secure login and registration with JWT-based private routes.
  - Social login support (Google/GitHub).
- **Room Management**:
  - Filter and search rooms by price, availability, and rating.
  - Detailed room pages with reviews and booking options.
- **Booking System**:
  - User-friendly booking modal with date selection.
  - "My Bookings" page for managing reservations.
- **Additional Features**:
  - Fully responsive design for all devices.
  - Creative 404 page with navigation options.

## **Dependencies**
Here are the main npm packages used in the project:
- Frontend: `react`, `react-router-dom`, `axios`, `react-toastify`, `react-leaflet`, `moment`, `react-datepicker`, `framer-motion`, `react-helmet`.
- Backend: `express`, `jsonwebtoken`, `bcryptjs`, `dotenv`, `mongoose`.

## **How to Run Locally**
Follow these steps to set up the project on your local machine:

### Prerequisites:
- Install **Node.js** and **npm** on your machine.
- Ensure **MongoDB** is installed and running locally or use an online MongoDB cluster.

### Steps:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/RaihanSoft/modern-hotel-booking-platform.git
   cd modern-hotel-booking-platform
   ```

2. **Install dependencies**:
   - Frontend:
     ```bash
     cd client
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `server` directory with the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     PORT=5000
     ```

4. **Run the project**:
   - Start the frontend development server:
     ```bash
     cd client
     npm start
     ```

5. **Open the application**:
   - Visit `http://localhost:3000` in your browser to view the project.

## **Resources**
- [Live Demo](https://mordern-hotel-booking-platform.web.app/)
- [GitHub Repository](https://github.com/YourUsername/modern-hotel-booking-platform)
