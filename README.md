# Portfolio Backend

A clean, production-ready backend for a developer portfolio built with Node.js, Express, and MongoDB.

## Features

- RESTful API endpoints for projects and contact form
- MongoDB integration with Mongoose ODM
- Comprehensive validation and error handling
- Clean, modular code structure
- Production ready

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors
- nodemon

## Models

### Project Model
- title (String, required)
- description (String, required)
- image (String, required)
- technologies (Array, required)
- githubLink (String, optional)
- liveLink (String, optional)
- featured (Boolean, default: false)
- createdAt (Date, auto-generated)

### Contact Model
- name (String, required)
- email (String, required)
- subject (String, required)
- message (String, required)
- createdAt (Date, auto-generated)

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - View messages (admin)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file based on `.env.example`
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Port number (default: 5000)
- `MONGODB_URI` - MongoDB connection string

## Deployment

This application is ready for deployment on platforms like:
- Render
- Railway
- VPS

## License

MIT