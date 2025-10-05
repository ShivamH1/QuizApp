# Pages Structure & Routing

This document explains the complete page structure and routing implementation for the Quiz Application.

## 📁 Directory Structure

```
frontend/src/
├── pages/
│   ├── index.tsx                    # Export all pages
│   ├── HomePage.tsx                 # Quiz selection page (/)
│   ├── QuizPage.tsx                 # Quiz taking page (/quiz/:quizId)
│   ├── ResultPage.tsx               # Results page (/result)
│   ├── AdminDashboard.tsx           # Admin dashboard (/admin)
│   ├── QuizManagementPage.tsx       # Manage quizzes (/admin/quizzes)
│   ├── QuizFormPage.tsx             # Create/Edit quiz (/admin/quizzes/:quizId)
│   ├── QuestionManagementPage.tsx   # Manage questions (/admin/questions)
│   └── QuestionFormPage.tsx         # Create/Edit question (/admin/questions/:questionId)
├── components/
│   ├── Layout.tsx                   # Main layout with navigation
│   ├── QuizStart.tsx               # Quiz selection component
│   ├── QuizQuestion.tsx            # Question display component
│   ├── QuizResult.tsx              # Results display component
│   └── ui/                         # Reusable UI components
├── store/
│   └── quizStore.ts                # Zustand store with all CRUD operations
├── types/
│   └── quiz.ts                     # TypeScript type definitions
└── App.tsx                          # Main app with routing setup
```

## 🚦 Routes

### User Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Browse and select quizzes |
| `/quiz/:quizId` | QuizPage | Take a quiz |
| `/result` | ResultPage | View quiz results |

### Admin Routes

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | AdminDashboard | Admin control panel |
| `/admin/quizzes` | QuizManagementPage | List and manage all quizzes |
| `/admin/quizzes/new` | QuizFormPage | Create a new quiz |
| `/admin/quizzes/edit/:quizId` | QuizFormPage | Edit existing quiz |
| `/admin/questions` | QuestionManagementPage | Manage questions for quizzes |
| `/admin/questions/new?quizId=...` | QuestionFormPage | Create a new question |
| `/admin/questions/edit/:questionId?quizId=...` | QuestionFormPage | Edit existing question |

## 📄 Page Details

### 1. HomePage
**Route:** `/`

**Purpose:** Landing page where users can browse and select quizzes

**Features:**
- Displays all available quizzes
- Shows quiz details (title, description, difficulty, category)
- Click on quiz to start
- Loading state while fetching quizzes

**Navigation:**
- Click quiz card → Navigate to `/quiz/:quizId`
- Admin button in navbar → Navigate to `/admin`

---

### 2. QuizPage
**Route:** `/quiz/:quizId`

**Purpose:** Quiz-taking interface

**Features:**
- Displays one question at a time
- Progress indicator
- Timer display
- Previous/Next navigation
- Submit button on last question
- Loading state while fetching questions

**State Management:**
- Fetches questions on mount
- Starts timer on mount
- Tracks user answers
- Submits answers on completion

**Navigation:**
- Submit quiz → Navigate to `/result`

---

### 3. ResultPage
**Route:** `/result`

**Purpose:** Display quiz results

**Features:**
- Shows score and percentage
- Displays correct/incorrect answers
- Detailed question review
- Restart option

**Navigation:**
- Restart button → Navigate to `/`
- If no result → Navigate to `/`

---

### 4. AdminDashboard
**Route:** `/admin`

**Purpose:** Central admin control panel

**Features:**
- Quick links to admin sections
- Statistics overview (coming soon)
- Quick actions for creating quizzes/questions

**Navigation:**
- Manage Quizzes → Navigate to `/admin/quizzes`
- Manage Questions → Navigate to `/admin/questions`
- Create New Quiz → Navigate to `/admin/quizzes/new`
- Back to Home → Navigate to `/`

---

