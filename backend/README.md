# 🚚 Unified Delivery System — Backend

Backend API for the **Unified Delivery System**, a smart delivery management platform designed to connect customers, riders, and administrators through a centralized system.

The backend provides REST APIs for authentication, order management, rider management, delivery tracking, analytics, and administrative operations.

---

## 🛠️ Tech Stack

* **Node.js** — JavaScript runtime
* **Express.js** — Backend framework
* **MongoDB** — Database
* **Mongoose** — MongoDB ODM
* **JWT** — Authentication & authorization
* **Firebase Admin** — Firebase services
* **Cloudinary** — Image/file storage
* **dotenv** — Environment variable management
* **CORS** — Cross-origin resource sharing

---

## 📁 Backend Structure

```text
backend/
│
├── config/
│   ├── db.js
│   └── email.js
│
├── controllers/
│   ├── aiController.js
│   ├── authController.js
│   ├── customerController.js
│   ├── notificationController.js
│   ├── orderController.js
│   ├── riderController.js
│   ├── settingsController.js
│   └── userController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── Notification.js
│   ├── Rider.js
│   ├── Order.js
│   ├── Settings.js
│   └── User.js
│
├── routes/
│   ├── aiRoutes.js
│   ├── authRoutes.js
│   ├── customerRoutes.js
│   ├── notificationRoutes.js
│   ├── orderRoutes.js
│   ├── riderRoutes.js
│   └── settingsRoutes.js
│
├── utils/
│   ├── createNotification.js
│   ├── generateToken.js
│   └── sendEmail.js
│
├── .env
├── package-lock.json
├── package.json
├── server.js
└── README.md
```

> The folder structure can be modified as new modules and services are added.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend root directory:

```env
PORT=****

MONGO_URI=***************************

JWT_SECRET=*****************

```

⚠️ **Never commit `.env` or private credentials to GitHub.**

---

## ▶️ Running the Backend

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The backend will run on:

```text
http://localhost:****
```

---

## 🔗 API Structure

The backend follows a RESTful API architecture.

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Orders

```text
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id
DELETE /api/orders/:id
```

### Riders

```text
GET    /api/riders
GET    /api/riders/:id
POST   /api/riders
PUT    /api/riders/:id
```

### Admin

```text
GET    /api/admin/dashboard
GET    /api/admin/orders
GET    /api/admin/riders
GET    /api/admin/users
```

> API endpoints may change as the project evolves.

---

## 🔐 Authentication

Protected APIs use **JWT-based authentication**.

The client sends the token through the `Authorization` header:

```http
Authorization: Bearer <token>
```

The authentication middleware verifies the token before allowing access to protected resources.

---

## 👥 User Roles

The system supports role-based access control.

| Role     | Responsibilities                |
| -------- | ------------------------------- |
| Customer | Create and track orders         |
| Rider    | Accept and deliver orders       |
| Admin    | Manage users, riders and orders |

---

## 📦 Core Backend Modules

### 👤 Authentication

* User registration
* User login
* JWT authentication
* Role-based authorization
* Protected routes

### 📦 Order Management

* Create orders
* View orders
* Update order status
* Assign riders
* Track delivery progress

### 🛵 Rider Management

* Rider registration
* Rider availability
* Order assignment
* Delivery status updates
* Rider performance tracking

### 📊 Admin Management

* User management
* Rider management
* Order monitoring
* Delivery analytics
* System-level operations

---

## 🔄 Order Workflow

```text
Customer
   │
   ▼
Create Order
   │
   ▼
Order Created
   │
   ▼
Rider Assignment
   │
   ▼
Rider Accepts Order
   │
   ▼
Picked Up
   │
   ▼
Out for Delivery
   │
   ▼
Delivered
```

---

## 🧪 API Testing

Recommended tools for testing APIs:

* Postman
* Thunder Client
* REST Client

Example health-check request:

```http
GET /api/test
```

Expected response:

```json
{
  "message": "Backend is running successfully"
}
```

---

## 🔒 Security Practices

* Store secrets in environment variables
* Never commit `.env`
* Validate incoming requests
* Authenticate protected routes
* Implement role-based authorization
* Use secure password hashing
* Configure CORS properly
* Validate uploaded files

---

## 🌐 Frontend Integration

The React frontend communicates with this backend through REST APIs.

Example:

```javascript
const API = "http://localhost:****/api";
```

For authenticated requests:

```javascript
const response = await fetch(`${API}/orders`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});
```

---

## 🧑‍💻 Development Workflow

```text
Create Feature
     ↓
Create/Update Model
     ↓
Create Controller
     ↓
Create Route
     ↓
Add Middleware
     ↓
Test API
     ↓
Connect Frontend
     ↓
Commit Changes
```

---

## 📝 Git Commit Examples

Use meaningful commit messages:

```bash
git add .
git commit -m "feat: add order management APIs"
```

```bash
git commit -m "feat: implement rider authentication"
```

```bash
git commit -m "fix: resolve order assignment issue"
```

```bash
git commit -m "docs: update backend README"
```

---

## 🚧 Future Enhancements

* Real-time delivery tracking
* WebSocket-based rider location updates
* AI-based rider assignment
* ETA prediction
* Route optimization
* Push notifications
* Delivery analytics
* Payment integration
* Automated customer notifications

---

## 🤝 Team Development

For team development, each feature should ideally be developed in a separate branch:

```bash
git checkout -b feature/order-management
```

After implementation and testing:

```bash
git add .
git commit -m "feat: implement order management"
git push origin feature/order-management
```

Then create a Pull Request for review.

---

## 📄 License

This project is developed as an academic/team project.

---

### 🚚 Unified Delivery System

**One platform. Multiple roles. Smarter deliveries.**
