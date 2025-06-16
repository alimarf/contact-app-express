# Contact Management API

A RESTful API for managing contacts with user authentication, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure signup and login functionality with JWT
- **Contact Management**: CRUD operations for contacts
- **Data Validation**: Input validation for all API endpoints
- **Security Features**: Implementation of security best practices
  - JWT authentication
  - Password hashing
  - Rate limiting
  - CORS protection
  - Helmet security headers
- **Error Handling**: Consistent error responses
- **MongoDB Integration**: Data persistence with Mongoose ODM

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **helmet**: Security headers
- **cors**: Cross-Origin Resource Sharing
- **express-rate-limit**: API rate limiting
- **dotenv**: Environment variable management

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd contact-be
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/contact_app
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

## Running the Application

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

## API Endpoints

### Authentication

#### Register a new user
```
POST /api/auth/signup
```
Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```
POST /api/auth/login
```
Request body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Contacts

**Note**: All contact endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

#### Create a new contact
```
POST /api/contacts
```
Request body:
```json
{
  "name": "Jane Smith",
  "phone": "1234567890",
  "email": "jane@example.com",
  "address": "123 Main St"
}
```

#### Get all contacts
```
GET /api/contacts
```

#### Get a specific contact
```
GET /api/contacts/:id
```

#### Update a contact
```
PUT /api/contacts/:id
```
Request body:
```json
{
  "name": "Jane Smith Updated",
  "phone": "9876543210"
}
```

#### Delete a contact
```
DELETE /api/contacts/:id
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": {} // Response data
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": {} // Error details (if any)
}
```

## Data Models

### User
- **email**: String (required, unique)
- **password**: String (required, min length: 6)
- **name**: String (required)
- **timestamps**: Created and updated timestamps

### Contact
- **name**: String (required)
- **phone**: String (required)
- **email**: String (optional)
- **address**: String (optional)
- **user**: ObjectId (reference to User model)
- **timestamps**: Created and updated timestamps

## Validation Rules

### User
- **email**: Must be a valid email format
- **password**: Minimum 6 characters
- **name**: Minimum 2 characters

### Contact
- **name**: Required, minimum 2 characters
- **phone**: Required, must contain only valid phone number characters
- **email**: Optional, must be a valid email format if provided
- **address**: Optional

## Security Measures

- Passwords are hashed using bcrypt before storing
- JWT authentication for protected routes
- Rate limiting to prevent brute force attacks
- Helmet for setting security-related HTTP headers
- CORS protection
- Input validation for all endpoints

## Testing

A Postman collection is included in the repository for testing the API endpoints. Import the `contact-api.postman_collection.json` file into Postman to get started.

## Error Handling

The API uses a consistent error handling approach with appropriate HTTP status codes:

- **200**: Success
- **201**: Resource created
- **400**: Bad request / Validation error
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Resource not found
- **500**: Server error

## License

ISC