### 5. QuizManagementPage
**Route:** `/admin/quizzes`

**Purpose:** List and manage all quizzes

**Features:**
- Display all quizzes in cards
- Edit quiz button
- Delete quiz button (with confirmation)
- Create new quiz button
- Shows quiz metadata (difficulty, category, question count)

**CRUD Operations:**
- Read: Fetches all quizzes on mount
- Delete: Deletes quiz with confirmation dialog

**Navigation:**
- Create button → Navigate to `/admin/quizzes/new`
- Edit button → Navigate to `/admin/quizzes/edit/:quizId`
- Manage Questions → Navigate to `/admin/questions?quizId=...`
- Preview Quiz → Navigate to `/quiz/:quizId`
- Back button → Navigate to `/admin`

---

### 6. QuizFormPage
**Route:** `/admin/quizzes/:quizId` (`:quizId` can be "new" or actual ID)

**Purpose:** Create or edit a quiz

**Features:**
- Form with validation
- Fields: Title, Description, Category, Difficulty, Question Count
- Auto-fills form when editing
- Loading states
- Toast notifications on success/error

**CRUD Operations:**
- Create: `createQuiz()` when quizId is "new"
- Update: `updateQuiz()` when editing existing quiz

**Navigation:**
- Submit success → Navigate to `/admin/quizzes`
- Cancel button → Navigate to `/admin/quizzes`
- Back button → Navigate to `/admin/quizzes`

---

### 7. QuestionManagementPage
**Route:** `/admin/questions?quizId=...`

**Purpose:** Manage questions for a specific quiz

**Features:**
- Quiz selector dropdown
- List all questions for selected quiz
- Display question with all options
- Edit/Delete buttons for each question
- Empty state when no questions

**CRUD Operations:**
- Read: Fetches questions for selected quiz
- Delete: Deletes question with confirmation

**Navigation:**
- Add Question → Navigate to `/admin/questions/new?quizId=...`
- Edit button → Navigate to `/admin/questions/edit/:questionId?quizId=...`
- Back button → Navigate to `/admin`

---

### 8. QuestionFormPage
**Route:** `/admin/questions/:questionId?quizId=...`

**Purpose:** Create or edit a question

**Features:**
- Form with validation
- Fields: Quiz selection, Question text, Options A-D, Correct answer, Order index
- Auto-fills form when editing
- Toast notifications

**CRUD Operations:**
- Create: `createQuestion()` when questionId is "new"
- Update: `updateQuestion()` when editing existing question

**Navigation:**
- Submit success → Navigate to `/admin/questions?quizId=...`
- Cancel button → Navigate to `/admin/questions?quizId=...`
- Back button → Navigate to `/admin/questions?quizId=...`

---

## 🧩 Layout Component

The `Layout` component wraps all pages and provides:
- **Navbar** with logo and navigation
  - Shows "Admin" button when on user routes
  - Shows "Home" button when on admin routes
- Consistent spacing and container widths

## 🎨 UI Components Used

### From Shadcn/ui:
- `Card` - Container for content
- `Button` - Interactive buttons
- `Input` - Text input fields
- `Textarea` - Multi-line text input
- `Select` - Dropdown selectors
- `Label` - Form labels
- `Badge` - Status indicators
- `AlertDialog` - Confirmation dialogs
- `Toaster` - Toast notifications (sonner)

### Custom Components:
- `QuizStart` - Quiz selection grid
- `QuizQuestion` - Question display with options
- `QuizResult` - Results display with review
- `Layout` - Page layout with navigation

## 🔄 Data Flow

### User Flow:
```
HomePage → Select Quiz
    ↓
QuizPage → Answer Questions
    ↓
ResultPage → View Results → Restart
    ↓
HomePage
```

### Admin Flow:
```
AdminDashboard
    ↓
├── QuizManagementPage
│       ↓
│   QuizFormPage (Create/Edit)
│       ↓
│   QuestionManagementPage
│       ↓
│   QuestionFormPage (Create/Edit)
```

