# Task Manager Application

[![Backend Deploy Status](https://img.shields.io/badge/backend-deployed-success)](https://task-manager-cqs1.onrender.com/)
[![Frontend Deploy Status](https://img.shields.io/badge/frontend-deployed-success)](https://task-to-do-todoapp.netlify.app/)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![Express](https://img.shields.io/badge/Express-5.1.0-green)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.15.0-blueviolet)

A full-stack task management application built with modern web technologies, featuring user authentication, task creation, editing, completion tracking, and priority management.

![Task Manager App Screenshot](https://placehold.co/600x400?text=Task+Manager+App)

## 🔗 Live Demo

- **Frontend:** [https://task-to-do-todoapp.netlify.app/](https://task-to-do-todoapp.netlify.app/)
- **Backend API:** [https://task-manager-cqs1.onrender.com/](https://task-manager-cqs1.onrender.com/)

## ✨ Features

- **User Authentication**: Secure registration and login with JWT
- **Task Management**: Create, read, update, and delete tasks
- **Task Status Tracking**: Mark tasks as complete/pending with visual indicators
- **Priority Levels**: Assign priority levels to tasks (HIGH, MEDIUM, LOW)
- **Due Dates**: Set and manage task deadlines
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS and shadcn/ui

## 🏗️ Tech Stack

### Backend

- **Framework**: Express.js (v5.1.0) with TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs for password hashing
- **Error Handling**: http-errors for standardized error responses
- **API Documentation**: Coming soon (Swagger/OpenAPI)

### Frontend

- **Framework**: React (v19.1.1) with TypeScript
- **State Management**: Redux Toolkit with Redux Thunk
- **Routing**: React Router Dom (v7.8.2)
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: shadcn/ui (based on Radix UI primitives)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: Sonner for toast notifications
- **Date Handling**: date-fns

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Installation and Setup

#### Clone the Repository

```bash
git clone https://github.com/Community-Programmer/task-manager.git
cd task-manager
```

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the backend directory with the following:
# DATABASE_URL="your_mongodb_connection_string"
# JWT_SECRET="your_jwt_secret"
# CLIENT_URL="http://localhost:5173"

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev

# For production build
npm run build
npm start
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# For production build
npm run build
```

## 📝 API Documentation

### Base URL

```
https://task-manager-cqs1.onrender.com/
```

### Authentication Endpoints

| Method | Endpoint       | Description         | Request Body                    |
| ------ | -------------- | ------------------- | ------------------------------- |
| POST   | /auth/register | Register a new user | `{ name, email, password }`     |
| POST   | /auth/login    | Login user          | `{ email, password }`           |
| GET    | /auth/profile  | Get user profile    | _Requires Authentication Token_ |

### Task Endpoints

| Method | Endpoint   | Description            | Request Body                                        |
| ------ | ---------- | ---------------------- | --------------------------------------------------- |
| GET    | /tasks     | Get all tasks for user | _Requires Authentication Token_                     |
| POST   | /tasks     | Create a new task      | `{ title, description, status, priority, dueDate }` |
| GET    | /tasks/:id | Get a specific task    | _Requires Authentication Token_                     |
| PUT    | /tasks/:id | Update a task          | `{ title, description, status, priority, dueDate }` |
| DELETE | /tasks/:id | Delete a task          | _Requires Authentication Token_                     |

## 🔒 Security

- Passwords are hashed using bcrypt
- Authentication is handled with JWT tokens
- CORS configured for security
- Environment variables used for sensitive information

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers
- Tablets
- Mobile phones

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developers

- **Community Programmer** - [GitHub](https://github.com/Community-Programmer)

---

Made with ❤️ using React, Express, and MongoDB
