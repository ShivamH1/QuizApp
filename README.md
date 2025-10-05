# Quiz Application

A full-stack quiz application built with React (frontend) and Express (backend), using PostgreSQL for data persistence.

## 🚀 Features

### User Features
- **Multiple Quizzes**: Choose from various quiz categories
- **Real-time Timer**: Track time taken to complete quizzes
- **Instant Feedback**: Get immediate results after submission
- **Detailed Results**: View your answers compared to correct answers
- **Beautiful UI**: Modern, responsive design using Tailwind CSS and Radix UI components
- **State Management**: Efficient state management with Zustand

### Admin Features
- **Full CRUD Operations**: Create, Read, Update, and Delete quizzes
- **Question Management**: Add, edit, and remove questions from quizzes
- **Complete API Integration**: All backend endpoints are integrated in the frontend
- **Type-Safe Operations**: TypeScript types for all CRUD operations

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **API Communication**: Native Fetch API

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **API Style**: RESTful
- **CORS**: Enabled for development

## 📋 Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd "Quiz Application"
```

### 2. Install dependencies for all packages
```bash
npm run install:all
```

Or install individually:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure Environment Variables

#### Backend Configuration
Create a `.env` file in the `backend` directory:
```env
PORT=3001
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL credentials.

#### Frontend Configuration (Optional for Production)
Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### 4. Set up the Database

```bash
cd backend

# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

## 🚀 Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently from the root directory:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:8080`
- Frontend dev server on `http://localhost:5173` (default Vite port)

### Run Individually

#### Backend Only
```bash
npm run dev:backend
# or
cd backend && npm run dev
```

#### Frontend Only
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

## 🏗️ Building for Production

### Build All
```bash
npm run build
```

### Build Individually
```bash
# Build backend
npm run build:backend

# Build frontend
npm run build:frontend
```

## 📡 API Endpoints

### Quizzes
- ✅ `GET /api/quizzes` - Get all quizzes
- ✅ `GET /api/quizzes/:id` - Get quiz by ID
- ✅ `POST /api/quizzes` - Create a new quiz
- ✅ `PUT /api/quizzes/:id` - Update a quiz
- ✅ `DELETE /api/quizzes/:id` - Delete a quiz

### Questions
- ✅ `GET /api/questions?quizId={id}` - Get all questions for a quiz
- ✅ `POST /api/questions` - Create a new question
- ✅ `PUT /api/questions/:id` - Update a question
- ✅ `DELETE /api/questions/:id` - Delete a question

### Quiz Submission
- ✅ `POST /api/submit` - Submit quiz answers and get results
  ```json
  {
    "quizId": "quiz-id",
    "answers": {
      "question-id-1": "a",
      "question-id-2": "c"
    },
    "timeTaken": 120
  }
  ```

### Health Check
- ✅ `GET /health` - Server health status

**All endpoints are fully integrated in the frontend!** See [CRUD_OPERATIONS.md](CRUD_OPERATIONS.md) for usage examples.

## 🗄️ Database Management

```bash
cd backend

# Open Prisma Studio (Visual Database Editor)
npm run db:studio

# Reset database and re-seed
npm run db:reset

# Push schema changes without migration
npm run db:push
```

## 📁 Project Structure

```
Quiz Application/
├── backend/
│   ├── src/
│   │   ├── controller/      # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── lib/             # Utilities (Prisma client)
│   │   ├── seeds/           # Database seeders
│   │   ├── server.ts        # Express app setup
│   │   └── index.ts         # Entry point
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/          # Page components with routing
│   │   │   ├── HomePage.tsx          # Quiz selection
│   │   │   ├── QuizPage.tsx          # Quiz taking
│   │   │   ├── ResultPage.tsx        # Results display
│   │   │   ├── AdminDashboard.tsx    # Admin panel
│   │   │   ├── QuizManagementPage.tsx      # Manage quizzes
│   │   │   ├── QuizFormPage.tsx            # Create/Edit quiz
│   │   │   ├── QuestionManagementPage.tsx  # Manage questions
│   │   │   └── QuestionFormPage.tsx        # Create/Edit question
│   │   ├── components/      # React components
│   │   │   ├── ui/                # Reusable UI components
│   │   │   ├── Layout.tsx         # Main layout
│   │   │   ├── QuizStart.tsx
│   │   │   ├── QuizQuestion.tsx
│   │   │   └── QuizResult.tsx
│   │   ├── store/          # Zustand store with CRUD
│   │   ├── types/          # TypeScript types
│   │   ├── lib/            # Utilities
│   │   ├── App.tsx         # Router setup
│   │   └── main.tsx        # Entry point
│   └── package.json
├── package.json            # Root package for scripts
└── README.md
```

## 🎯 Usage

### Taking a Quiz

1. **Start the application** using `npm run dev`
2. **Open your browser** to `http://localhost:5173`
3. **Select a quiz** from the available options
4. **Answer questions** by clicking on your choice
5. **Navigate** using Previous/Next buttons
6. **Submit** when all questions are answered
7. **View results** with correct/incorrect answers highlighted
8. **Restart** to take another quiz

### Admin Panel

The application includes a full-featured admin panel accessible via the "Admin" button in the navbar:

**Access:** Click "Admin" button or navigate to `http://localhost:5173/admin`

**Features:**
- 📝 **Create Quizzes** - `/admin/quizzes/new`
- ✏️ **Edit Quizzes** - Edit title, description, difficulty, etc.
- 🗑️ **Delete Quizzes** - Remove quizzes with confirmation
- ➕ **Add Questions** - `/admin/questions/new`
- ✏️ **Edit Questions** - Update question text and options
- 🗑️ **Delete Questions** - Remove questions with confirmation

### Routes

#### User Routes
- `/` - Home page (quiz selection)
- `/quiz/:quizId` - Take a quiz
- `/result` - View quiz results

#### Admin Routes
- `/admin` - Admin dashboard
- `/admin/quizzes` - Manage all quizzes
- `/admin/quizzes/new` - Create new quiz
- `/admin/quizzes/edit/:quizId` - Edit quiz
- `/admin/questions` - Manage questions
- `/admin/questions/new` - Create question
- `/admin/questions/edit/:questionId` - Edit question

**See [PAGES_STRUCTURE.md](PAGES_STRUCTURE.md) for detailed page documentation.**

## 🔧 Development Tools

### Backend
- **TypeScript Compilation**: `npm run build`
- **Type Checking**: `npm run typecheck`
- **Hot Reload**: Enabled via Nodemon

### Frontend
- **Type Checking**: `npm run build` (includes type checking)
- **Linting**: `npm run lint`
- **Testing**: `npm run test`
- **Testing UI**: `npm run test:ui`

## 🌐 CORS Configuration

CORS is enabled for all origins in development mode. For production, update the CORS configuration in `backend/src/server.ts`:

```typescript
app.use(cors({
  origin: ['https://your-production-domain.com'],
  credentials: true
}));
```

## 🐛 Troubleshooting

### Port Already in Use
If port 8080 (backend) or 5173 (frontend) is already in use:

**Backend**: Change the PORT in `backend/.env`
**Frontend**: Vite will automatically try the next available port

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in `backend/.env`
- Ensure database exists and migrations are run

### API Not Responding
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify the Vite proxy configuration in `frontend/vite.config.ts`

## 📝 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

