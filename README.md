# CityPulse: Smart City Issue Reporting

CityPulse is a full-stack web application that empowers citizens to submit and track urban civic issues such as potholes, garbage collection, street light failures, and more. It combines a modern UI/UX design, robust backend, database integration, and API endpoints to create a production-ready platform.

## Features

- **User-friendly Issue Reporting**: Submit urban issues with detailed information
- **Interactive Dashboard**: Browse, filter, and search reported issues
- **Status Tracking**: Monitor issues from submission to resolution
- **Visual Statistics**: View data visualizations about reported issues
- **Responsive Design**: Fully optimized for both desktop and mobile devices

## Tech Stack

- **Frontend**:
  - React 18 with Hooks
  - TypeScript for type safety
  - Tailwind CSS for styling
  - React Router for navigation
  - React Hook Form for form handling
  - Recharts for data visualization
  - Lucide React for icons

- **Backend**:
  - Express.js for API endpoints
  - Supabase for PostgreSQL database
  - Data validation on both client and server

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Supabase account (for database)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and update with your Supabase credentials
4. Set up the database:
   - Click the "Connect to Supabase" button in the top right
   - Create a new project
   - Apply the migration in `supabase/migrations/create_issues_table.sql`

### Running the Application

Start the development server:
```
npm run dev
```

To run both frontend and backend concurrently:
```
npm run dev:full
```

## Project Structure

```
/
├── src/                  # Frontend source code
│   ├── api/              # API client functions
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # Base UI components
│   │   ├── issues/       # Issue-related components
│   │   ├── layout/       # Layout components
│   │   └── stats/        # Statistics components
│   ├── pages/            # Page components
│   └── types/            # TypeScript type definitions
├── server/               # Backend code
│   └── index.js          # Express server
└── supabase/             # Supabase migrations
    └── migrations/       # SQL migrations
```

## API Endpoints

- `GET /api/issues` - Get all issues (supports filtering)
- `POST /api/issues` - Create a new issue
- `PATCH /api/issues/:id` - Update an issue (e.g., mark as resolved)
- `GET /api/stats` - Get issue statistics
- `POST /api/ai-suggest` - Get AI-suggested category based on issue text

## License

This project is licensed under the MIT License.