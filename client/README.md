FreshCart
FreshCart is a cloud-based grocery e-commerce web application built to provide a smooth online shopping experience for customers and a simple product management system for administrators.
Overview
The project was developed as a full-stack web application that allows users to browse grocery products, manage a shopping cart, apply discount coupons, place orders, and receive invoice emails. It also includes an admin panel for adding, updating, deleting, and managing product stock.
Features
•	User registration and login
•	Role-based access control for admin and customer users
•	Product browsing and filtering
•	Shopping cart management
•	Checkout with discount coupons
•	Order placement and storage
•	Automated invoice email generation
•	Admin panel for product and inventory management
•	Cloud deployment with secure HTTPS support
Tech Stack
Frontend
•	React
•	Bootstrap
Backend
•	Node.js
•	Express
•	Firebase Functions
Database and Services
•	Firestore
•	Firebase Authentication
•	Firebase Hosting
•	Nodemailer
System Architecture
FreshCart follows a three-tier architecture:
1.	Frontend Layer – React-based user interface for customers and admins
2.	Application Layer – Node.js and Express APIs deployed with Firebase Functions
3.	Data Layer – Firestore database for storing products, orders, and related data
Core Modules
Authentication
Handles user registration, login, secure sessions, and role-based access.
Product Catalogue
Displays available grocery items with product details such as name, category, price, image, and stock.
Cart Management
Allows users to add items, update quantities, remove products, and view the total cost dynamically.
Checkout
Collects delivery details, applies coupons, calculates totals, and confirms orders.
Order Processing
Validates stock, stores order information, updates inventory, and triggers invoice generation.
Admin Panel
Enables administrators to create, update, delete, and monitor products and stock levels.
Example API Endpoints
Endpoint	Method	Purpose
/api/products	GET	Retrieve all products
/api/products	POST	Add a new product
/api/products/:id	PUT	Update a product
/api/products/:id	DELETE	Delete a product
/api/orders	POST	Place an order
/api/orders/user/:id	GET	Get user order history

Security
The application includes several security measures:
•	Firebase Authentication for secure identity management
•	Role-based access control
•	Request validation for backend APIs
•	Firestore security rules
•	CORS protection for trusted domains
•	Environment variable usage for sensitive credentials
•	HTTPS deployment through Firebase Hosting
Testing
The system was tested for the following areas:
•	Authentication functionality
•	Product CRUD operations
•	Cart workflow
•	Checkout processing
•	Order storage
•	Stock updates
•	Email invoice delivery
Project Structure
FreshCart/
├── client/          # React frontend
├── functions/       # Firebase Functions backend
├── src/             # Frontend source files
├── components/      # Reusable UI components
├── pages/           # Application pages
├── context/         # State management for cart/user
├── firebase/        # Firebase configuration
└── README.md

Future Improvements
•	Integrate Stripe or another payment gateway
•	Add Firebase Storage for image uploads
•	Implement order tracking
•	Add analytics dashboard
•	Improve product search and recommendation features
Academic Context
This project demonstrates the design and implementation of a modern cloud-based e-commerce system using full-stack development practices. It was created as a practical academic project focused on system architecture, secure cloud deployment, modular code design, and application testing.
