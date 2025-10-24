# Ler Bíblia - Bible Reading Application MVP

A modern, offline-first Bible reading application built with Vue.js and NestJS.

## 🎯 MVP Features

### Core Functionality
- ✅ **Bible Reading**: Support for multiple translations with offline access
- ✅ **Full-Text Search**: Search across translations with filters (testament, book)
- ✅ **Verse Highlighting**: Color-coded highlights for important verses
- ✅ **Notes & Annotations**: Create notes linked to specific verses with tagging
- ✅ **Reading Plans**: Pre-configured plans with progress tracking

### User Experience
- Fluid reading interface with easy navigation
- Translation/Book/Chapter selectors
- Quick verse actions (copy, share, highlight, annotate)
- Light/Dark theme support
- Responsive design for mobile and desktop

## 🏗️ Architecture

### Tech Stack

**Frontend**
- Vue 3 + TypeScript
- Vite (build tool)
- Vue Router 4 (routing)
- Pinia (state management)
- Tailwind CSS + daisyUI (styling)
- VueUse Motion (animations)
- Axios (HTTP client)

**Backend**
- NestJS (framework)
- TypeORM (ORM)
- SQLite (database - offline-first)
- Swagger/OpenAPI (API documentation)
- class-validator (validation)

### Project Structure

```
ler-biblia/
├── frontend/               # Vue.js application
│   └── src/
│       ├── features/      # Feature-based modules
│       │   ├── bible/    # Reading interface
│       │   ├── search/   # Search functionality
│       │   ├── notes/    # Notes & highlights
│       │   ├── plans/    # Reading plans
│       │   └── settings/ # User preferences
│       ├── components/   # Shared components
│       ├── composables/  # Business logic
│       └── stores/       # Pinia stores
│
├── backend/               # NestJS API
│   └── src/
│       ├── features/     # Feature modules
│       │   ├── bible/   # Bible content API
│       │   ├── search/  # Search API
│       │   ├── notes/   # Notes & highlights API
│       │   └── plans/   # Reading plans API
│       └── database/
│           └── seeds/   # Database seeding
│
└── doc/                  # Documentation & ADRs
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Seed the database:
```bash
npm run seed
```

4. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`
Swagger documentation at `http://localhost:3000/api`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📡 API Endpoints

### Bible Content
- `GET /v1/bible/translations` - List all translations
- `GET /v1/bible/books` - List all books (filter by testament)
- `GET /v1/bible/books/:id` - Get specific book
- `GET /v1/bible/chapter` - Get chapter verses
- `GET /v1/bible/verse` - Get specific verse

### Search
- `GET /v1/search?query=...` - Search verses (with filters)

### Notes & Highlights
- `POST /v1/notes/highlights` - Create highlight
- `GET /v1/notes/highlights` - List highlights
- `DELETE /v1/notes/highlights/:id` - Delete highlight
- `POST /v1/notes` - Create note
- `GET /v1/notes` - List notes
- `GET /v1/notes/:id` - Get note
- `PUT /v1/notes/:id` - Update note
- `DELETE /v1/notes/:id` - Delete note

### Reading Plans
- `GET /v1/plans` - List all plans
- `GET /v1/plans/:id` - Get specific plan
- `GET /v1/plans/:id/progress` - Get plan progress
- `PUT /v1/plans/:id/progress/:day` - Update day progress
- `DELETE /v1/plans/:id/progress` - Reset plan progress

## 📊 Database Schema

### Core Entities
- **Translation**: Bible translations (NVI, ARC, etc.)
- **Book**: 66 books of the Bible
- **Verse**: Individual verses with text
- **Highlight**: Verse highlights with colors
- **Note**: User notes linked to verses
- **ReadingPlan**: Pre-configured reading plans
- **ReadingProgress**: User progress tracking
- **UserPreference**: User settings and preferences

## 🎨 Design Principles

1. **Offline-First**: All Bible content available without internet
2. **Component Architecture**: Dumb components + smart composables
3. **Type Safety**: Strong typing throughout the application
4. **Feature-Based Organization**: Code organized by feature, not layer
5. **API Versioning**: All endpoints versioned (`/v1/`)

## 📝 Development Guidelines

### Code Style
- English for code (variables, functions, classes)
- Portuguese for comments and documentation
- Descriptive names over comments
- Small, single-responsibility functions

### Frontend Patterns
- Components only display data via props and emit events
- Business logic in composables and stores
- No API calls in components
- Strong typing for all props and events

### Backend Patterns
- Thin controllers (routing and validation only)
- Business logic in services
- DTOs with validation for all inputs
- Structured error responses
- Comprehensive logging

## 🔄 Next Steps

### Frontend Implementation (Pending)
- [ ] Core layout and navigation
- [ ] Home page with verse of the day
- [ ] Reading view with selectors
- [ ] Search interface
- [ ] Notes and highlights UI
- [ ] Reading plans interface
- [ ] Settings page
- [ ] PWA/Service Worker for offline support

### Enhancements
- [ ] More Bible translations
- [ ] Complete Bible text data
- [ ] User authentication
- [ ] Cloud sync
- [ ] Verse sharing
- [ ] Audio Bible
- [ ] Study tools

## 📚 Documentation

See the `/doc` directory for:
- ADR-001: Architecture Overview
- Additional architectural decisions
- API documentation

## 🤝 Contributing

This is an MVP project. Contributions are welcome!

## 📄 License

[To be determined]

