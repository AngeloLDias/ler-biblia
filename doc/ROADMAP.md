# Development Roadmap - Ler Bíblia MVP

## ✅ Phase 1: Backend Foundation (COMPLETED)

### Infrastructure
- [x] Project setup (NestJS + Vue + Vite)
- [x] Database schema design
- [x] TypeORM configuration with SQLite
- [x] Swagger/OpenAPI documentation
- [x] CORS configuration for frontend

### Database & Seeding
- [x] Entity models (Translation, Book, Verse, Highlight, Note, ReadingPlan, ReadingProgress, UserPreference)
- [x] Database seeding script
- [x] Sample Bible data (10 popular verses)
- [x] All 66 books metadata
- [x] 2 sample reading plans

### API Endpoints
- [x] Bible Content API (translations, books, chapters, verses)
- [x] Search API with filters
- [x] Notes & Highlights CRUD API
- [x] Reading Plans API with progress tracking
- [x] DTOs with validation
- [x] Error handling

## 🚧 Phase 2: Frontend Core (NEXT)

### Setup & Configuration
- [ ] Configure Tailwind CSS with daisyUI
- [ ] Setup Vue Router
- [ ] Configure Pinia stores
- [ ] Create API service layer with Axios
- [ ] Setup TypeScript types/interfaces

### Core Layout
- [ ] Main layout component
- [ ] Navigation bar
- [ ] Theme toggle (light/dark)
- [ ] Responsive sidebar
- [ ] Footer

### Type Definitions
```typescript
// frontend/src/types/bible.ts
interface Translation {
  id: number;
  code: string;
  name: string;
  language: string;
}

interface Book {
  id: number;
  name: string;
  abbreviation: string;
  testament: 'OT' | 'NT';
  order: number;
  chapters: number;
}

interface Verse {
  id: number;
  translationId: number;
  bookId: number;
  chapter: number;
  verse: number;
  text: string;
}

interface Highlight {
  id: number;
  verseId: number;
  color: string;
  createdAt: Date;
}

interface Note {
  id: number;
  verseId: number;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ReadingPlan {
  id: number;
  name: string;
  description: string;
  totalDays: number;
  schedule: Array<{
    day: number;
    readings: Array<{
      bookId: number;
      startChapter: number;
      endChapter: number;
    }>;
  }>;
}
```

### Stores (Pinia)
- [ ] `useBibleStore` - Bible content, translations, books
- [ ] `useSearchStore` - Search state and results
- [ ] `useNotesStore` - Notes and highlights
- [ ] `usePlansStore` - Reading plans and progress
- [ ] `useSettingsStore` - User preferences

### Pages & Features

#### 1. Home Page (`/`)
- [ ] Verse of the day component
- [ ] Resume reading button (last chapter)
- [ ] Quick access to plans
- [ ] Recent highlights/notes

#### 2. Reading View (`/read/:translation/:book/:chapter`)
- [ ] Translation selector dropdown
- [ ] Book selector (grouped by testament)
- [ ] Chapter selector
- [ ] Verse list with numbers
- [ ] Verse actions menu (highlight, note, copy, share)
- [ ] Navigation (previous/next chapter)
- [ ] Font size controls
- [ ] Line height controls

#### 3. Search (`/search`)
- [ ] Search input with debounce
- [ ] Translation filter
- [ ] Testament filter (OT/NT)
- [ ] Book filter
- [ ] Results list with context
- [ ] Click to open in reading view

#### 4. Notes & Highlights (`/notes`)
- [ ] Tabs: All / Highlights / Notes
- [ ] Filter by color (highlights)
- [ ] Filter by tag (notes)
- [ ] Filter by book
- [ ] Note editor with Markdown support
- [ ] Tag input component
- [ ] Delete confirmation

#### 5. Reading Plans (`/plans`)
- [ ] Plans list
- [ ] Plan detail view
- [ ] Progress tracker
- [ ] Daily checklist
- [ ] Reschedule missed days
- [ ] Progress statistics

#### 6. Settings (`/settings`)
- [ ] Default translation selector
- [ ] Theme toggle
- [ ] Font size slider
- [ ] Line height slider
- [ ] Export data (JSON)
- [ ] Import data (JSON)
- [ ] Clear all data (with confirmation)

