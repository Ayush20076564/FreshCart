# 🛒 FreshCart

FreshCart is a **cloud-based grocery e-commerce web application** designed to deliver a smooth online shopping experience for customers and efficient inventory management for administrators.

## 📌 Project Overview

FreshCart was developed as a **full-stack web application** that enables users to:

- Browse grocery products
- Add and manage items in a shopping cart
- Apply discount coupons
- Place orders online
- Receive invoice emails automatically

The platform also includes an **admin panel** for managing products and stock levels.

***

## ✨ Features

### Customer Features
- User registration and login
- Browse products by category
- Add, remove, and update cart items
- Apply discount coupons during checkout
- Place orders and store order history
- Receive invoice confirmation by email

### Admin Features
- Add new products
- Update existing product details
- Delete products
- Manage stock levels

***

## 🧰 Tech Stack

### Frontend
- **React**
- **Bootstrap**

### Backend
- **Node.js**
- **Express.js**
- **Firebase Functions**

### Database & Services
- **Cloud Firestore**
- **Firebase Authentication**
- **Firebase Hosting**
- **Nodemailer**

***

## 🏗️ System Architecture

FreshCart follows a **three-tier architecture**:

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

***

## 📂 Project Structure

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

***

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Retrieve all products |
| `/api/products` | POST | Add a new product |
| `/api/products/:id` | PUT | Update product details |
| `/api/products/:id` | DELETE | Delete a product |
| `/api/orders` | POST | Place an order |
| `/api/orders/user/:id` | GET | Retrieve user orders |

***

## 🔐 Security Features

FreshCart includes multiple security measures:

- Firebase Authentication for secure user login
- Role-based access control for admin and customer users
- Backend input validation
- Firestore security rules
- CORS protection for trusted origins
- Environment variables for sensitive credentials
- HTTPS deployment via Firebase Hosting

***

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/freshcart.git
cd freshcart
```

### 2. Install dependencies

For frontend:

```bash
npm install
```

For Firebase functions:

```bash
cd functions
npm install
cd ..
```

### 3. Configure Firebase

Create your Firebase project and enable:

- Firebase Authentication
- Cloud Firestore
- Firebase Hosting
- Firebase Functions

Add your Firebase config in the appropriate project files.

### 4. Configure environment variables

Create a `.env` file and add required secrets such as:

```env
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

### 5. Run the application

Start the frontend:

```bash
npm start
```

Run Firebase emulators or deploy functions as needed.

***

## 🚀 Deployment

FreshCart is intended to be deployed using **Firebase Hosting** and **Firebase Functions**.

### Deploy the project

```bash
firebase deploy
```

This deploys:
- Frontend to Firebase Hosting
- Backend APIs to Firebase Functions
- Firestore rules and related Firebase configuration

***

## 🧪 Testing

The application was tested for:

- Authentication functionality
- Product CRUD operations
- Cart and checkout workflow
- API response handling
- Order placement and storage
- Inventory updates
- Email invoice delivery

***

## 📈 Future Improvements

- Integrate **Stripe** for online payments
- Add **Firebase Storage** for product image uploads
- Implement **order tracking**
- Build an **analytics dashboard**
- Add smarter **search and filtering**
- Introduce **recommendation features**

***

## 🎓 Academic Purpose

This project was developed as an academic full-stack cloud application to demonstrate:

- Modern web application development
- Cloud deployment using Firebase
- RESTful API design
- Authentication and access control
- Database integration with Firestore
- Practical software testing and evaluation

***

## 👤 Author

**Ayush Sharma**  
Developer  
Focused on cloud development, full-stack applications, and cybersecurity.

***

## 📄 License

This project is for **educational and academic use**.
