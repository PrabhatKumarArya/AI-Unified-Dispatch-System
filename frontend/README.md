# 🚚 Unified Delivery System — Frontend

The frontend of the **Unified Delivery System** is a modern, responsive web application built to provide a seamless interface for **customers, riders, and administrators**.

It communicates with the backend through REST APIs and provides role-based dashboards for managing orders, deliveries, riders, and system analytics.

---

## 🛠️ Tech Stack

* **React.js** — Frontend library
* **Vite** — Development and build tool
* **Tailwind CSS** — Styling and responsive UI
* **React Router** — Client-side routing
* **React Icons** — UI icons
* **JavaScript (ES6+)** — Programming language
* **Fetch API** — Backend API communication

---

## 📁 Project Structure

```text
frontend/
│
├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminNavbar.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminStatCard.jsx
│   │   │   ├── AIInsights.jsx
│   │   │   ├── RecentOrders.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   ├── RiderPerformance.jsx
│   │   │   └── SystemAnalytics.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── InputField.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── PasswordInput.jsx
│   │   │   └── RegisterForm.jsx
│   │   │
│   │   ├── customer/
│   │   │   ├── AIRecommendation.jsx
│   │   │   ├── CustomerNavbar.jsx
│   │   │   ├── CustomerSidebar.jsx
│   │   │   ├── DeliveryAnalytics.jsx
│   │   │   ├── LiveOrderStatus.jsx
│   │   │   ├── RecentOrders.jsx
│   │   │   └── StatCard.jsx
│   │   │
│   │   ├── landing/
│   │   │   ├── AnalyticsPreview.jsx
│   │   │   ├── Benefits.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Services.jsx
│   │   │   └── Workflow.jsx
│   │   │
│   │   └── rider/
│   │       ├── AssignedOrders.jsx
│   │       ├── LiveDeliveryStatus.jsx
│   │       ├── RiderNavbar.jsx
│   │       ├── RiderNotifications.jsx
│   │       ├── RiderPerformance.jsx
│   │       ├── RiderSidebar.jsx
│   │       ├── RiderStatCard.jsx
│   │       ├── RoutePreview.jsx
│   │       └── TodayEarnings.jsx
│   │   
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   ├── CustomerLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── MainLayout.jsx
│   │   └── RiderLayout.jsx
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminSettings.jsx
│   │   │   ├── AIMonitor.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── ManageCustomers.jsx
│   │   │   ├── ManageOrders.jsx
│   │   │   └── ManageRIders.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   └── VerifyOTP.jsx
│   │   │
│   │   ├── customer/
│   │   │   ├── CreateOrder.jsx
│   │   │   ├── CustomerAIDispatch.jsx
│   │   │   ├── CustomerDashboard.jsx
│   │   │   ├── CustomerOrders.jsx
│   │   │   ├── CustomerProfile.jsx
│   │   │   ├── CustomerSettings.jsx
│   │   │   └── OrderDetails.jsx
│   │   │
│   │   ├── public/
│   │   │   └── Home.jsx
│   │   │
│   │   └── rider/
│   │       ├── RiderDashboard.jsx
│   │       ├── RiderEarnings.jsx
│   │       ├── RiderMap.jsx
│   │       ├── RiderOrders.jsx
│   │       └── RiderProfile.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── PrivateRoutes.jsx
│   │
│   ├── services/
│   │   ├── analyticsService.js
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── customerService.js
│   │   ├── notificationService.js
│   │   ├── orderService.js
│   │   ├── riderService.js
│   │   └── settingsService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│   │
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── README.md
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

---

## ▶️ Run the Application

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 🏗️ Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🎨 Styling

The project uses **Tailwind CSS** for styling.

Example:

```jsx
<button className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
  Create Order