## 📦 Phase 3: Data & Content

### Bible Text Integration
- [ ] Source complete Bible text (Portuguese - NVI)
- [ ] Source complete Bible text (Portuguese - ARC)
- [ ] Create import script for full Bible
- [ ] Optimize database for full text search
- [ ] Add verse count per chapter

### Reading Plans
- [ ] Bible in 1 Year plan
- [ ] Bible in 90 Days plan
- [ ] New Testament in 30 Days plan
- [ ] Gospels in 30 Days plan
- [ ] Psalms in 30 Days plan
- [ ] Proverbs in 31 Days plan

## 🎨 Phase 4: UX Enhancements

### Reading Experience
- [ ] Smooth scrolling
- [ ] Verse animations on load
- [ ] Highlight animations
- [ ] Reading progress indicator
- [ ] Bookmark feature
- [ ] Reading history

### Interactions
- [ ] Verse long-press menu (mobile)
- [ ] Verse click menu (desktop)
- [ ] Keyboard shortcuts
- [ ] Swipe gestures (mobile)
- [ ] Copy verse with reference
- [ ] Share verse as image

### Visual Polish
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Success notifications
- [ ] Skeleton loaders
- [ ] Transitions and animations

## 🔧 Phase 5: PWA & Offline

### Service Worker
- [ ] Install service worker
- [ ] Cache Bible content
- [ ] Cache API responses
- [ ] Offline fallback page
- [ ] Update notification

### PWA Features
- [ ] Web app manifest
- [ ] Install prompt
- [ ] App icons
- [ ] Splash screens
- [ ] Standalone mode

## 🚀 Phase 6: Advanced Features

### User Features
- [ ] User authentication (optional)
- [ ] Cloud sync
- [ ] Multi-device support
- [ ] Backup to cloud
- [ ] Restore from cloud

### Study Tools
- [ ] Cross-references
- [ ] Parallel translations view
- [ ] Verse comparison
- [ ] Study notes templates
- [ ] Verse collections

### Social Features
- [ ] Share verses on social media
- [ ] Export notes as PDF
- [ ] Print-friendly view
- [ ] Verse of the day sharing

## 📊 Phase 7: Analytics & Optimization

### Performance
- [ ] Lazy loading
- [ ] Virtual scrolling for long chapters
- [ ] Image optimization
- [ ] Bundle size optimization
- [ ] Database query optimization

### Analytics
- [ ] Reading statistics
- [ ] Most read books
- [ ] Reading streaks
- [ ] Progress charts
- [ ] Achievement badges

## 🧪 Phase 8: Testing & Quality

### Testing
- [ ] Unit tests (backend services)
- [ ] Unit tests (frontend composables)
- [ ] Integration tests (API)
- [ ] E2E tests (critical flows)
- [ ] Accessibility testing

### Quality
- [ ] Code review checklist
- [ ] Performance benchmarks
- [ ] Security audit
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Browser compatibility testing

## 📱 Phase 9: Mobile Apps (Future)

### React Native / Capacitor
- [ ] Evaluate mobile framework
- [ ] Setup mobile project
- [ ] Adapt UI for mobile
- [ ] Native features (notifications, etc.)
- [ ] App store deployment

## 🎯 Immediate Next Steps

1. **Frontend Setup** (1-2 hours)
   - Configure Tailwind + daisyUI
   - Setup Vue Router
   - Create basic layout

2. **API Integration** (2-3 hours)
   - Create API service
   - Setup Pinia stores
   - Test API connectivity

3. **Reading View** (4-6 hours)
   - Build selectors
   - Implement verse display
   - Add basic navigation

4. **Search** (2-3 hours)
   - Build search UI
   - Integrate search API
   - Display results

5. **Notes & Highlights** (4-5 hours)
   - Build notes UI
   - Implement CRUD operations
   - Add filtering

6. **Reading Plans** (3-4 hours)
   - Display plans
   - Track progress
   - Update completion

Total estimated time for MVP frontend: **16-23 hours**

## 📝 Notes

- Focus on core functionality first
- Iterate based on user feedback
- Keep it simple and maintainable
- Document as you go
- Test on real devices early

