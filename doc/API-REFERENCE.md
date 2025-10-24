# API Reference - Ler Bíblia

Base URL: `http://localhost:3000`

Swagger Documentation: `http://localhost:3000/api`

## Bible Content API

### Get All Translations
```http
GET /v1/bible/translations
```

**Response:**
```json
[
  {
    "id": 1,
    "code": "NVI",
    "name": "Nova Versão Internacional",
    "language": "pt",
    "isActive": true
  }
]
```

### Get All Books
```http
GET /v1/bible/books?testament=NT
```

**Query Parameters:**
- `testament` (optional): Filter by testament (`OT` or `NT`)

**Response:**
```json
[
  {
    "id": 40,
    "name": "Mateus",
    "abbreviation": "Mt",
    "testament": "NT",
    "order": 40,
    "chapters": 28
  }
]
```

### Get Specific Book
```http
GET /v1/bible/books/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "Gênesis",
  "abbreviation": "Gn",
  "testament": "OT",
  "order": 1,
  "chapters": 50
}
```

### Get Chapter Verses
```http
GET /v1/bible/chapter?translationId=1&bookId=43&chapter=3
```

**Query Parameters:**
- `translationId` (required): Translation ID
- `bookId` (required): Book ID
- `chapter` (required): Chapter number

**Response:**
```json
[
  {
    "id": 1,
    "translationId": 1,
    "bookId": 43,
    "chapter": 3,
    "verse": 16,
    "text": "Porque Deus tanto amou o mundo..."
  }
]
```

### Get Specific Verse
```http
GET /v1/bible/verse?translationId=1&bookId=43&chapter=3&verse=16
```

**Query Parameters:**
- `translationId` (required): Translation ID
- `bookId` (required): Book ID
- `chapter` (required): Chapter number
- `verse` (required): Verse number

**Response:**
```json
{
  "id": 1,
  "translationId": 1,
  "bookId": 43,
  "chapter": 3,
  "verse": 16,
  "text": "Porque Deus tanto amou o mundo..."
}
```

## Search API

### Search Verses
```http
GET /v1/search?query=amor&translationId=1&testament=NT&bookId=43
```

**Query Parameters:**
- `query` (required): Search text
- `translationId` (optional): Filter by translation
- `testament` (optional): Filter by testament (`OT` or `NT`)
- `bookId` (optional): Filter by specific book

**Response:**
```json
[
  {
    "id": 1,
    "translationId": 1,
    "bookId": 43,
    "chapter": 3,
    "verse": 16,
    "text": "Porque Deus tanto amou o mundo..."
  }
]
```

## Notes & Highlights API

### Create Highlight
```http
POST /v1/notes/highlights
Content-Type: application/json

{
  "verseId": 1,
  "color": "yellow"
}
```

**Response:**
```json
{
  "id": 1,
  "verseId": 1,
  "color": "yellow",
  "userId": null,
  "createdAt": "2025-10-24T00:00:00.000Z",
  "updatedAt": "2025-10-24T00:00:00.000Z"
}
```

### Get Highlights
```http
GET /v1/notes/highlights?verseId=1&color=yellow
```

**Query Parameters:**
- `verseId` (optional): Filter by verse
- `color` (optional): Filter by color

**Response:**
```json
[
  {
    "id": 1,
    "verseId": 1,
    "color": "yellow",
    "createdAt": "2025-10-24T00:00:00.000Z"
  }
]
```

### Delete Highlight
```http
DELETE /v1/notes/highlights/:id
```

**Response:**
```json
{
  "deleted": true
}
```

### Create Note
```http
POST /v1/notes
Content-Type: application/json

{
  "verseId": 1,
  "content": "This verse reminds me of God's love",
  "tags": ["love", "salvation"]
}
```

**Response:**
```json
{
  "id": 1,
  "verseId": 1,
  "content": "This verse reminds me of God's love",
  "tags": ["love", "salvation"],
  "userId": null,
  "createdAt": "2025-10-24T00:00:00.000Z",
  "updatedAt": "2025-10-24T00:00:00.000Z"
}
```

### Get Notes
```http
GET /v1/notes?verseId=1&tag=love
```

**Query Parameters:**
- `verseId` (optional): Filter by verse
- `tag` (optional): Filter by tag

**Response:**
```json
[
  {
    "id": 1,
    "verseId": 1,
    "content": "This verse reminds me of God's love",
    "tags": ["love", "salvation"],
    "createdAt": "2025-10-24T00:00:00.000Z"
  }
]
```

### Get Specific Note
```http
GET /v1/notes/:id
```

**Response:**
```json
{
  "id": 1,
  "verseId": 1,
  "content": "This verse reminds me of God's love",
  "tags": ["love", "salvation"],
  "createdAt": "2025-10-24T00:00:00.000Z",
  "updatedAt": "2025-10-24T00:00:00.000Z"
}
```

### Update Note
```http
PUT /v1/notes/:id
Content-Type: application/json

{
  "content": "Updated content",
  "tags": ["love", "grace"]
}
```

**Response:**
```json
{
  "id": 1,
  "verseId": 1,
  "content": "Updated content",
  "tags": ["love", "grace"],
  "updatedAt": "2025-10-24T00:00:00.000Z"
}
```

### Delete Note
```http
DELETE /v1/notes/:id
```

**Response:**
```json
{
  "deleted": true
}
```

## Reading Plans API

### Get All Plans
```http
GET /v1/plans
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Evangelhos em 30 Dias",
    "description": "Leia os quatro evangelhos em um mês",
    "totalDays": 30,
    "isActive": true,
    "schedule": [
      {
        "day": 1,
        "readings": [
          {
            "bookId": 40,
            "startChapter": 1,
            "endChapter": 4
          }
        ]
      }
    ]
  }
]
```

### Get Specific Plan
```http
GET /v1/plans/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "Evangelhos em 30 Dias",
  "description": "Leia os quatro evangelhos em um mês",
  "totalDays": 30,
  "schedule": [...]
}
```

### Get Plan Progress
```http
GET /v1/plans/:id/progress
```

**Response:**
```json
[
  {
    "id": 1,
    "planId": 1,
    "day": 1,
    "completed": true,
    "completedAt": "2025-10-24T00:00:00.000Z"
  },
  {
    "id": 2,
    "planId": 1,
    "day": 2,
    "completed": false,
    "completedAt": null
  }
]
```

### Update Day Progress
```http
PUT /v1/plans/:id/progress/:day
Content-Type: application/json

{
  "completed": true
}
```

**Response:**
```json
{
  "id": 1,
  "planId": 1,
  "day": 1,
  "completed": true,
  "completedAt": "2025-10-24T00:00:00.000Z"
}
```

### Reset Plan Progress
```http
DELETE /v1/plans/:id/progress
```

**Response:**
```json
{
  "reset": true
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["verseId must be a positive number"],
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Note with ID 999 not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

## Rate Limiting

Currently no rate limiting is implemented. This should be added before production deployment.

## Authentication

Currently no authentication is required. All endpoints are public. User-specific features (userId fields) are prepared for future authentication implementation.

