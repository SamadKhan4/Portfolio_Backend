# Portfolio Backend - Admin API Documentation

## Base URL
`http://localhost:3000/api` (or your deployed URL)

---

## Admin Authentication

### Admin Login
**POST** `/api/auth/login`

#### Description
Authenticate admin user and get JWT token for protected routes.

#### Request Body
```json
{
  "username": "string",
  "password": "string"
}
```

#### Response
```json
{
  "success": true,
  "token": "jwt_token_string",
  "admin": {
    "id": "admin_id",
    "username": "string",
    "email": "string",
    "role": "admin"
  }
}
```

#### Headers Required
None (Public route for login)

---

## Admin Project Management

### Create Project
**POST** `/api/projects`

#### Description
Create a new project. Requires admin authentication and image upload.

#### Headers Required
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

#### Form Data Fields
- `title`: string (required)
- `description`: string (required)
- `image`: file (required) - Image file to upload
- `technologies`: string[] (required) - Comma-separated list of technologies
- `githubLink`: string (optional)
- `liveLink`: string (optional)
- `featured`: boolean (optional)

#### Response
```json
{
  "success": true,
  "data": {
    "_id": "project_id",
    "title": "Project Title",
    "description": "Project description",
    "image": "path_to_uploaded_image",
    "technologies": ["tech1", "tech2"],
    "githubLink": "https://github.com/...",
    "liveLink": "https://live-demo.com",
    "featured": false,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

---

### Update Project
**PUT** `/api/projects/:id`

#### Description
Update an existing project. Requires admin authentication.

#### Path Parameter
- `id`: Project ID (required)

#### Headers Required
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

#### Form Data Fields (all optional)
- `title`: string
- `description`: string
- `image`: file - New image file
- `technologies`: string[] - Comma-separated list of technologies
- `githubLink`: string
- `liveLink`: string
- `featured`: boolean

#### Response
```json
{
  "success": true,
  "data": {
    "_id": "project_id",
    "title": "Updated Project Title",
    "description": "Updated description",
    "image": "path_to_updated_image",
    "technologies": ["tech1", "tech2", "tech3"],
    "githubLink": "https://github.com/updated",
    "liveLink": "https://live-demo.com/updated",
    "featured": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z"
  }
}
```

---

### Delete Project
**DELETE** `/api/projects/:id`

#### Description
Delete a project by ID. Requires admin authentication.

#### Path Parameter
- `id`: Project ID (required)

#### Headers Required
```
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "message": "Project removed"
}
```

---

## Admin Contact Management

### Get All Messages
**GET** `/api/contact`

#### Description
Retrieve all contact messages. Requires admin authentication.

#### Headers Required
```
Authorization: Bearer <jwt_token>
```

#### Response
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "contact_id",
      "name": "string",
      "email": "string",
      "subject": "string",
      "message": "string",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Authentication Protection

All admin routes require the following header:
```
Authorization: Bearer <jwt_token>
```

The JWT token is obtained by logging in via the `/api/auth/login` endpoint.

---

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

Common status codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (missing or invalid token)
- 404: Not Found (resource doesn't exist)
- 500: Server Error (internal server error)