</button>
```

Tailwind provides:

* Responsive layouts
* Utility-first styling
* Consistent spacing
* Responsive typography
* Hover and focus states
* Modern UI components

---

## 🧭 Routing

The application uses **React Router** for navigation.

### Public Routes

```text
/
├── /
├── /login
└── /register
```

### Customer Routes

```text
/customer/dashboard
/customer/orders
/customer/orders/:id
/customer/profile
```

### Rider Routes

```text
/rider/dashboard
/rider/orders
/rider/profile
```

### Admin Routes

```text
/admin/dashboard
/admin/orders
/admin/riders
/admin/users
```

Protected routes require authentication.

---

## 👥 User Interfaces

### 👤 Customer

Customers can:

* Register and log in
* Create delivery orders
* View their orders
* Track deliveries
* View delivery status
* Check estimated delivery time
* Manage their profile

### 🛵 Rider

Riders can:

* Log in
* View assigned orders
* Accept delivery requests
* Update delivery status
* Manage availability
* View delivery information

### 👨‍💼 Admin

Administrators can:

* Monitor the complete delivery system
* Manage customers
* Manage riders
* View all orders
* Monitor delivery status
* View analytics and statistics

---

## 🧩 Main Components

### Navbar

Provides:

* Application branding
* Navigation links
* User information
* Responsive mobile menu
* Login/logout actions

### Hero

The landing-page hero section introduces the Unified Delivery System and its primary features.

### Dashboard

Provides role-specific information such as:

```text
Total Orders
Active Orders
Average ETA
Money Saved
```

### Sidebar

Used for dashboard navigation and provides quick access to:

```text
Dashboard
Orders
Analytics
Settings
```

---

## 🔌 Backend Integration

The frontend communicates with the backend using REST APIs.

Example API configuration:

```javascript
const API = "http://localhost:7000/api";
```

Example request:

```javascript
const response = await fetch(`${API}/orders`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});
```

The backend should be running before testing features that require API communication.

---

## 🔐 Authentication

Authentication is handled using tokens received from the backend.

The frontend:

1. Sends login credentials.
2. Receives an authentication token.
3. Stores the token.
4. Sends the token with protected API requests.
5. Redirects users according to their role.

Example:

```javascript
const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
};
```

---

## 📱 Responsive Design

The application is designed to work across:

* 📱 Mobile devices
* 📟 Tablets
* 💻 Laptops
* 🖥️ Desktop screens

Tailwind responsive utilities are used to adapt layouts according to screen size.

---

## 🔄 Application Flow

```text
                    Landing Page
                         │
              ┌──────────┴──────────┐
              │                     │
           Login                 Register
              │
              ▼
       Authentication
              │
       ┌──────┼──────┐
       │      │      │
       ▼      ▼      ▼
   Customer  Rider  Admin
   Dashboard Dashboard Dashboard
       │      │      │
       └──────┼──────┘
              ▼
        Backend APIs
              │
              ▼
           Database
```

---

## 🧪 Development

Run the development server:

```bash
npm run dev
```

Before committing changes:

```bash
npm run build
```

Make sure the production build completes successfully.

---

## 🌿 Git Workflow

Create a feature branch:

```bash
git checkout -b feature/navbar
```

Make your changes and commit:

```bash
git add .
git commit -m "feat: add responsive navbar"
```

Push the branch:

```bash
git push origin feature/navbar
```

Create a Pull Request after testing the feature.

---

## 📝 Commit Message Examples

```text
feat: add customer dashboard
feat: implement responsive navbar
feat: add order tracking page
feat: integrate order API
fix: resolve mobile navigation issue
fix: handle authentication error
style: improve dashboard UI
docs: update frontend README
```

---

## 🚧 Future Enhancements

* Real-time order tracking
* Interactive delivery map
* Live rider location
* AI-powered ETA display
* Route visualization
* Push notifications
* Advanced analytics dashboard
* Dark mode
* Progressive Web App support

---

## 🤝 Team Development

To maintain a clean codebase:

* Develop features in separate branches.
* Keep components reusable.
* Follow consistent naming conventions.
* Avoid committing unnecessary files.
* Test features before creating Pull Requests.
* Keep API logic separate from UI components.
* Write meaningful commit messages.

---

## 📄 License

This project is developed as an academic/team project.

---

### 🚚 Unified Delivery System

**Connecting customers, riders, and deliveries through one unified platform.**
