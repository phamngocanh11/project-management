# Project Management System

A modern project management application built with React, TypeScript, Node.js, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/phamngocanh11/project-management.git
   cd project-management
   ```

2. **Setup Environment Variables**

   **Client:**

   ```bash
   cd client
   cp .env.example .env
   # Edit .env with your configuration
   ```

   **Server:**

   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your database and API configuration
   ```

3. **Install Dependencies**

   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

4. **Database Setup**

   ```bash
   # Create PostgreSQL database
   createdb project_management

   # Run migrations (if available)
   cd server
   npm run migrate
   ```

5. **Start Development Servers**

   **Terminal 1 - Start Server:**

   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start Client:**

   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
project-management/
├── client/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── styles/        # CSS styles
│   └── package.json
├── server/                # Node.js Express backend
│   ├── controllers/       # API controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middlewares/      # Express middlewares
│   └── package.json
└── README.md
```

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Configure CORS properly for production
- Use HTTPS in production environment

## 🛠️ Development Scripts

**Client:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Server:**

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run migrate` - Run database migrations

## 📝 Environment Variables

### Client (.env)

- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - Application name

### Server (.env)

- `PORT` - Server port (default: 3001)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `CLOUDINARY_*` - File upload configuration

## 🚀 Deployment

1. Build the client: `cd client && npm run build`
2. Configure production environment variables
3. Deploy server to your hosting platform
4. Serve client build files statically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