## 🗃️ State Management

All pages use the `useQuizStore` hook from Zustand:

```typescript
const {
  // State
  quizzes,
  questions,
  quizResult,
  isLoading,
  error,

  // User actions
  fetchQuizzes,
  fetchQuestions,
  submitQuiz,
  resetQuiz,

  // Admin CRUD
  createQuiz,
  updateQuiz,
  deleteQuiz,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = useQuizStore();
```

## 🛡️ Error Handling

All pages include:
- Loading states with spinners
- Error messages from store
- Toast notifications for CRUD operations
- Validation errors on forms
- Empty states when no data

## 📱 Responsive Design

All pages are responsive:
- Mobile: Single column layouts
- Tablet: 2-column grids
- Desktop: Multi-column grids with max-width containers

## 🚀 Navigation Patterns

### User Routes:
- Always accessible
- No authentication required
- Simple forward flow

### Admin Routes:
- Accessible via navbar "Admin" button
- Full CRUD capabilities
- Complex navigation with breadcrumbs/back buttons

## 📊 Data Requirements

### HomePage:
- Requires: List of quizzes

### QuizPage:
- Requires: Questions for selected quiz

### ResultPage:
- Requires: Quiz result (redirects if not available)

### Admin Pages:
- QuizManagementPage: List of quizzes
- QuestionManagementPage: List of quizzes + questions for selected quiz
- Form Pages: Existing data when editing

## 🎯 Key Features

1. **Clean URL Structure** - RESTful routes
2. **Nested Routing** - Admin routes grouped under `/admin`
3. **Query Parameters** - Used for quiz selection in question management
4. **Protected State** - Result page redirects if no data
5. **Breadcrumb Navigation** - Back buttons on all admin pages
6. **Toast Notifications** - Success/error feedback on CRUD operations
7. **Confirmation Dialogs** - Prevent accidental deletions
8. **Form Validation** - Client-side validation with error messages

## 🔗 Inter-Page Communication

Pages communicate through:
1. **URL Parameters** - Quiz/Question IDs
2. **Query Strings** - Filters and context
3. **Zustand Store** - Shared state
4. **Navigation State** - React Router navigation

## 📝 Best Practices Implemented

- ✅ Separation of concerns (pages vs components)
- ✅ Reusable components
- ✅ Centralized state management
- ✅ Type-safe with TypeScript
- ✅ Consistent UI/UX patterns
- ✅ Loading and error states
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Form validation
- ✅ Confirmation dialogs for destructive actions

## 🎨 Design Patterns

- **Container/Presentation** - Pages handle logic, components handle UI
- **Composition** - Layout wraps all pages
- **Hooks** - Custom store hook for state management
- **Form Management** - React Hook Form for complex forms
- **Route Parameters** - Dynamic routing for CRUD operations

## 🚦 Route Guards (Future Enhancement)

Currently all routes are public. Future additions:
- Authentication routes
- Protected admin routes
- Role-based access control
- Redirect to login if not authenticated

## 📖 Quick Reference

### Starting the App:
```bash
npm run dev
```

### User Journey:
1. Visit `/` - See all quizzes
2. Click quiz - Go to `/quiz/:quizId`
3. Complete quiz - Go to `/result`
4. Click restart - Back to `/`

### Admin Journey:
1. Click "Admin" in navbar - Go to `/admin`
2. Click "Manage Quizzes" - Go to `/admin/quizzes`
3. Click "Create New Quiz" - Go to `/admin/quizzes/new`
4. Fill form and submit - Back to `/admin/quizzes`

### Development:
- Add new page: Create in `pages/` directory
- Add route: Update `App.tsx`
- Add to navigation: Update `Layout.tsx`
- Export page: Update `pages/index.tsx`

This structure provides a scalable, maintainable, and user-friendly application architecture! 🎉

