# Projects and Tasks Manager

A ReactJS-based project and task management application that enables users to create, edit, and manage projects and tasks using Supabase as the backend and Redux for state management.

## Features

- Create, edit, and delete projects
- Add, edit, and remove tasks associated with projects
- Task management with different statuses (Coming, To Do, In Progress, Done, Archived)
- Redux Toolkit for state management
- Supabase as the backend database
- Tailwind CSS for styling

## Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, Tailwind CSS
- **Build tool:** Vite
- **Backend:** Supabase (PostgreSQL)

## Requirements

- Node.js 18 or newer, and npm

## Installation

Follow these steps from zero to a running app:

### 1. Clone this repository

```sh
git clone https://github.com/maubayuelo/projects-and-tasks.git
cd projects-and-tasks
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure Supabase

Create a `.env.local` file in the project root with your Supabase project
credentials:

```sh
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can copy `.env.example` as a starting point:

```sh
cp .env.example .env.local
```

Both variables are read in `src/redux/supabaseClient.js`. Vite only exposes
variables prefixed with `VITE_`, and it reads `.env.local` automatically at
startup. `.env.local` is gitignored — never commit real credentials.

### 4. Start the development server

```sh
npm run dev
```

Vite prints the local URL on start. With the current config it is
`http://localhost:5173/ProjectsAndTasks/` (the base path is set in
`vite.config.js`). If port 5173 is in use, Vite picks the next free port and
prints that instead.

## Deployment

1. Build the app:
   ```sh
   npm run build
   ```
   The production build is written to `dist/`.

2. Preview the build locally (optional):
   ```sh
   npm run preview
   ```

3. Deploy the contents of `dist/` using Vercel, Netlify, or any hosting provider
   of your choice.

## How to Contribute

If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.