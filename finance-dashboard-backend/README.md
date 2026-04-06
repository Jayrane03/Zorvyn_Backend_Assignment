# 🚀 Finance Dashboard Backend

## 📌 Overview

This project is a backend system for managing financial records with role-based access control and dashboard analytics. It is designed to demonstrate backend architecture, API design, and data processing capabilities.

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Swagger (API Docs)

---

## 🔐 Features

* User Authentication (JWT)
* Role-Based Access Control (Admin, Analyst, Viewer)
* Financial Records CRUD
* Filtering & Pagination
* Dashboard Summary (Income, Expense, Balance)
* Input Validation
* API Documentation (Swagger)

---

## 📁 Project Structure

```
src/
 ├── models/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── utils/
 ├── config/
 └── app.js
```

---

## ⚙️ Setup Instructions

```bash
git clone <your-repo-link>
cd finance-dashboard-backend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📊 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Records

* POST `/api/records` (Admin only)
* GET `/api/records` (Admin, Analyst)

  * Supports filtering & pagination

### Dashboard

* GET `/api/dashboard/summary`

---

## 🔒 Roles & Permissions

| Role    | Permissions              |
| ------- | ------------------------ |
| Viewer  | Dashboard only           |
| Analyst | View records + dashboard |
| Admin   | Full access              |

---

## 📘 API Documentation

Swagger Docs:

```
http://localhost:5000/api-docs
```

---

## 🧠 Assumptions

* JWT used for authentication
* Roles are predefined
* MongoDB used for persistence

---

## 🚀 Future Improvements

* Unit testing
* Rate limiting
* Soft delete

---

## 👨‍💻 Author

Jay Rane
