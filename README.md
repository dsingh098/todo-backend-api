# 📝 Todo Backend API

A secure and scalable RESTful API for a Todo application built with Node.js, Express, and MongoDB. Features include user authentication with JWT, password hashing, and cookie-based session management.

## 🚀 Features

- ✅ User Authentication (Signup, Login, Logout)
- ✅ Secure Password Hashing (bcrypt)
- ✅ JWT Token-based Authentication
- ✅ Cookie-based Session Management
- ✅ CRUD Operations for Todos
- ✅ User-specific Todo Management
- ✅ MongoDB Database Integration
- ✅ Protected Routes with Middleware
- ✅ Input Validation
- ✅ Error Handling

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv
- **Cookie Parser:** cookie-parser

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn package manager

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/dsingh098/todo-backend-api.git
cd todo-backend-end
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment variables**

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8000
```

4. **Start the server**
```bash
npm start
```

The server will start on `http://localhost:8000`

## 📁 Project Structure

```
todo-backend-end/
├── config/
│   ├── db.js              # Database connection
│   └── token.js           # JWT token generation
├── controllers/
│   ├── usercontrollers.js # User authentication logic
│   └── todocontrollers.js # Todo CRUD operations
├── middleware/
│   └── authmiddleware.js  # JWT authentication middleware
├── models/
│   ├── usermodels.js      # User schema
│   └── todomodels.js      # Todo schema
├── routes/
│   ├── userroutes.js      # Auth routes
│   └── todoroutes.js      # Todo routes
├── index.js               # Main application entry point
├── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication Routes

#### 1. User Signup
```http
POST /auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "userName": "johndoe",
    "email": "john@example.com"
  }
}
```

#### 2. User Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "userName": "johndoe",
    "email": "john@example.com"
  }
}
```

#### 3. User Logout
```http
POST /auth/logout
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

#### 4. Delete User
```http
DELETE /auth/delete
```
**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

### Todo Routes (Protected)

All todo routes require authentication. The JWT token must be present in cookies.

#### 1. Create Todo
```http
POST /todo
```

**Headers:** `Cookie: token=jwt_token`

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Add README and API docs"
}
```

**Response:**
```json
{
  "message": "Todo is added",
  "todo": {
    "_id": "todo_id",
    "title": "Complete project documentation",
    "description": "Add README and API docs",
    "completed": false,
    "user": "user_id",
    "createdAt": "2024-02-09T12:00:00.000Z",
    "updatedAt": "2024-02-09T12:00:00.000Z"
  }
}
```

#### 2. Get All Todos
```http
GET /todo
```

**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
{
  "count": 2,
  "todos": [
    {
      "_id": "todo_id_1",
      "title": "Complete project",
      "description": "Finish backend",
      "completed": false,
      "user": "user_id",
      "createdAt": "2024-02-09T12:00:00.000Z"
    },
    {
      "_id": "todo_id_2",
      "title": "Review code",
      "description": "Check for bugs",
      "completed": true,
      "user": "user_id",
      "createdAt": "2024-02-08T10:00:00.000Z"
    }
  ]
}
```

#### 3. Update Todo (Toggle Completion)
```http
PATCH /todo/:id
```

**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
{
  "message": "Todo status updated",
  "todo": {
    "_id": "todo_id",
    "title": "Complete project",
    "description": "Finish backend",
    "completed": true,
    "user": "user_id",
    "createdAt": "2024-02-09T12:00:00.000Z",
    "updatedAt": "2024-02-09T13:00:00.000Z"
  }
}
```

#### 4. Delete Todo
```http
DELETE /todo/:id
```

**Headers:** `Cookie: token=jwt_token`

**Response:**
```json
{
  "message": "Todo Deleted",
  "todo": {
    "_id": "todo_id",
    "title": "Deleted todo",
    "completed": false
  }
}
```

## 🔒 Security Features

1. **Password Hashing:** User passwords are hashed using bcrypt before storing in database
2. **JWT Authentication:** Secure token-based authentication with 7-day expiry
3. **HTTP-Only Cookies:** Tokens stored in HTTP-only cookies to prevent XSS attacks
4. **Protected Routes:** Middleware ensures only authenticated users can access todo operations
5. **User-specific Data:** Each user can only access their own todos
6. **Input Validation:** All inputs are validated before processing

## 🧪 Testing the API

You can test the API using tools like:
- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) (VS Code extension)
- [Insomnia](https://insomnia.rest/)
- cURL commands

### Example cURL Request:

```bash
# Signup
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "userName": "testuser",
    "email": "test@example.com",
    "password": "test123"
  }'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'

# Create Todo (with cookie)
curl -X POST http://localhost:8000/todo \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "My First Todo",
    "description": "Testing the API"
  }'
```

## 🐛 Error Responses

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `500` - Internal Server Error

Example error response:
```json
{
  "message": "Email and password required"
}
```

## 🚧 Future Enhancements

- [ ] Add CORS support for frontend integration
- [ ] Implement rate limiting for authentication routes
- [ ] Add email verification for new users
- [ ] Password reset functionality
- [ ] Todo categories and tags
- [ ] Todo priority levels
- [ ] Due dates for todos
- [ ] Search and filter todos
- [ ] Pagination for large todo lists
- [ ] Input sanitization to prevent XSS
- [ ] Request logging with Morgan
- [ ] API documentation with Swagger

## 👨‍💻 Author

**Deepak Singh**

## 📄 License

ISC

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

If you have any questions or need help, feel free to reach out!

Email: ds1090429@gmail.com

**LinkedIn:** [Click here](https://www.linkedin.com/in/deepak-singh-8113b22b9)

---

**Made with ❤️ by Deepak Singh**