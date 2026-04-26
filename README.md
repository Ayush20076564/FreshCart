# FreshCart

FreshCart is a cloud-based grocery e-commerce web application designed to provide customers with a smooth online shopping experience and give administrators efficient tools for product and inventory management.

## Overview

FreshCart is a full-stack web application that allows users to:

- Browse grocery products by category
- Search and filter products
- Add, remove, and update cart items
- Apply discount coupons during checkout
- Place orders online
- Receive automated invoice emails
- View order history

The application also includes an admin panel for managing products, stock levels, and product images.

## Features

### Customer Features
- User registration and login
- Browse products by category
- Search and filter products
- Add, remove, and update cart items
- Apply discount coupons during checkout
- Place orders and store order history
- Receive invoice confirmation by email

### Admin Features
- Add new products
- Update existing product details
- Delete products
- Manage stock levels
- Upload product images through Firebase Storage

## Tech Stack

### Frontend
- React
- Bootstrap

### Backend
- Node.js
- Express.js
- Firebase Functions

### Database and Services
- Cloud Firestore
- Firebase Authentication
- Firebase Hosting
- Firebase Storage
- Nodemailer
- Firebase Analytics

## System Architecture

FreshCart follows a three-tier architecture:

```text
User (Browser)
   ↓
React Frontend
   ↓
Firebase Hosting
   ↓
Firebase Functions (Node.js + Express APIs)
   ↓
Firestore Database
```

## Project Structure

```bash
FreshCart/
├── client/                # Frontend application
├── src/                   # React source files
├── components/            # Reusable UI components
├── pages/                 # Application pages
├── context/               # State management
├── functions/             # Firebase Functions backend
├── firebase/              # Firebase configuration files
├── public/                # Static assets
└── README.md
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Retrieve all products |
| `/api/products` | POST | Add a new product |
| `/api/products/:id` | PUT | Update product details |
| `/api/products/:id` | DELETE | Delete a product |
| `/api/orders` | POST | Place an order |
| `/api/orders/user/:id` | GET | Retrieve user orders |
| `/api/checkout` | POST | Process checkout, validate stock, apply coupons, and generate invoice |
| `/api/health` | GET | Check backend service status |

## Security Features

FreshCart includes multiple security measures:

- Firebase Authentication for secure user login
- Role-based access control for admin and customer users
- Backend input validation
- Firestore security rules
- Firebase Storage rules
- CORS protection for trusted origins
- Environment variables for sensitive credentials
- HTTPS deployment via Firebase Hosting

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/freshcart.git
cd freshcart
```

### 2. Install dependencies

For the frontend:

```bash
npm install
```

For Firebase Functions:

```bash
cd functions
npm install
cd ..
```

### 3. Configure Firebase

Create a Firebase project and enable:

- Firebase Authentication
- Cloud Firestore
- Firebase Hosting
- Firebase Functions
- Firebase Storage

Add your Firebase configuration in the relevant project files.

### 4. Configure environment variables

Create a `.env` file and add required credentials such as:

```env
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

### 5. Run the application

Start the frontend:

```bash
npm start
```

Run Firebase emulators locally or deploy the functions as needed.

## Deployment

FreshCart is intended to be deployed using Firebase Hosting and Firebase Functions.

```bash
firebase deploy
```

This deploys:

- Frontend to Firebase Hosting
- Backend APIs to Firebase Functions
- Firestore rules and Firebase configuration

## Testing

The application was tested for:

- Authentication functionality
- Product CRUD operations
- Cart and checkout workflow
- API response handling
- Order placement and storage
- Inventory updates
- Email invoice delivery
- Image upload functionality
- Order history retrieval

## Future Improvements

- Integrate Stripe or PayPal for online payments
- Add Firebase Storage optimization for product images
- Implement order tracking
- Build an analytics dashboard
- Add smarter search and filtering
- Introduce recommendation features
- Improve low-stock alerts and category management

## Academic Purpose

This project was developed as an academic full-stack cloud application to demonstrate:

- Modern web application development
- Cloud deployment using Firebase
- RESTful API design
- Authentication and access control
- Firestore database integration
- Practical software testing and evaluation

## Authors

**Ayush Sharma**  
Developer

**Paul Oyinloye**  
Developer

**Abdulqowiy Adeniji**  
Developer

## License

This project is for educational and academic use.
