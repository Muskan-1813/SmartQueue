# 🚦 SmartQueue

SmartQueue is a web-based queue management system designed to reduce physical waiting lines by enabling users to join and manage queues digitally. It provides role-based access for admins and users, real-time queue participation, and a smooth, modern UI.

The project is built with a **MERN-style architecture**, using secure cookie-based authentication and Redux Toolkit for predictable state management.

---

## ✨ Features

- 🔐 Cookie-based authentication & authorization (JWT)
- 👥 Role-based access control (Admin / User)
- ➕ Create and join queues digitally
- 🧠 Centralized state management using Redux Toolkit
- 🎨 Smooth UI interactions and animations
- 🌙 Theme persistence (light/dark mode)

---

## 🧱 Tech Stack

**Frontend**
- React
- Redux Toolkit
- React Router
- Framer Motion
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cookie-based sessions

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

---

## 1️⃣ Fork & Clone the Repository

```bash
git clone https://github.com/rishi-09/SmartQueue.git
cd SmartQueue
```
## 2️⃣ Environment Setup

- Create a .env file inside the server directory.
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_own_secret_key
```
## ⚠️ Make sure not to expose your .env file publicly.

## 3️⃣ Install Dependencies
- Backend
```bash
cd server
npm install
```
- Frontend
```bash
cd ../client
npm install
```
## 4️⃣ Run the Application
- Start the Backend Server
```bash
cd server
nodemon index.js
```
- Start the Frontend (in a new terminal)
```bash
cd client
npm run dev
```
## 5️⃣ Access the App

- Open your browser and navigate to:
``` http://localhost:5173```
- Backend runs on:
```http://localhost:5000```

## 🔐 Authentication Notes

- JWT is stored securely in HTTP-only cookies

- Authorization is handled via middleware on protected routes

- Make sure your browser allows cookies for local development

## 📂 Project Structure (Simplified)
```
SmartQueue/
├── client/      # React frontend
├── server/      # Express backend
├── README.md
```

## 🤝 Contributing

- Contributions, issues, and feature requests are welcome.

- Fork the project

- Create your feature branch (git checkout -b feature/awesome-feature)

- Commit your changes

- Push to the branch

- Open a Pull Request

📄 License

This project is licensed under the MIT License.
