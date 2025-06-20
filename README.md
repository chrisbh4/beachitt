# Beachitt 🏖️

A full-stack vacation rental platform that connects travelers with beachfront properties. Built with modern web technologies for a seamless booking experience.

**Live Demo:** [https://beachitt.fly.dev/](https://beachitt.fly.dev/)

## 📋 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Contact](#-contact)

## ✨ Features

### For All Users
- **Browse Properties**: View all listed rental units with detailed information
- **Read Reviews**: Access authentic reviews and ratings from previous guests
- **View Bookings**: See availability and booking information for properties

### For Registered Users
- **Property Management**: Create, edit, and delete rental unit listings
- **Review System**: Write, edit, and delete reviews for rental properties
- **Booking System**: Create, edit, and cancel bookings for vacation rentals
- **User Authentication**: Secure sign up/login with username or email

### Demo Account
- **Username**: demo@user.io
- **Password**: password

## 📸 Screenshots

### Homepage
![Homepage](https://imgur.com/BcUCHd8.png)

### Units Page
![Units Page](https://imgur.com/yNpzMZW.png)

### Unit Details Page
![Unit Details](https://imgur.com/53XA49J.png)

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface library
- **Redux** - State management
- **TailwindCSS** - Utility-first CSS framework
- **HTML5/CSS3** - Markup and styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Sequelize** - Object-relational mapping
- **PostgreSQL** - Relational database

### External Services
- **Google Maps API** - Location services
- **AWS S3** - File storage
- **Fly.io** - Deployment platform

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50" height="50" alt="JavaScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="50" height="50" alt="Express" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50" height="50" alt="Node.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50" alt="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="50" height="50" alt="Redux" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="50" height="50" alt="PostgreSQL" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" width="50" height="50" alt="Sequelize" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="50" height="50" alt="CSS3" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" width="50" height="50" alt="HTML5" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" width="50" height="50" alt="TailwindCSS" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" width="50" height="50" alt="Google" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" width="50" height="50" alt="AWS" />
</div>

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd beachitt
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up the database**
   ```bash
   cd ../backend
   
   # Create database
   npx dotenv sequelize db:create
   
   # Run migrations
   npx dotenv sequelize db:migrate
   
   # Seed the database
   npx dotenv sequelize db:seed:all
   ```

4. **Start the application**
   ```bash
   # Start backend server (from backend directory)
   npm start
   
   # Start frontend development server (from frontend directory)
   cd ../frontend
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📖 Usage

1. **Browse Properties**: Visit the homepage to see featured rental units
2. **View Details**: Click on any property to see detailed information, photos, and reviews
3. **Create Account**: Sign up to access booking and review features
4. **Book a Stay**: Select dates and create bookings for your desired property
5. **Leave Reviews**: Share your experience with other travelers

## 🔌 API Endpoints

### Authentication
- `POST /api/session` - User login
- `DELETE /api/session` - User logout
- `POST /api/users` - User registration

### Rental Units
- `GET /api/rental-units` - Get all rental units
- `GET /api/rental-units/:id` - Get specific rental unit
- `POST /api/rental-units` - Create new rental unit
- `PUT /api/rental-units/:id` - Update rental unit
- `DELETE /api/rental-units/:id` - Delete rental unit

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking


## 📧 Contact

**Christian Brown** - [chrismbh4@gmail.com](mailto:chrismbh4@gmail.com)

Project Link: [https://github.com/chrisbh4/beachitt](https://github.com/chrisbh4/beachitt)

<div align="center">
  <a href="mailto:chrismbh4@gmail.com">
    <img src="https://i.imgur.com/jLLwTjh.png" width="25" height="25" alt="Email" />
  </a>
  <a href="https://www.linkedin.com/in/christian-brown-8770311ba/">
    <img src="https://logodix.com/logo/91031.png" width="25" height="25" alt="LinkedIn" />
  </a>
  <a href="https://github.com/chrisbh4">
    <img src="https://icones.pro/wp-content/uploads/2021/06/icone-github-grise.png" width="25" height="25" alt="GitHub" />
  </a>
</div>

---

