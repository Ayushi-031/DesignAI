# 🏠 DesignAI — AI-Powered Interior Design Platform

DesignAI is a full-stack AI-powered interior design platform that helps users visualize, customize, and shop for interior spaces according to their preferences, style, and budget.

The project combines a **React frontend** with a **Node.js/Express backend**, **MongoDB** for data storage, authentication, product management, cart, wishlist, orders, and AI-based room design functionality.

---

## ✨ Features

### 🎨 AI Interior Designer
- Upload a room image
- Provide design preferences
- Customize room requirements
- Generate AI-based room designs
- View products used in the generated design

### 🛋️ Furniture & Product Shopping
- Browse furniture and home-decor products
- Product categories
- Product details
- Search/browse products
- Add products to cart
- Add products to wishlist

### 👤 User Authentication
- User registration
- Login
- JWT-based authentication
- Password hashing
- Protected routes

### 🛒 Cart & Wishlist
- Add/remove products from cart
- Update product quantity
- Wishlist management
- Cart persistence

### 📦 Orders
- Place orders
- View orders
- View order details
- Manage order-related information

### 🏠 Room Designer
- Design and customize rooms
- Select room-related preferences
- Save designs

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS
- React Router
- Context API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer

### Development Tools

- Git
- GitHub
- Postman
- VS Code

---

## 📁 Project Structure

```text
DesignAI/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── Root.jsx
│   │   ├── routes.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Category.js
│   │   ├── Design.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Wishlist.js
│   │
│   ├── public/
│   │   └── uploads/
│   │
│   ├── app.js
│   ├── importProducts.js
│   ├── package.json
│   └── test-cloudflare.js
│
├── docs/
│   └── DesignAI-API.postman_collection.json
│
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Ayushi-031/DesignAI.git
```

Move into the project:

```bash
cd DesignAI
```

---

# 💻 Frontend Setup

Open a terminal inside the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server using the project's configured start command.

The backend API can be accessed through the configured backend port.

For local development, the frontend communicates with the backend through the API endpoints configured in the application.

---

# 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Never commit your `.env` file to GitHub.**

The repository already ignores `.env` through `.gitignore`.

---

# 🗄️ Database

DesignAI uses:

**MongoDB + Mongoose**

The backend contains models for:

- Users
- Products
- Categories
- Cart
- Wishlist
- Orders
- Designs

Make sure MongoDB is running before starting the backend.

---

# 🔑 Authentication

DesignAI uses **JWT (JSON Web Tokens)** for authentication.

The authentication flow is:

```text
User
 ↓
Signup/Login
 ↓
Password verification
 ↓
JWT generated
 ↓
Token sent to client
 ↓
Token included in protected requests
 ↓
JWT middleware verifies token
 ↓
Access protected resource
```

Passwords are securely hashed using `bcrypt`.

---

# 📡 API Documentation

The project includes a Postman collection containing the backend API requests.

### Import Postman Collection

1. Open **Postman**
2. Select **Import**
3. Select:

```text
docs/DesignAI-API.postman_collection.json
```

4. Start the DesignAI backend
5. Run the API requests from Postman

### API Categories

The API collection covers functionality such as:

- Authentication
- Users
- Products
- Categories
- Cart
- Wishlist
- Orders
- Designs
- Image uploads

---

# 🧪 Testing APIs with Postman

The Postman collection can be used to test the backend independently from the frontend.

Typical flow:

```text
Signup
   ↓
Login
   ↓
Receive JWT
   ↓
Send JWT with protected requests
   ↓
Products / Cart / Wishlist / Orders
```

---

# 🖼️ Image Upload

The backend uses **Multer** for handling uploaded files.

Basic flow:

```text
Client
 ↓
Image Upload
 ↓
Multer
 ↓
Backend
 ↓
Image Processing / Storage
 ↓
Database or Cloud Storage
```

---

# 🌐 Application Flow

```text
                 DesignAI
                    │
          ┌─────────┴─────────┐
          │                   │
       Frontend            Backend
        React              Express
          │                   │
          │                Routes
          │                   │
          │               Controllers
          │                   │
          │                Mongoose
          │                   │
          └───────────┬───────┘
                      │
                   MongoDB
```

---

# 📌 Main Application Pages

The frontend includes pages such as:

- Home
- Login
- Signup
- Profile
- Categories
- Shop
- Product Details
- AI Designer
- Room Designer
- Cart
- Wishlist
- Checkout
- Orders
- Order Details
- Saved Designs

---

# 🔮 Future Enhancements

Possible future improvements include:

- Advanced AI room generation
- Personalized furniture recommendations
- Online payment integration
- Real-time order tracking
- Advanced product search and filtering
- More AI-powered design styles
- Deployment to cloud platforms
- Admin dashboard
- Product review and rating system

---

# 👩‍💻 Author

**Ayushi Sharma**

B.Tech Computer Science Engineering  
Chitkara University

### GitHub

https://github.com/Ayushi-031

---

# 📄 License

This project is developed for educational and project purposes.
